const newGrid = document.querySelector(".new-grid");
const container = document.querySelector(".container");

// from the width and height values set in the stylesheet
const CONTAINER_SIZE_WIDTH = 35;
const CONTAINER_SIZE_HEIGHT = 65;

// draw an initial 16x16 grid once the page loads
let currentDimension = 16;
let useColors = true;
document.addEventListener("DOMContentLoaded", drawGrid);

// create new grid
newGrid.addEventListener("click", getDimension);
newGrid.addEventListener("changedimension", drawGrid);

function drawGrid(event) {
    const dimension = event.detail ? event.detail.dimension : currentDimension;
    const gridSize = dimension * dimension;
    const cellWidth = CONTAINER_SIZE_WIDTH / dimension;
    const cellHeight = CONTAINER_SIZE_HEIGHT / dimension;

    // create grid cells
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("style", `width: ${cellWidth}vw; height: ${cellHeight}vh;`);
        container.appendChild(cell);
    }

    // change color on hover
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        let opacity = 10;
        cell.addEventListener("mouseenter", (event) => {
            if (useColors) {
                event.target.style.backgroundColor = `${generateRandomColor()} ${opacity}%)`; // multi-colored
            } else {
                event.target.style.backgroundColor = `rgb(0,0,0, ${opacity}%)`; // greyscale
            }
            opacity += 10;
        });
    });
}

function getDimension() {
    removeCurrentGrid();

    let dimension = null;
    while (1 > dimension || dimension > 100) {
        dimension = parseInt(prompt("How many squares per side would you like?\n(Has to be between 1 and 100)", 16));
    }

    // default to 16x16 grid if prompt is cancelled or Esc key pressed.
    dimension = (Number.isNaN(dimension)) ? 16 : dimension;

    // set currentDimension to user input for global awareness
    currentDimension = dimension;
    
    triggerCustomEvent("changedimension", dimension);
}

function triggerCustomEvent(event, data=null) {
    let custom = new CustomEvent(event, {
        detail: {
            dimension: data,
        },
    });

    newGrid.dispatchEvent(custom);
}

function removeCurrentGrid() {
    const cells = container.querySelectorAll(".cell");
    cells.forEach((cell) => cell.remove());
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b},`
}

const clearGrid = document.querySelector(".clear-grid");

// clear and redraw current grid
clearGrid.addEventListener("click", (event) => {
    removeCurrentGrid();
    drawGrid(currentDimension);
})

// options for either color or greyscale
const greyscale = document.querySelector(".greyscale");
const colors = document.querySelector(".colors");

greyscale.addEventListener("click", () => {
    useColors = false;
    let clickEvent = new Event("click");
    clearGrid.dispatchEvent(clickEvent);
});

colors.addEventListener("click", () => {
    useColors = true;
    let clickEvent = new Event("click");
    clearGrid.dispatchEvent(clickEvent);
});
