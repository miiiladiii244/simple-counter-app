// Simple Counter App with XSS Vulnerabilities

let counter = 0;
const history = [];

// DOM elements
const counterDisplay = document.getElementById('counter-display');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');
const customValueInput = document.getElementById('custom-value');
const setBtn = document.getElementById('set-btn');
const messageInput = document.getElementById('message-input');
const addMessageBtn = document.getElementById('add-message-btn');
const messagesDiv = document.getElementById('messages');
const historyDiv = document.getElementById('history');

// Update counter display
function updateDisplay() {
    counterDisplay.textContent = counter;
}

// Add to history
function addToHistory(action) {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `${timestamp} - ${action}`;
    history.push(entry);
    
    // XSS VULNERABILITY #1: Using innerHTML without sanitization
    historyDiv.innerHTML += `<div class="history-item">${entry}</div>`;
}

// Increment counter
incrementBtn.addEventListener('click', () => {
    counter++;
    updateDisplay();
    addToHistory(`Incremented to ${counter}`);
});

// Decrement counter
decrementBtn.addEventListener('click', () => {
    counter--;
    updateDisplay();
    addToHistory(`Decremented to ${counter}`);
});

// Reset counter
resetBtn.addEventListener('click', () => {
    counter = 0;
    updateDisplay();
    addToHistory('Counter reset to 0');
});

// Set custom value
setBtn.addEventListener('click', () => {
    const value = customValueInput.value;
    
    // XSS VULNERABILITY #2: Using innerHTML with user input
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
        // XSS VULNERABILITY #3: Displaying user input directly in innerHTML
        historyDiv.innerHTML += `<div class="history-item" style="color: red;">Invalid input: ${value}</div>`;
        return;
    }
    
    counter = numValue;
    updateDisplay();
    addToHistory(`Counter set to ${counter}`);
    customValueInput.value = '';
});

// Add message
addMessageBtn.addEventListener('click', () => {
    const message = messageInput.value;
    
    if (message === '') {
        alert('Please enter a message');
        return;
    }
    
    // XSS VULNERABILITY #4: Using innerHTML with user-provided message
    messagesDiv.innerHTML += `<div class="message-item">${message}</div>`;
    messageInput.value = '';
});

// Initialize
updateDisplay();

// XSS VULNERABILITY #5: Reading from URL parameters without sanitization
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialValue = urlParams.get('initial');
    
    if (initialValue) {
        // XSS VULNERABILITY #6: Using innerHTML with URL parameter
        document.querySelector('.container').innerHTML += 
            `<div class="history-item">Loaded with initial value: ${initialValue}</div>`;
        
        const numValue = parseInt(initialValue);
        if (!isNaN(numValue)) {
            counter = numValue;
            updateDisplay();
        }
    }
    
    const welcomeMsg = urlParams.get('welcome');
    if (welcomeMsg) {
        // XSS VULNERABILITY #7: Directly injecting URL parameter into DOM
        messagesDiv.innerHTML = `<div class="message-item">${welcomeMsg}</div>`;
    }
});
