const grid = document.getElementById("grid");
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const gridItem = document.getElementsByClassName('grid-item');

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
    })
};

// initial 
makeGrid(16);
draw();

sizeSlider.onchange = () => {
    sizeValue.innerHTML = `Size: ${sizeSlider.value} x ${sizeSlider.value}`;
    clearGrid();
    makeGrid(sizeSlider.value);
    draw();
};

function draw() {
    Array.from(gridItem).forEach(item => {
        let isDown = false;
        
        item.addEventListener('dragstart', (e) => {
            e.preventDefault();
            console.log('drag prevented')
        });

        item.addEventListener("mousedown", () => {
            isDown = true;
            item.style.backgroundColor = 'red';
            drawing();
        });

        function stopDrawing() {
            Array.from(gridItem).forEach(cell => {
                cell.addEventListener('mouseup', () => {
                    isDown = false;
                });
            });
        };

        function drawing() {
            Array.from(gridItem).forEach(cell => {
                cell.addEventListener('mouseover', () => {
                    if (isDown == true) {
                        cell.style.backgroundColor = 'red'
                        stopDrawing();
                    } ;
                });
            });
        };
    });
};


