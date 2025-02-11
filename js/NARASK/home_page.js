data = [
    {
        content: "Github Best Practices", 
        keys: ["github", "code", "forks", "branches", "milestone", "request manager", "repository", "submodule", "directory", "push", "project", "pull"], 
        value: 0, 
        link: "/robot_github/robot_github.html"
    },
    {content: "Future Improvements", keys: ["minibot", "NARDash", "NARASK", "NARPit", "LED"], value: 0},
    {content: "Practicals", keys: ["orange pi", "micro sd", "balena etcher", "camera", "calibDB", "ChArUco", "Photon Vision"], value: 0},
    {content: "Robot-Github", keys: ["github", "code", "forks", "branches", "milestone", "request manager", "repository", "submodule", "directory", "push", "project", "pull"], value: 0},
];

function runSearch() {
    reset();

    const query = document.getElementById('searchBox').value.toLowerCase();
    checkKeys(query);
    displayResults(sort());
}

function checkKeys(query) {
    data.forEach(obj => {
        obj.keys.forEach(key => {
            if (query.toLowerCase().includes(key.toLowerCase())) {
                obj.value++;
            }
        });
    });
}

function sort() {
    console.log("" + data.filter(obj => obj.value > 0).sort((a, b) => b.value - a.value))
    return data.filter(obj => obj.value > 0).sort((a, b) => b.value - a.value);
}

function reset() {
    data.forEach(obj => {
        obj.value = 0;
    })
}

function displayResults(results) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';
    results.forEach(result => {
        var a = document.createElement('a');
        var linkText = document.createTextNode(result.content);
        a.appendChild(linkText);
        a.title = result.content;
        a.href = result.link;
        resultsElement.appendChild(a);
        var br = document.createElement('br');
        resultsElement.appendChild(br);
    });
}