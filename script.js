//Set up the grid
let gridSize = 16;
let gridLength = gridSize * gridSize;
let squareBackgroundColor = 'black';
let drawingMode = 'black';
const grid = document.querySelector('#grid');
console.log(`Grid size is ${gridSize}.`);
for(i = 1;i <= gridLength;i++) {
    let g = document.createElement('div');
    g.setAttribute("id", i);
    g.setAttribute("grid-square", true);
    grid.appendChild(g);
    g.classList.add('grid-square');
}

//Create a node list consisting of the individual grid squares
const gridSquares = document.querySelectorAll(".grid-square");
// console.log(gridSquares);
gridSquares.forEach((square) => {
    square.addEventListener('mouseenter', () => {
        // console.log(square.id);
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
        };
    });
    
    
});

//Create a node list of buttons
const buttons = document.querySelectorAll(".btn");
console.log(buttons);
buttons.forEach((e) => {
    e.addEventListener('mousedown', () => {
        console.log(e.id);
        console.log(e.classList);
        // var current = document.getElementsByClassName("active");
        // console.log('current: ' + e.classList);
        // e.classList.remove('active');
        // console.log('current after: ' + e.classList);
        buttons.forEach(b => b.classList.remove('active'));
        if (e.id != 'reset') e.classList.add('active');
        if (e.id === 'reset') {
            const s = document.querySelector('#black');
            s.classList.add('active');
        }
        
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
                console.log('Erase the grid, gridlength: ' + gridLength);
                gridSquares.forEach((square) => {
                        square.style.backgroundColor = 'lightgray';
                });
            break;
            default:
            // code block
        }
    })
});

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