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
    return markdown
        // Code blocks (triple backticks)
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        // Inline code (`code`)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Blockquotes ("> text")
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        // Headings
        .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
        .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold (**text** or __text__)
        .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
        .replace(/__(.*?)__/gim, '<b>$1</b>')
        // Italic (*text* or _text_)
        .replace(/\*(.*?)\*/gim, '<i>$1</i>')
        .replace(/_(.*?)_/gim, '<i>$1</i>')
        // Links [text](url)
        .replace(/\[([^\]]+)]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
        // Images ![alt](url)
        .replace(/!\[([^\]]+)]\(([^)]+)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">')
        // Unordered lists (- or *)
        .replace(/^\s*[-*] (.*)$/gim, '<ul><li>$1</li></ul>')
        .replace(/<\/ul>\s*<ul>/gim, '') // Merge adjacent lists
        // Ordered lists (1., 2., etc.)
        .replace(/^\s*\d+\.\s(.*)$/gim, '<ol><li>$1</li></ol>')
        .replace(/<\/ol>\s*<ol>/gim, '') // Merge adjacent lists
        // Line breaks
        .replace(/\n/g, '<br>');
}