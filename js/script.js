//basic-calculator
const main = document.querySelector('.main');
const input = main.querySelector('.input');
const keypad = input.querySelector('.keypad');
const auxkeys = keypad.querySelector('.auxkeys');
const mainkeys = keypad.querySelector('.mainkeys');
const opkeys = input.querySelector('.opkeys');

const output = document.querySelector('.output');
const auxscreen = output.querySelector('.auxscreen');
const mainscreen = output.querySelector('.mainscreen');

let auxOutput = document.createElement('span');
auxOutput.className = 'auxOutput';
auxOutput.textContent = '0'; //16 digit max
auxscreen.appendChild(auxOutput);

let mainOutput = document.createElement('span');
mainOutput.className = 'mainOutput';
mainOutput.textContent = '0'; //8 digit max
mainscreen.appendChild(mainOutput);

{ const auxButtons = [
    { '.allClear': 'AC'}, { '.clear': 'C'}, { '.power': 'x\u02b8'},
    { '.percentage': '%'},
];
createButtons( auxkeys, auxButtons, true, 'gray');
auxkeys.firstElementChild.style['background-color'] = 'red';
auxkeys.firstElementChild.nextElementSibling.style['background-color'] = 'orange';

const mainButtons = [
    { '.seven': '7'}, { '.eight': '8'}, { '.nine': '9'},
    { '.four': '4'}, { '.five': '5'}, { '.six': '6'},
    { '.one': '1'}, { '.two': '2'}, { '.three': '3'},
    { '.nil': '0'}, { '.decimal': '.'}, { '.sign': '\u00B1'},
];
createKeypad( mainkeys, mainButtons, 'lightblue');

const opButtons = [
    { '.divide': '\u00F7'}, { '.multiply': 'x'},
    { '.subtract': '-'}, { '.add': '+'},
    { '.answer': '='},
];
createButtons( opkeys, opButtons, false, 'gray');
};

let calculateRef = calculate.bind(null, true);

input.addEventListener( 'click', calculateRef);



//Procedures
function calculate( l, event) {
    console.log( "[operate] event on: " + event.target + ", class: " + event.target.className);
    switch (event.target.className) {
        case '.nine':
            console.log('nine');
            outputNumber( 9);
            break;
        case '.eight':
            console.log('eight');
            outputNumber( 8);
            break;
        case '.seven':
            console.log('seven');
            outputNumber( 7);
            break;
        case '.six':
            console.log('six');
            outputNumber( 6);
            break;
        case '.five':
            console.log('five');
            outputNumber( 5);
            break;
        case '.four':
            console.log('four');
            outputNumber( 4);
            break;
        case '.three':
            console.log('three');
            outputNumber( 3);
            break;
        case '.two':
            console.log('two');
            outputNumber( 2);
            break;
        case '.one':
            console.log('one');
            outputNumber( '1');
            break;
        case '.nil':
            console.log('nil');
            outputNumber( 0);
            break;
        case '.decimal':
            console.log('decimal');
            if (!isDecimal()) {
                outputNumber( '.');
            }
            break;
        case '.sign':
            if ( Number(mainOutput.textContent) !== 0) {
                if (!isSigned()) mainOutput.textContent = '-' + mainOutput.textContent;
                else mainOutput.textContent = mainOutput.textContent.slice( 1);
            }
            console.log('sign: ' + mainOutput.textContent);
            break;
        case '.nil':
            console.log('nil');
            if (mainOutput.textContent !== '0') {
                outputNumber( 9);
            }
            break;
        case '.clear':
            console.log('clear');
            if (mainOutput.textContent.length === 1) {
                mainOutput.textContent = '0';
            }
            if (mainOutput.textContent.length === 2 && mainOutput.textContent.charAt(0) === '-') {
                mainOutput.textContent = '0';
            }
            else mainOutput.textContent = mainOutput.textContent.slice(0, mainOutput.textContent.length -1);
            break;
        case '.allClear':
            console.log('allclear');
            mainOutput.textContent = '0';
            auxOutput.textContent = '0';
            break;
        case '.power':
            console.log('power');
            outputOperator('^');
            break;
        case '.percentage':
            console.log('percentage');
            outputOperator('%');
            break;
        case '.divide':
            console.log('divide');
            outputOperator('/');
            break;
        case '.multiply':
            console.log('multiply');
            outputOperator('x');
            break;
        case '.subtract':
            console.log('subtract');
            outputOperator('-');
            break;
        case '.add':
            console.log('add');
            outputOperator('+');
            break;
        case '.answer':
            console.log('answer');
            outputOperator('=');
            break;
        default:
            console.log('out of keys');
            break;
    }
}

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

