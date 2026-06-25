# 🔧 trt.Ino2Block

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en/docs/Web/JavaScript)
[![Blockly](https://img.shields.io/badge/Blockly-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/blockly)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

[![School](https://img.shields.io/badge/🏫_School-Grade_5–10-blue?style=flat-square)](https://github.com/jbkunama1/trt.Ino2Block)
[![Subject](https://img.shields.io/badge/🔧_Subject-Tech%20%2F%20CS-orange?style=flat-square)](https://github.com/jbkunama1/trt.Ino2Block)
[![AI](https://img.shields.io/badge/🤖_AI-Google%20Gemini-teal?style=flat-square)](https://aistudio.google.com)
[![Tinkercad](https://img.shields.io/badge/🧱_Blockly-Tinkercad-red?style=flat-square)](https://www.tinkercad.com)

**Arduino C++ Code → Tinkercad/Blockly XML Converter**  
*AI-powered WebApp for Technology & Computer Science Education* 🎓

<a href="https://www.buymeacoffee.com/highfish"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

</div>

---

## 📋 What does this app do?

**trt.Ino2Block** converts Arduino C++ code automatically into **Blockly XML** – the block programming format used by Tinkercad and other Blockly-based environments. Input: any Arduino sketch. Output: importable XML for Blockly-compatible tools.

The conversion runs entirely in the browser – no backend, no server, no installation required.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| ⚡ **AI Conversion** | Uses Google Gemini 1.5 Flash for intelligent code analysis |
| 🧱 **Blockly XML Export** | Valid XML ready for Tinkercad / Blockly |
| 🔍 **Live Preview** | Blockly workspace rendered directly in the browser |
| 💾 **XML Download** | Export as `.xml` file with one click |
| 📋 **Clipboard** | Copy XML directly to clipboard |
| 🌑 **Dark UI** | Modern dark-mode design suitable for classroom use |
| 🔒 **Client-only** | API key is never transmitted – stays in the browser |

---

## 📁 Project Structure

```
📦 trt.Ino2Block
 ┣ 📄 index.html          → Main WebApp (enter & convert Arduino code)
 ┣ 📜 app.js              → Logic: Gemini API, Blockly, Export
 ┣ 🎨 style.css           → Dark-Mode UI
 ┣ 📁 docs/
 ┃ ┗ 📄 index.html        → GitHub Pages Landing Page
 ┣ 📁 .github/workflows/
 ┃ ┗ 🔐 trufflehog.yml    → Secret scanning on every push
 ┣ 📖 README.md           → German version
 ┗ 📖 README_EN.md        → This file (English)
```

---

## 🚀 Usage

### Option A – Directly in the Browser (no setup)
1. Clone the repo: `git clone https://github.com/jbkunama1/trt.Ino2Block`
2. Open `index.html` in your browser
3. Paste your Arduino code
4. Enter your Gemini API key ([get it free](https://aistudio.google.com/app/apikey))
5. Click **⚡ Convert**
6. Export XML or load the live preview

### Option B – GitHub Pages
The app is available online at:  
👉 **https://jbkunama1.github.io/trt.Ino2Block**

---

## 🔑 API Key

The app requires a **Google Gemini API key**:
- Free, no credit card needed: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- The key is used **exclusively in the browser** (no server, no logging)
- Recommendation: LocalStorage-based key saving coming in v2

---

## 🏫 Classroom Use

> 💡 Ideal for **Technology & Computer Science classes in grades 5–10**, especially for:

<div align="center">

🤖 **Robotics** &nbsp;|&nbsp; ⚙️ **Arduino** &nbsp;|&nbsp; 🧱 **Block Programming** &nbsp;|&nbsp; 💡 **Physical Computing** &nbsp;|&nbsp; 🔬 **Tinkercad Simulation**

</div>

**Typical classroom workflow:**
1. Students write Arduino code in text view (Tinkercad or IDE)
2. Paste code into trt.Ino2Block → generate XML
3. Import XML into Tinkercad Blocks view → connection between code & blocks becomes visible
4. Reflection: Which blocks correspond to which lines of code?

---

## ⚠️ Limitations

- 📐 Complex Arduino libraries (e.g. `Servo.h`, `Wire.h`) are rendered as custom blocks
- 🔁 Conversion is **AI-assisted**, not a deterministic parser – results may vary
- 🌐 Internet connection required for the Gemini API
- 🔒 No API key persistence in v1 – key must be re-entered on each page load

---

## 🏷️ Tags

`#Arduino` &nbsp;`#Blockly` &nbsp;`#Tinkercad` &nbsp;`#TechEducation` &nbsp;`#ComputerScience` &nbsp;`#STEM` &nbsp;`#PhysicalComputing` &nbsp;`#GeminiAI` &nbsp;`#WebApp` &nbsp;`#OpenSource` &nbsp;`#HTML5` &nbsp;`#JavaScript`

---

## ☕ Support

If you like this project and want to support further development:

<a href="https://www.buymeacoffee.com/highfish"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

---

<div align="center">

Made with ❤️ for education &nbsp;|&nbsp; 🔧 trt.Ino2Block · [therealteacher](https://www.realteacher.de)

</div>
