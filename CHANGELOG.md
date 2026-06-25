# Changelog – trt.Ino2Block

Alle wesentlichen Änderungen werden in dieser Datei dokumentiert.
Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

---

## [1.1.0] – 2026-06-25

### Hinzugefügt
- 🐳 Docker-Support: `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `.dockerignore`
- 🔐 LocalStorage-Speicherung des Gemini API-Keys (kein erneutes Eingeben bei Seitenaufruf)
- 📚 Beispiel-Sketches direkt auswählbar: Blink, Button, Servo, Analogwert
- 📄 GitHub Pages Landing Page (`docs/index.html`) mit Docker-Karte
- 📄 `LICENSE` (MIT) hinzugefügt
- 📝 `CHANGELOG.md` angelegt
- 🔐 TruffleHog Secret Scan Workflow (täglich + bei Push)
- 🐳 GitHub Actions Docker Build-Test Workflow
- 🏷️ Repo-Topics: arduino, blockly, tinkercad, docker, education
- 🇬🇧 `README_EN.md` (englische Version)

### Geändert
- `docs/index.html`: Docker-Feature-Karte ergänzt, App-Start-Link auf GH Pages URL korrigiert
- `README.md` + `README_EN.md`: Docker-Abschnitt, Badges, vollständige Projektstruktur

---

## [1.0.0] – 2026-06-25

### Hinzugefügt
- 🌱 Initiales Release
- WebApp: Arduino-Code → Blockly XML via Google Gemini API
- Blockly Live-Vorschau im Browser
- XML-Export als `.xml`-Datei
- Clipboard-Funktion
- Dark-Mode UI
