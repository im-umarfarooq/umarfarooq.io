const skills = document.querySelectorAll(".fill");

window.addEventListener("scroll", () => {

skills.forEach(skill => {

skill.style.transition = "2s";

});

});