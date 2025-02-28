document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, 100);
});

async function loadMarkdown(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error("Markdown file not found");
        const markdownText = await response.text();
        document.getElementById("content").innerHTML = markdownToHtml(markdownText);
    } catch (error) {
        document.getElementById("content").innerHTML = `<p style="color:red;">Error loading markdown: ${error.message}</p>`;
    }
}

function markdownToHtml(markdown) {
    let counter = 0;
    let anchorMap = {};
    let toc = [];
    let convertedMarkdown = "";
    
    let lines = markdown.split("\n");
    let inList = false;
    let inBlockquote = false;
    let inCodeBlock = false;
    let codeBuffer = [];

    lines.forEach(line => {
        let headingMatch = line.match(/^(#{1,6})\s+(.*)/);
        let listMatch = line.match(/^(\*|-|\d+\.)\s+(.*)/);
        let blockquoteMatch = line.match(/^>\s+(.*)/);
        let codeBlockMatch = line.match(/^```/);

        if (codeBlockMatch) {
            if (inCodeBlock) {
                convertedMarkdown += `<pre><code>${codeBuffer.join("\n")}</code></pre>`;
                codeBuffer = [];
            }
            inCodeBlock = !inCodeBlock;
        } else if (inCodeBlock) {
            codeBuffer.push(line);
        } else if (headingMatch) {
            let level = headingMatch[1].length;
            let text = headingMatch[2];
            let anchor = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

            if (anchorMap[anchor]) {
                anchor += `-${++counter}`;
            }
            anchorMap[anchor] = true;

            toc.push({ level, text, anchor });

            if (inList) {
                convertedMarkdown += "</ul>";
                inList = false;
            }
            if (inBlockquote) {
                convertedMarkdown += "</blockquote>";
                inBlockquote = false;
            }

            convertedMarkdown += `<h${level} id="${anchor}">${text}</h${level}>`;
        } else if (listMatch) {
            let isOrdered = listMatch[1].match(/^\d+\./);
            let listTag = isOrdered ? "ol" : "ul";

            if (!inList) {
                convertedMarkdown += `<${listTag}>`;
                inList = listTag;
            } else if (inList !== listTag) {
                convertedMarkdown += `</${inList}><${listTag}>`;
                inList = listTag;
            }

            convertedMarkdown += `<li>${convertInlineMarkdown(listMatch[2])}</li>`;
        } else if (blockquoteMatch) {
            if (!inBlockquote) {
                convertedMarkdown += "<blockquote>";
                inBlockquote = true;
            }
            convertedMarkdown += convertInlineMarkdown(blockquoteMatch[1]) + "<br>";
        } else if (line.trim() === "") {
            if (inList) {
                convertedMarkdown += `</${inList}>`;
                inList = false;
            }
            if (inBlockquote) {
                convertedMarkdown += "</blockquote>";
                inBlockquote = false;
            }
            convertedMarkdown += "<br>";
        } else {
            convertedMarkdown += convertInlineMarkdown(line) + "<br>";
        }
    });

    if (inList) convertedMarkdown += `</${inList}>`;
    if (inBlockquote) convertedMarkdown += "</blockquote>";

    let tocHtml = `<h2>${document.title}</h2><ol>`;
    toc.forEach(item => {
        tocHtml += `<li class="toc-level-${item.level}"><a href="#${item.anchor}">${item.text}</a></li>`;
    });
    tocHtml += "</ol>";

    document.getElementById("tocDiv").innerHTML = tocHtml;
    return convertedMarkdown;
}

function convertInlineMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')  // Bold
        .replace(/\*(.*?)\*/g, '<i>$1</i>')      // Italic
        .replace(/`([^`]+)`/g, '<code>$1</code>') // Inline code
        .replace(/!\[([^\]]+)]\(([^)]+)\)/g, '<img src="$2" alt="$1">') // Images
        .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>'); // Links
        
}
