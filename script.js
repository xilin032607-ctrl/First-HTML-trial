let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousValue === null) {
        previousValue = parseFloat(currentInput);
    } else if (operator) {
        const result = performCalculation(previousValue, parseFloat(currentInput), operator);
        previousValue = result;
        currentInput = result.toString();
    }
    
    operator = op;
    shouldResetDisplay = true;
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== '') {
        const num = parseFloat(currentInput);
        currentInput = (-num).toString();
        updateDisplay();
    }
}

function calculate() {
    if (currentInput === '' || previousValue === null || operator === null) return;
    
    const result = performCalculation(previousValue, parseFloat(currentInput), operator);
    currentInput = result.toString();
    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function performCalculation(prev, current, op) {
    switch (op) {
        case '+':
            return prev + current;
        case '-':
            return prev - current;
        case '*':
            return prev * current;
        case '/':
            return current !== 0 ? prev / current : 0;
        default:
            return current;
    }
}

function updateDisplay() {
    display.value = currentInput || '0';
}

// Initialize display
updateDisplay();

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*') {
        appendOperator(e.key);
    } else if (e.key === '/' || e.key === 'Enter') {
        e.preventDefault();
        if (e.key === '/') appendOperator('/');
        else calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});