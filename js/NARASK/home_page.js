data = [
    {
        content: "Github Best Practices", 
        category: "github",
        keys: ["github", "code", "forks", "branches", "milestone", "request manager", "repository", "submodule", "directory", "push", "project", "pull"], 
        value: 0, 
        link: "/robot_github/robot_github.html"
    },
    {
        content: "Future Improvements", 
        category: "other",
        keys: ["minibot", "NARDash", "NARASK", "NARPit", "LED"], 
        value: 0
    },
    {content: "Practicals", keys: ["orange pi", "micro sd", "balena etcher", "camera", "calibDB", "ChArUco", "Photon Vision"], value: 0},
    {content: "Robot-Github", keys: ["github", "code", "forks", "branches", "milestone", "request manager", "repository", "submodule", "directory", "push", "project", "pull"], value: 0},
    {content: "test", keys: ["orange pi", "micro sd", "balena etcher", "camera", "calibDB", "ChArUco", "Photon Vision"], value: 0},
    {content: "test1", keys: ["orange pi", "micro sd", "balena etcher", "camera", "calibDB", "ChArUco", "Photon Vision"], value: 0},
    {content: "test2", keys: ["orange pi", "micro sd", "balena etcher", "camera", "calibDB", "ChArUco", "Photon Vision"], value: 0},
    {content: "test3", keys: ["orange pi", "micro sd", "balena etcher", "camera", "calibDB", "ChArUco", "Photon Vision"], value: 0},
];

var tags = [];

function runSearch() {
    reset();

    const query = document.getElementById('searchbox').value.toLowerCase();
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
    // return data.filter(obj => obj.value > 0).sort((a, b) => b.value - a.value);
    return data.sort((a, b) => b.value - a.value);
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
        a.classList.add('search_item');
        resultsElement.appendChild(a);
    });
}

window.onload=function() {
    document.getElementById("searchbox")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit_button").click();
    }
});
}

function get_filtered_data(tags) {
    if (tags = null) return data; 

    const filtered_data = [];
    data.forEach((obj)=> {
        includesTag = false;
        tags.forEach((tag)=> {
            if (obj.key.toLowerCase() == tag.value.toLowerCase()) {
                includesTag = true;
            }
        })          
        if (includesTag) filtered_data.add(obj);
    })
    return filtered_data; 
}

function addTag(tag) {
    tags.add(tag);
    runSearch();
}