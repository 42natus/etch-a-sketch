const button = document.querySelector("button");
const container = document.querySelector(".container");

button.addEventListener("click", getDimension)
button.addEventListener("changedimension", drawGrid);

function drawGrid(event) {
    clearGrid();
    const dimension = event.detail.dimension || 16;
    const gridSize = dimension * dimension;
    const cellWidth = parseInt(container.offsetWidth) / dimension;
    const cellHeight = parseInt(container.offsetHeight) / dimension;

    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("style", `width: ${cellWidth}px; height: ${cellHeight}px;`);
        container.appendChild(cell);
        // change color on hover
        cell.addEventListener("mouseenter", (event) => event.target.classList.add("change-color"));
    }
}

function getDimension() {
    dimension = parseInt(prompt("How many squares per side would you like?", 16));
    // console.log(dimension);

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