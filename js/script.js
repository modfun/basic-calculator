const main = document.querySelector('.main');
const input = main.querySelector('.input');
const keypad = input.querySelector('.keypad');
const auxkeys = keypad.querySelector('.auxkeys');
const mainkeys = keypad.querySelector('.mainkeys');
const opkeys = input.querySelector('.opkeys');

const output = document.querySelector('.output');
const auxscreen = output.querySelector('.auxscreen');
const mainscreen = output.querySelector('.mainscreen');

let auxOutput = document.createElement('p');
auxOutput.className = 'auxOutput';
auxOutput.textContent = '0000000000000000'; //16 digit
auxscreen.appendChild(auxOutput);

let mainOutput = document.createElement('p');
mainOutput.className = 'mainOutput';
mainOutput.textContent = '00000000'; //8 digit
mainscreen.appendChild(mainOutput);

const auxButtons = [
    { '.allClear': 'AC'}, { '.clear': 'C'}, { '.power': 'x\u02b8'},
    { '.percentage': '%'},
];
createButtons( auxkeys, auxButtons, true, 'gray');

const mainButtons = [
    { '.seven': '7'}, { '.eight': '8'}, { '.nine': '9'},
    { '.four': '4'}, { '.five': '5'}, { '.six': '6'},
    { '.one': '1'}, { '.two': '2'}, { '.three': '3'},
    { '.nil': '0'}, { '.decimil': '.'}, { '.sign': '-/+'},
];
createKeypad( mainkeys, mainButtons, 'lightblue');

const opButtons = [
    { '.divide': '\u00F7'}, { '.multiply': 'x'},
    { '.subtract': '-'}, { '.add': '+'},
    { '.answer': '='},
];
createButtons( opkeys, opButtons, false, 'darkgray');

function createButtons( target, buttons, isHorizontal, color) {
    let percentage = 100 / buttons.length + '%'
    buttons.forEach( ( btn) => {
        for ( let key in btn) {
            let newButton = document.createElement( 'button');

            newButton.className = key;
            newButton.textContent = btn[key];
            if (isHorizontal) newButton.style['width'] = percentage;
            else newButton.style['height'] = percentage;
            newButton.style['border'] = '2px solid white';
            newButton.style['border-radius'] = '4px';
            newButton.style['background-color'] = color;

            console.log(newButton);
            target.appendChild(newButton);
        }
    });
}

function createKeypad( target, buttons, color) {
    let rowSize = 3;
    for ( let i = 0 ; i < 4; ++i) {
        let newRow = document.createElement('div');
        newRow.className = 'keyrow';
        createButtons( newRow, buttons.slice( i*rowSize, i*rowSize+rowSize), true, color);
        target.appendChild(newRow);
    }
}