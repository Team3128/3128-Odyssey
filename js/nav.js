document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    navToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
});