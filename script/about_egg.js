
const toggle = document.getElementById("toggle-anime");
const easterItems = document.querySelectorAll(".easter-item");


document.addEventListener("DOMContentLoaded", () => {
document.querySelectorAll(".easter-item")
    .forEach(item => item.style.display = "none");
});


let visible = false;

toggle.addEventListener("click", () => {
    visible = !visible;

    easterItems.forEach(item => {
        if (visible) {
            item.style.display = "list-item";
            requestAnimationFrame(() => item.style.opacity = "1");
        } else {
            item.style.opacity = "0";
            setTimeout(() => {
                item.style.display = "none";
            }, 250);
        }
    });
});
