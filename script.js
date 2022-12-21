var drawingMode = 'black';
var squareBackgroundColor = 'black';
var gridSize = 32;
var gridLength = gridSize * gridSize;
// var gridLength = gridSize * gridSize;
gridRangeValue.textContent = gridSize;
var toggle = document.getElementById('toggleHover');

//set up mouse listeners for dragging
var isDragging = false;

document.addEventListener('mousedown', function(event) {
  // The mouse has been pressed, so set isDragging to true
  isDragging = true;
});

document.addEventListener('mouseup', function(event) {
  // The mouse has been released, so set isDragging to false
  isDragging = false;
});

//Set up the grid
setupGrid(gridSize);

//pass in the state of the Hover toggle button when calling setupGridSquares
setupGridSquares(toggle);

//Set up the input range
var range = document.getElementById("gridRange");
var gSize = document.getElementById("gridRangeValue");
gSize.innerHTML = gridSize;

range.onmousemove = function() {
    gridRangeValue.innerHTML = this.value;
    gridSize = this.value;
    console.log('New gridSize is: ' + gridSize);
}

range.onchange = function() {
    setupGrid(gridSize);
    setupGridSquares(toggle);
}




//Create a node list of buttons
const buttons = document.querySelectorAll(".btn");
console.log(buttons);
buttons.forEach((e) => {
    e.addEventListener('mousedown', () => {
        console.log(e.id);
        console.log(e.classList);
        buttons.forEach(b => b.classList.remove('active'));
        if (e.id != 'reset') e.classList.add('active');
        
        switch(e.id) {
            case 'black':
            drawingMode = 'black';
            squareBackgroundColor = 'black';
            break;
            case 'rainbow':
            drawingMode = 'rainbow';
            // code block
            break;
            case 'darken':
            drawingMode = 'darken';
            // code block
            break;
            case 'erase':
            drawingMode = 'erase';
            // code block
            break;
            case 'reset':
            drawingMode = 'black';
            let s = document.querySelector('#black');
            s.classList.add('active');
            console.log('Erase the grid, gridlength: ' + gridLength);
            setupGrid(gridSize);
            setupGridSquares(toggle);
            break;
            default:
            // code block
        }
    })
});

function setupGrid(size) {
    // calculate the size of one square in the grid
    let squareSize = 704 / size;
    gridLength = size * size;
    const grid = document.querySelector('#grid');
    grid.innerHTML = '';
    console.log(`Grid size is ${size}.`);
    for(i = 1;i <= gridLength;i++) {
        let g = document.createElement('div');
        g.setAttribute("id", i);
        g.setAttribute("grid-square", true);
        grid.appendChild(g);
        g.classList.add('grid-square');
        g.style.width = `${squareSize}px`;
        g.style.height = `${squareSize}px`;
    }
    grid.style.gridTemplateColumns = `repeat(${size}, auto)`
    grid.style.gridTemplateRows = `repeat(${size}, auto)`
}

function setupGridSquares(toggle) {
    //Create a node list consisting of the individual grid squares
    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square) => {
        square.addEventListener('mouseover', (event) => drawHandler(event, square, toggle));
        square.addEventListener('mousedown', (event) => drawHandler(event, square, toggle));
    });
};

function drawHandler(event, square, toggle) {
    let draw = false;
    console.log('toggle:' + toggle.checked);
    if ((toggle.checked) && (event.type === 'mouseover')) { draw = true; }
    if ((toggle.checked === false) && (isDragging)) { draw = true; }
    // if ((toggle.checked === false) && (event.type === 'mousedown')) { draw = true; }
    if (draw) {
        switch(drawingMode) {
            case 'black':
            square.style.backgroundColor = squareBackgroundColor;
            break;
            case 'rainbow':
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            square.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
            break;
            case 'darken':
            console.log('darken mode selected')
            let message = getComputedStyle(square);
            console.log(message.backgroundColor);
            square.style.backgroundColor = darkenColor(message.backgroundColor);
            break;
            case 'erase':
            square.style.backgroundColor = 'lightgray';
            break;
        }
    }   
}

// Darken the color of default squares by ~10%
function darkenColor(rgbColor) {
    let returnColor = rgbColor;
    switch (rgbColor) {
        case 'rgb(211, 211, 211)':
        returnColor = 'rgb(192, 192, 192)';
        break;
        case 'rgb(192, 192, 192)':
        returnColor = 'rgb(160, 160, 160)';
        break;
        case 'rgb(160, 160, 160)':
        returnColor = 'rgb(128, 128, 128)';
        break;
        case 'rgb(128, 128, 128)':
        returnColor = 'rgb(96, 96, 96)';
        break;
        case 'rgb(96, 96, 96)':
        returnColor = 'rgb(64, 64, 64)';
        break;
        case 'rgb(64, 64, 64)':
        returnColor = 'rgb(32, 32, 32)';
        break;
        case 'rgb(32, 32, 32)':
        returnColor = 'rgb(0, 0, 0)';
        break;
    }
    return returnColor;
}