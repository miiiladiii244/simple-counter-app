# Simple Counter App - XSS Vulnerability Demonstration

This repository demonstrates **Cross-Site Scripting (XSS)** vulnerabilities in a simple web application and provides secure implementations.

## ⚠️ Security Warning

**DO NOT deploy the vulnerable version (`app.js`) in production!** This code is intentionally vulnerable and is meant for educational purposes only.

## 📋 Project Overview

This project contains:
1. **Vulnerable Version** (`app.js`) - Contains 7 XSS vulnerabilities
2. **Secure Version** (`app-secure.js`) - All vulnerabilities fixed
3. **Security Analysis** (`SECURITY_ANALYSIS.md`) - Detailed vulnerability report

## 🔍 Identified XSS Vulnerabilities

The application contains **7 XSS vulnerabilities**:

1. **History Entry XSS** - Unsafe use of `innerHTML` in history display
2. **Custom Value Display XSS** - User input displayed without sanitization
3. **Message Display XSS** - User messages inserted directly into DOM
4. **URL Parameter Initial Value XSS** - URL params injected without validation
5. **URL Parameter Welcome Message XSS** - Welcome message from URL unsafe
6. **Counter Value History XSS** - All history entries vulnerable
7. **Concatenated innerHTML XSS** - Using `+=` with innerHTML

## 🚀 Getting Started

### Prerequisites
- Node.js (for running a local server)
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/miiiladiii244/simple-counter-app.git
cd simple-counter-app

# Install dependencies (optional, for linting and serving)
npm install
```

### Running the Application

#### Option 1: Using npm (recommended)
```bash
npm start
```
Then open http://localhost:8080 in your browser.

#### Option 2: Using Python
```bash
python -m http.server 8080
```

#### Option 3: Direct file access
Open `index.html` directly in your browser.

## 🧪 Testing XSS Vulnerabilities

### Test 1: Message Input XSS
1. In the "Add Message" section, enter:
   ```html
   <img src=x onerror=alert('XSS')>
   ```
2. Click "Add Message"
3. An alert will pop up (vulnerable version only)

### Test 2: Custom Value XSS
1. In "Set Counter Value", enter:
   ```html
   <img src=x onerror=alert('XSS')>
   ```
2. Click "Set Value"
3. An alert will pop up (vulnerable version only)

### Test 3: URL Parameter XSS
Open the following URLs:
```
index.html?welcome=<img src=x onerror=alert('XSS')>
index.html?initial=<script>alert('XSS')</script>
```

### Test 4: Cookie Stealing (Simulated)
```html
<img src=x onerror="console.log('Stolen cookie:', document.cookie)">
```

## 🔒 Using the Secure Version

To use the secure version:

1. Open `index.html`
2. Change the script tag from:
   ```html
   <script src="app.js"></script>
   ```
   to:
   ```html
   <script src="app-secure.js"></script>
   ```

Now all XSS attacks will fail because the secure version uses:
- `textContent` instead of `innerHTML`
- `createElement()` and `appendChild()` for DOM manipulation
- Proper input validation and sanitization

## 📚 Security Analysis

For a detailed analysis of all vulnerabilities, see [SECURITY_ANALYSIS.md](SECURITY_ANALYSIS.md).

The report includes:
- Detailed vulnerability descriptions
- Attack vectors and proof of concepts
- Impact assessment
- Remediation strategies
- Prevention best practices

## 🛡️ Key Security Lessons

### ❌ Vulnerable Code Pattern
```javascript
// DON'T DO THIS
element.innerHTML = userInput;
element.innerHTML += `<div>${userInput}</div>`;
```

### ✅ Secure Code Pattern
```javascript
// DO THIS INSTEAD
const div = document.createElement('div');
div.textContent = userInput; // Automatically escapes HTML
element.appendChild(div);
```

## 🔧 Fixing XSS Vulnerabilities

### Before (Vulnerable)
```javascript
historyDiv.innerHTML += `<div class="history-item">${entry}</div>`;
```

### After (Secure)
```javascript
const historyItem = document.createElement('div');
historyItem.className = 'history-item';
historyItem.textContent = entry;
historyDiv.appendChild(historyItem);
```

## 📖 Additional Resources

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 🤝 Contributing

This is an educational project demonstrating security vulnerabilities. If you find additional vulnerabilities or have suggestions for improvement, please open an issue or pull request.

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This code is for **educational purposes only**. The vulnerable version intentionally contains security flaws and should never be used in production. The authors are not responsible for any misuse of this code.

## 📝 Summary

- **Total Vulnerabilities Found**: 7
- **Severity**: Critical
- **Type**: Cross-Site Scripting (XSS)
- **Status**: Documented and Fixed
- **Secure Version**: Available in `app-secure.js`