const container = document.querySelector(".container");

let cellWidth = parseInt(container.offsetWidth) / 16;
let cellHeight = parseInt(container.offsetHeight) / 16;

for (let i = 0; i < 256; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("style", `width: ${cellWidth}px; height: ${cellHeight}px;`);
    container.appendChild(cell);
    // change color on hover
    cell.addEventListener("mouseenter", (event) => event.target.classList.add("change-color"));
}