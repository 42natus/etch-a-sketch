const button = document.querySelector("button");
const container = document.querySelector(".container");

// from the width and height values set in the stylesheet
const CONTAINER_SIZE_WIDTH = 35;
const CONTAINER_SIZE_HEIGHT = 65; 

// draw an initial 16x16 grid once the page loads
document.addEventListener("DOMContentLoaded", drawGrid);

button.addEventListener("click", getDimension);
button.addEventListener("changedimension", drawGrid);

function drawGrid(event) {
    const dimension = event.detail ? event.detail.dimension : 16;
    const gridSize = dimension * dimension;
    const cellWidth = CONTAINER_SIZE_WIDTH / dimension;
    const cellHeight = CONTAINER_SIZE_HEIGHT / dimension;

    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("style", `width: ${cellWidth}vw; height: ${cellHeight}vh;`);
        container.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        let opacity = 10;
        cell.addEventListener("mouseenter", (event) => {
            event.target.style.backgroundColor = `${generateRandomColor()}, ${opacity}%`;
            opacity += 10;
        })
    });
}

function getDimension() {
    clearGrid();

    let dimension = null;
    while (1 > dimension || dimension > 100) {
        dimension = parseInt(prompt("How many squares per side would you like?\n(Has to be between 1 and 100)", 16));
    }

    let changeDimension = new CustomEvent("changedimension", {
        detail: {
            dimension: dimension,
        },
    });

    button.dispatchEvent(changeDimension);
}

function clearGrid() {
    const cells = container.querySelectorAll(".cell");
    cells.forEach((cell) => cell.remove());
    opacity = 10;
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b}`
}
