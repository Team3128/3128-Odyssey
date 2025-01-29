data = [
    {content: "Vision Docs", keys: ["vision", "cam", "cameras"], value: 0},
    {content: "Setting up OPis", keys: ["vision", "cam", "cameras", "opi"], value: 0},
    {content: "Subsystem", keys: ["car", "NAR"], value: 0},
];

function test() {
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
        const listItem = document.createElement('li');
        listItem.textContent = result.content;
        resultsElement.appendChild(listItem);
    });
}