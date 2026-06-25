const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `Du bist ein Experte für Arduino-Programmierung und Blockly.
Konvertiere den folgenden Arduino C++ Code in valides Blockly XML.
Regeln:
- Verwende ausschließlich Standard-Blockly-Blöcke (controls, logic, math, text, variables, procedures).
- Für Arduino-spezifische Funktionen (pinMode, digitalWrite, analogWrite, delay, Serial) erstelle custom_block Einträge mit passendem type-Attribut.
- Das XML muss mit <xml xmlns="https://developers.google.com/blockly/xml"> beginnen und mit </xml> enden.
- Keine Markdown-Codeblocke, nur reines XML zurückgeben.
- Kommentiere komplexe Blöcke mit <comment> Tags.`;

async function convertCode() {
  const code = document.getElementById("arduino-code").value.trim();
  const apiKey = document.getElementById("api-key").value.trim();
  const statusEl = document.getElementById("status-msg");
  const xmlOutput = document.getElementById("blockly-xml");

  if (!code) return showStatus("⚠️ Bitte Arduino-Code eingeben.", "warn");
  if (!apiKey) return showStatus("⚠️ Bitte Gemini API-Key eingeben.", "warn");

  showStatus("⏳ Konvertierung läuft...", "info");
  document.getElementById("convert-btn").disabled = true;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${SYSTEM_PROMPT}\n\nArduino-Code:\n\`\`\`cpp\n${code}\n\`\`\``
          }]
        }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 8192 }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    let xmlText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip markdown code blocks if present
    xmlText = xmlText.replace(/```xml?\n?/gi, "").replace(/```/g, "").trim();

    if (!xmlText.startsWith("<xml")) {
      throw new Error("Keine valide Blockly XML-Antwort erhalten.");
    }

    xmlOutput.value = xmlText;
    showStatus("✅ Konvertierung erfolgreich!", "success");
    document.getElementById("export-btn").disabled = false;
    document.getElementById("copy-btn").disabled = false;
    document.getElementById("preview-btn").disabled = false;

  } catch (e) {
    showStatus(`❌ Fehler: ${e.message}`, "error");
  } finally {
    document.getElementById("convert-btn").disabled = false;
  }
}

function exportXML() {
  const xml = document.getElementById("blockly-xml").value;
  if (!xml) return;
  const blob = new Blob([xml], { type: "text/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blockly_export.xml";
  a.click();
  URL.revokeObjectURL(url);
  showStatus("💾 XML gespeichert als blockly_export.xml", "success");
}

function copyXML() {
  const xml = document.getElementById("blockly-xml").value;
  navigator.clipboard.writeText(xml).then(() => {
    showStatus("📋 In Zwischenablage kopiert!", "success");
  });
}

function loadPreview() {
  const xmlText = document.getElementById("blockly-xml").value;
  if (!xmlText) return;

  const container = document.getElementById("blockly-div");
  container.innerHTML = "";

  const workspace = Blockly.inject(container, {
    toolbox: {
      kind: "flyoutToolbox",
      contents: [
        { kind: "block", type: "controls_if" },
        { kind: "block", type: "controls_repeat_ext" },
        { kind: "block", type: "math_number" },
        { kind: "block", type: "math_arithmetic" },
        { kind: "block", type: "variables_get" },
        { kind: "block", type: "variables_set" },
        { kind: "block", type: "procedures_defnoreturn" },
      ]
    },
    scrollbars: true,
    trashcan: true,
  });

  try {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlText, "text/xml");
    Blockly.Xml.domToWorkspace(dom.documentElement, workspace);
    showStatus("🔍 Vorschau geladen!", "success");
  } catch (e) {
    showStatus(`❌ Vorschau-Fehler: ${e.message}`, "error");
  }
}

function showStatus(msg, type = "info") {
  const el = document.getElementById("status-msg");
  el.textContent = msg;
  el.className = `status-${type}`;
}