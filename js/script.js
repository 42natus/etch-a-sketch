const button = document.querySelector("button");
const container = document.querySelector(".container");
const CONTAINER_SIZE = 70;

button.addEventListener("click", getDimension)
button.addEventListener("changedimension", drawGrid);

function drawGrid(event) {
    const dimension = event.detail.dimension || 16;
    const gridSize = dimension * dimension;
    const cellWidth = CONTAINER_SIZE / dimension;
    const cellHeight = CONTAINER_SIZE / dimension;

    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("style", `width: ${cellWidth}vw; height: ${cellHeight}vh;`);
        container.appendChild(cell);
        // change color on hover
        cell.addEventListener("mouseenter", (event) => event.target.classList.add("change-color"));
    }
}

function getDimension() {
    clearGrid();
    
    let dimension = null;
    while (1 > dimension || dimension > 100) {
        dimension = parseInt(prompt("How many squares per side would you like?\n(Has to be between 1 and 100)", 16));
    }
    console.log(dimension);

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
}