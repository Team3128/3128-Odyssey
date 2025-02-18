document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("scroll").addEventListener("click", function () {
        document.getElementById("project_menu").scrollIntoView({ behavior: "smooth" });
    });
});
