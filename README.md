# 🔧 trt.Ino2Block

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/de/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/de/docs/Web/JavaScript)
[![Blockly](https://img.shields.io/badge/Blockly-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/blockly)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![License: MIT](https://img.shields.io/badge/Lizenz-MIT-green?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

[![Schule](https://img.shields.io/badge/🏫_Schule-Klasse_5–10-blue?style=flat-square)](https://github.com/jbkunama1/trt.Ino2Block)
[![Fach](https://img.shields.io/badge/🔧_Fach-Technik%20%2F%20Informatik-orange?style=flat-square)](https://github.com/jbkunama1/trt.Ino2Block)
[![KI](https://img.shields.io/badge/🤖_KI-Google%20Gemini-teal?style=flat-square)](https://aistudio.google.com)
[![Tinkercad](https://img.shields.io/badge/🧱_Blockly-Tinkercad-red?style=flat-square)](https://www.tinkercad.com)
[![Docker Port](https://img.shields.io/badge/🐳_Port-3210-2496ED?style=flat-square)](https://github.com/jbkunama1/trt.Ino2Block)

**Arduino C++ Code → Tinkercad/Blockly XML Konverter**  
*KI-gestützte WebApp für den Technik- und Informatikunterricht* 🎓

<a href="https://www.buymeacoffee.com/highfish"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

</div>

---

## 📋 Was macht diese App?

**trt.Ino2Block** konvertiert Arduino-C++-Code automatisch in **Blockly XML** – das Blockprogrammierformat, das u. a. von Tinkercad verwendet wird. Eingabe: beliebiger Arduino-Sketch. Ausgabe: importierbares XML für Blockly-kompatible Umgebungen.

Die Konvertierung läuft vollständig im Browser – kein Backend, kein Server-Logik, keine Installation auf Schüler-Geräten.

---

## ✨ Features

| Feature | Beschreibung |
|--------|-------------|
| ⚡ **KI-Konvertierung** | Nutzt Google Gemini 1.5 Flash zur intelligenten Code-Analyse |
| 🧱 **Blockly XML Export** | Valides XML direkt für Tinkercad / Blockly |
| 🔍 **Live-Vorschau** | Blockly-Workspace direkt im Browser |
| 💾 **XML-Download** | Export als `.xml`-Datei per Klick |
| 📋 **Clipboard** | Direktes Kopieren des XML in die Zwischenablage |
| 🐳 **Docker-ready** | Fertig als Container für Schulserver, Heimnetz oder LAN |
| 🌑 **Dark UI** | Schulgeeignetes, modernes Dark-Mode-Design |
| 🔒 **Client-only** | API-Key bleibt im Browser – kein Server-Logging |

---

## 📁 Projektstruktur

```
📦 trt.Ino2Block
 ┣ 📄 index.html                → Haupt-WebApp
 ┣ 📜 app.js                    → Gemini API, Blockly, Export
 ┣ 🎨 style.css                 → Dark-Mode UI
 ┣ 🐳 Dockerfile                → Container-Build (nginx:alpine)
 ┣ 🐳 docker-compose.yml        → Direktstart mit einem Befehl
 ┣ ⚙️  nginx.conf                → nginx-Konfiguration mit Sicherheits-Headern
 ┣ 🚫 .dockerignore              → Schlanker Build-Kontext
 ┣ 📁 docs/
 ┃ ┗ 📄 index.html              → GitHub Pages Landing Page
 ┣ 📁 .github/workflows/
 ┃ ┗ 🔐 trufflehog.yml          → Secret-Scanning bei jedem Push
 ┣ 📖 README.md                 → Diese Datei (Deutsch)
 ┗ 📖 README_EN.md              → English Version
```

---

## 🐳 Docker – Schnellstart

### Option 1 – docker compose (empfohlen)

```bash
# Repo klonen
git clone https://github.com/jbkunama1/trt.Ino2Block
cd trt.Ino2Block

# Starten
docker compose up -d

# App läuft unter:
# http://localhost:3210
# http://<server-ip>:3210
```

### Option 2 – manueller Docker-Build

```bash
docker build -t trt-ino2block .
docker run -d \
  --name trt-ino2block \
  --restart unless-stopped \
  -p 3210:80 \
  trt-ino2block
```

### Portainer Stack

Für Portainer einfach den Inhalt von `docker-compose.yml` als neuen Stack einfügen.

### Container verwalten

```bash
docker compose down                        # Stoppen
docker compose up -d --build               # Neu bauen & starten
docker logs trt-ino2block                  # Logs ansehen
```

---

## 🚀 Nutzung (Browser)

1. App aufrufen: `http://<server-ip>:3210`
2. Arduino-Code einfügen
3. Gemini API-Key eingeben ([kostenlos holen](https://aistudio.google.com/app/apikey))
4. **⚡ Konvertieren** klicken
5. XML exportieren oder Vorschau laden

---

## 🔑 API-Key

Die App benötigt einen **Google Gemini API-Key**:
- Kostenlos & ohne Kreditkarte: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Der Key wird **ausschließlich im Browser** verwendet (kein Server, kein Logging)
- Tipp für Schulen: Einen Klassen-Key zentral ausgeben oder im Unterricht gemeinsam anlegen

---

## 🏫 Einsatz im Unterricht

> 💡 Ideal für den **Technik- und Informatikunterricht in Klasse 5–10**, besonders in:

<div align="center">

🤖 **Robotik** &nbsp;|&nbsp; ⚙️ **Arduino** &nbsp;|&nbsp; 🧱 **Blockprogrammierung** &nbsp;|&nbsp; 💡 **Physical Computing** &nbsp;|&nbsp; 🔬 **Tinkercad Simulation**

</div>

**Typischer Unterrichtsablauf:**
1. SuS schreiben Arduino-Code in der Textansicht (Tinkercad oder IDE)
2. Code in trt.Ino2Block einfügen → XML generieren
3. XML in Tinkercad Blocks-Ansicht importieren → Verbindung zwischen Code & Blöcken sichtbar
4. Reflexion: Welche Blöcke entsprechen welchen Zeilen Code?

---

## ⚠️ Hinweise & Grenzen

- 📐 Komplexe Arduino-Bibliotheken (z. B. `Servo.h`, `Wire.h`) werden als Custom-Blöcke dargestellt
- 🔁 Die Konvertierung ist **KI-gestützt**, kein deterministischer Parser – Ergebnisse können variieren
- 🌐 Internetverbindung für die Gemini-API erforderlich (nur im Browser, nicht serverseitig)
- 🔒 Kein API-Key-Speicher in v1 – Key muss bei jedem Seitenaufruf neu eingegeben werden

---

## 🏷️ Tags & Labels

`#Arduino` &nbsp;`#Blockly` &nbsp;`#Tinkercad` &nbsp;`#Technikunterricht` &nbsp;`#Informatik` &nbsp;`#MINT` &nbsp;`#PhysicalComputing` &nbsp;`#GeminiAI` &nbsp;`#WebApp` &nbsp;`#Docker` &nbsp;`#OpenSource` &nbsp;`#Schulprojekt` &nbsp;`#HTML5` &nbsp;`#JavaScript`

---

## ☕ Unterstützung

Wenn dir dieses Projekt gefällt und du die Weiterentwicklung unterstützen möchtest:

<a href="https://www.buymeacoffee.com/highfish"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

---

<div align="center">

Made with ❤️ für den Schulunterricht &nbsp;|&nbsp; 🔧 trt.Ino2Block · [therealteacher](https://www.realteacher.de)

</div>
