var tags = [];

function runSearch() {
    reset();

    const query = document.getElementById('searchbox').value.toLowerCase();
    const filtered_data = get_filtered_data();
    checkKeys(query, filtered_data);
    displayResults(sort(filtered_data));
}

function checkKeys(query, filtered_data) {
    filtered_data.forEach(obj => {
        obj.keys.forEach(key => {
            if (query.toLowerCase().includes(key.toLowerCase())) {
                obj.value++;
            }
        });
    });
}

function sort(filtered_data) {
    // return data.filter(obj => obj.value > 0).sort((a, b) => b.value - a.value);
    return filtered_data.sort((a, b) => b.value - a.value);
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

function get_filtered_data() {
    if (tags[0] == null) return data; 
    return data.filter(checkTags); 
}

function checkTags(obj) {
    includesTag = false;
    tags.forEach((tag)=> {
        if (tag.toLowerCase() == obj.category.toLowerCase()) {
            includesTag = true;
        }
    })
    return includesTag;
}

function addTag(tag) {
    tags.add(tag);
    runSearch();
}

window.onload=function() {
    document.getElementById("searchbox").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit_button").click();
        }
    });
    document.getElementById("common").addEventListener("change", function(event) {
        if (event.target.checked) {
            tags.push("common");
        }
        else {
            tags = tags.filter(tag => tag != "common");
        }
        runSearch();
    });
    document.getElementById("practicals").addEventListener("change", function(event) {
        if (event.target.checked) {
            tags.push("practicals");
        }
        else {
            tags = tags.filter(tag => tag != "practicals");
        }
        runSearch();
    });
    document.getElementById("github").addEventListener("change", function(event) {
        if (event.target.checked) {
            tags.push("github");
        }
        else {
            tags = tags.filter(tag => tag != "github");
        }
        runSearch();
    });
    document.getElementById("other").addEventListener("change", function(event) {
        if (event.target.checked) {
            tags.push("other");
        }
        else {
            tags = tags.filter(tag => tag != "other");
        }
        runSearch();
    });
}