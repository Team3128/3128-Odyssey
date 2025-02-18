document.addEventListener("DOMContentLoaded", function () {

    const contentDiv = document.getElementById("content");

    // Delay scrolling until DOM has fully updated
    setTimeout(() => {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, 100); // Small delay to ensure content is loaded
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
    let anchorMap = {}; // Store heading text → unique anchor links

    return markdown
        // Headings with unique anchors
        .replace(/^###### (.*$)/gim, (_, text) => createHeading(text, 6))
        .replace(/^##### (.*$)/gim, (_, text) => createHeading(text, 5))
        .replace(/^#### (.*$)/gim, (_, text) => createHeading(text, 4))
        .replace(/^### (.*$)/gim, (_, text) => createHeading(text, 3))
        .replace(/^## (.*$)/gim, (_, text) => createHeading(text, 2))
        .replace(/^# (.*$)/gim, (_, text) => createHeading(text, 1))
        // Links (supporting internal anchors like `[Go to Section](#heading-title)`)
        .replace(/\[([^\]]+)]\(#([^\)]+)\)/g, (_, text, anchor) => {
            return `<a class="md-link" href="#${anchor}">${text}</a>`;
        })
        // Normal external links
        .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a class="md-link" href="$2" target="_blank">$1</a>')
        // Unordered lists (- or *)
        .replace(/^\s*[-*] (.*)$/gim, '<ul><li>$1</li></ul>')
        .replace(/<\/ul>\s*<ul>/gim, '') // Merge adjacent lists
        // Ordered lists (1., 2., etc.)
        .replace(/^\s*\d+\.\s(.*)$/gim, '<ol><li>$1</li></ol>')
        .replace(/<\/ol>\s*<ol>/gim, '') // Merge adjacent lists
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        // Bold & Italics
        .replace(/\*\*(.*?)\*\*/g, '<b class="bold-text">$1</b>')
        .replace(/\*(.*?)\*/g, '<i class="italic-text">$1</i>')
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote class="quote">$1</blockquote>')
        // Images
        .replace(/!\[([^\]]+)]\(([^)]+)\)/g, '<img class="md-image" src="$2" alt="$1">')
        // Line breaks
        .replace(/\n/g, '<br>')
        .replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>')
        .replace(/___(.*?)___/g, '<b><i>$1</i></b>')
        // Bold (** or __)
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/__(.*?)__/g, '<b>$1</b>')
        // Italics (* or _)
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/_(.*?)_/g, '<i>$1</i>');

    function createHeading(text, level) {
        let anchor = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        if (anchorMap[anchor]) {
            anchor += `-${++counter}`; // Avoid duplicate IDs
        }
        anchorMap[anchor] = true;
        return `<h${level} id="${anchor}" class="md-heading">${text}</h${level}>`;
    }
}