function outputNumber( number) {

    let max = 20;
    let maximumWidth = mainscreen.clientWidth - (mainscreen.clientWidth *(max/100));
    if ((maximumWidth) < mainOutput.clientWidth) {
        console.log('full output main');
        return;
    }
    if ( mainOutput.textContent.length === 1) {
        if (mainOutput.textContent === '0') {
            if ( number === '.') {
                mainOutput.textContent += number + '';
            }
            else mainOutput.textContent = number + '';
            // console.log( 'BASE');
            return;
        }
    }
    if ( mainOutput.textContent.length === 2) {
        if ( mainOutput.textContent === '-0') {
            if ( number === '.') {
                mainOutput.textContent += number + '';
            }
            else mainOutput.textContent = number + '';
            return;
        }
    }
    mainOutput.textContent += number + '';
    console.log(mainOutput.textContent);
}

function outputOperator( op) {
    if ( mainOutput.textContent.length > 0 && mainOutput.textContent !== '0' && mainOutput.textContent != '-0' && Number(mainOutput.textContent) != 0) {
        if ( auxOutput.textContent.length > 0 && auxOutput.textContent !== '0' && mainOutput.textContent != '-0') {
            let prevOperator = auxOutput.textContent.slice(auxOutput.textContent.length - 1);
            let operandOne = auxOutput.textContent.slice( 0, auxOutput.textContent.length - 1);
            let operandTwo = mainOutput.textContent;
            let result = operate( prevOperator, operandOne, operandTwo);
            switch ( op) {
                case ('+'): case ('-'): case ('x'): case ('/'): case ('^'):
                    mainOutput.textContent = '0';
                    auxOutput.textContent = result + op + '';
                    break;
                case ('='):
                    mainOutput.textContent = result + '';
                    auxOutput.textContent = '0';
                    break;
                case ('%'):
                    mainOutput.textContent = operate( op, result) + '';
                    auxOutput.textContent = '0';
                    break;
                default:
                    console.log('[outputOpertor] something wrong x1');
            }
        } else {
            switch ( op) {
                case ('+'): case ('-'): case ('x'): case ('/'): case ('^'):
                    auxOutput.textContent = mainOutput.textContent + op + '';
                    mainOutput.textContent = '0';
                    break;
                case ('%'):
                    mainOutput.textContent = operate( op, mainOutput.textContent);
                    break;
                default:
                    console.log('[outputOpertor] something wrong x2');
            }
        }
    } else {
        //if mainOutput empty
        console.log("zero_place");
    }
}

function operate( operator, operandOne, operandTwo) {
    console.log( "Operating..... " + operandOne + ' and ' + operandTwo);
    console.log(operator);
    let result = 0;
    switch (operator) {
        case '^':
            console.log('Power');
           result = power( Number(operandOne), Number(operandTwo)); 
            break;
        case '/':
            console.log('divide');
           result = divide( Number(operandOne), Number(operandTwo)); 
            break;
        case 'x':
            console.log('Multiply');
           result = multiply( Number(operandOne), Number(operandTwo)); 
            break;
        case '-':
            console.log('Sbtract');
           result = subtract( Number(operandOne), Number(operandTwo)); 
            break;
        case '+':
            console.log('Add');
           result = add( Number(operandOne), Number(operandTwo)); 
            break;
        case '%':
            console.log('Percentge');
           result = percentage( Number(operandOne));
           console.log( '% ' + result);
            break;
        default:
            break;
    }
    result = Math.round( (result + Number.EPSILON) * 10**4) / 10**4;
    if ( ( result + '').length > 8) result = result.toExponential(3); 
    console.log('result = ' + result);
    return result;
}

function isDecimal() {
    const text = mainOutput.textContent;
    for ( let i = 0; i < text.length; ++i) {
        if ( text.charAt(i) === '.') return true;
    }
    return false;
}

function isSigned() {
    if ( mainOutput.textContent.charAt(0) === '-') return true;
}

function add( operandOne, operandTwo) {
    return operandOne + operandTwo;
}

function subtract( operandOne, operandTwo) {
    return operandOne - operandTwo;
}

function multiply( operandOne, operandTwo) {
    console.log( 'Mul ' + operandOne + ' * ' + operandTwo);
    return operandOne * operandTwo;
}

function divide( operandOne, operandTwo) {
    return operandOne / operandTwo;
}

function percentage( val) {
    return (val / 100);
}

function power( operandOne, operandTwo) {
    return Math.pow(operandOne, operandTwo);
}