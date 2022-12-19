const grid = document.getElementById("grid");
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const gridItem = document.getElementsByClassName('grid-item');
const colorSelect = document.getElementById('color');
const clearBtn = document.getElementById('clear');

function makeGrid(size) {
    grid.style.setProperty('--grid-rows', size);
    grid.style.setProperty('--grid-cols', size);
    for (i = 0; i < (size * size); i++) {
        let cell = document.createElement('div');
        grid.appendChild(cell).className = "grid-item";
    };
};

function clearGrid() {
    let element = document.querySelectorAll('.grid-item');
    element.forEach(item => {
        item.remove();
    });
};

function draw() {
    let isDown = false;
    Array.from(gridItem).forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        item.addEventListener("mousedown", () => {
            isDown = true;
            item.style.backgroundColor = color;
            Array.from(gridItem).forEach(cell => {
                cell.addEventListener('mouseover', () => {
                    if(isDown == true) {
                        cell.style.backgroundColor = color;
                    };
                });
                cell.addEventListener('mouseup', () => {
                    isDown = false;
                });
            });
        });
    });
};

// initial 
makeGrid(16);
draw();
let color = "black";

clearBtn.addEventListener('click', () => {
    clearGrid();
    makeGrid(sizeSlider.value);
    draw();
});
colorSelect.addEventListener('input', () => {
    color = colorSelect.value;
});
sizeSlider.onchange = () => {
    sizeValue.innerHTML = `Size: ${sizeSlider.value} x ${sizeSlider.value}`;
    clearGrid();
    makeGrid(sizeSlider.value);
    draw();
};