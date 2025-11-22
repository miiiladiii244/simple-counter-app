// Simple Counter App - SECURE VERSION (XSS vulnerabilities fixed)

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

// Add to history - SECURE VERSION
function addToHistory(action, isError = false) {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `${timestamp} - ${action}`;
    history.push(entry);
    
    // FIX: Use createElement and textContent instead of innerHTML
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    if (isError) {
        historyItem.style.color = 'red';
    }
    historyItem.textContent = entry; // textContent automatically escapes HTML
    historyDiv.appendChild(historyItem);
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

// Set custom value - SECURE VERSION
setBtn.addEventListener('click', () => {
    const value = customValueInput.value;
    
    if (value === '') {
        alert('Please enter a value');
        return;
    }
    
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
        // FIX: Use safe DOM manipulation instead of innerHTML
        addToHistory(`Invalid input: ${value}`, true);
        return;
    }
    
    counter = numValue;
    updateDisplay();
    addToHistory(`Counter set to ${counter}`);
    customValueInput.value = '';
});

// Add message - SECURE VERSION
addMessageBtn.addEventListener('click', () => {
    const message = messageInput.value;
    
    if (message === '') {
        alert('Please enter a message');
        return;
    }
    
    // FIX: Use createElement and textContent instead of innerHTML
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.textContent = message; // textContent automatically escapes HTML
    messagesDiv.appendChild(messageItem);
    
    messageInput.value = '';
});

// Initialize
updateDisplay();

// URL Parameters handling - SECURE VERSION
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialValue = urlParams.get('initial');
    
    if (initialValue) {
        // FIX: Use safe DOM manipulation
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = `Loaded with initial value: ${initialValue}`;
        document.querySelector('.container').appendChild(historyItem);
        
        const numValue = parseInt(initialValue);
        if (!isNaN(numValue)) {
            counter = numValue;
            updateDisplay();
        }
    }
    
    const welcomeMsg = urlParams.get('welcome');
    if (welcomeMsg) {
        // FIX: Use createElement and textContent
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.textContent = welcomeMsg; // Safe from XSS
        messagesDiv.appendChild(messageItem);
    }
});
