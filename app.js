const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const LS_KEY       = "trt_ino2block_settings";

const SYSTEM_PROMPT = `Du bist ein Experte für Arduino-Programmierung und Blockly.
Konvertiere den folgenden Arduino C++ Code in valides Blockly XML.
Regeln:
- Verwende ausschließlich Standard-Blockly-Blöcke (controls, logic, math, text, variables, procedures).
- Für Arduino-spezifische Funktionen (pinMode, digitalWrite, analogWrite, delay, Serial) erstelle custom_block Einträge mit passendem type-Attribut.
- Das XML muss mit <xml xmlns="https://developers.google.com/blockly/xml"> beginnen und mit </xml> enden.
- Keine Markdown-Codeblöcke, nur reines XML zurückgeben.
- Kommentiere komplexe Blöcke mit <comment> Tags.`;

const EXAMPLES = {
  blink: `void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
  button: `const int btnPin = 2;
const int ledPin = 13;
void setup() {
  pinMode(btnPin, INPUT);
  pinMode(ledPin, OUTPUT);
}
void loop() {
  int state = digitalRead(btnPin);
  digitalWrite(ledPin, state);
}`,
  servo: `#include <Servo.h>
Servo myServo;
void setup() {
  myServo.attach(9);
}
void loop() {
  myServo.write(0);
  delay(1000);
  myServo.write(90);
  delay(1000);
  myServo.write(180);
  delay(1000);
}`,
  analog: `int sensorPin = A0;
int ledPin = 9;
void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}
void loop() {
  int val = analogRead(sensorPin);
  int brightness = map(val, 0, 1023, 0, 255);
  analogWrite(ledPin, brightness);
  Serial.println(val);
  delay(100);
}`
};

let currentProvider = "gemini";

function switchProvider(p) {
  currentProvider = p;
  document.getElementById("panel-gemini").classList.toggle("hidden", p !== "gemini");
  document.getElementById("panel-openai").classList.toggle("hidden", p !== "openai");
  document.getElementById("tab-gemini").classList.toggle("active", p === "gemini");
  document.getElementById("tab-openai").classList.toggle("active", p === "openai");
  saveSettings();
}

function saveSettings() {
  const s = {
    provider:    currentProvider,
    geminiKey:   document.getElementById("save-gemini").checked ? document.getElementById("gemini-key").value : "",
    saveGemini:  document.getElementById("save-gemini").checked,
    oaiEndpoint: document.getElementById("save-openai").checked ? document.getElementById("oai-endpoint").value : "",
    oaiModel:    document.getElementById("save-openai").checked ? document.getElementById("oai-model").value : "",
    oaiKey:      document.getElementById("save-openai").checked ? document.getElementById("oai-key").value : "",
    saveOpenai:  document.getElementById("save-openai").checked,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(s));
}

window.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return;
  try {
    const s = JSON.parse(raw);
    if (s.saveGemini && s.geminiKey) {
      document.getElementById("gemini-key").value = s.geminiKey;
      document.getElementById("save-gemini").checked = true;
    }
    if (s.saveOpenai) {
      document.getElementById("oai-endpoint").value  = s.oaiEndpoint || "";
      document.getElementById("oai-model").value     = s.oaiModel    || "";
      document.getElementById("oai-key").value       = s.oaiKey      || "";
      document.getElementById("save-openai").checked = true;
    }
    if (s.provider) switchProvider(s.provider);
  } catch(e) {}
});

function loadExample(name) {
  document.getElementById("arduino-code").value = EXAMPLES[name] || "";
  showStatus(`📚 Beispiel geladen: ${name}`, "info");
}

async function convertCode() {
  const code = document.getElementById("arduino-code").value.trim();
  if (!code) return showStatus("⚠️ Bitte Arduino-Code eingeben.", "warn");

  showStatus("⏳ Konvertierung läuft...", "info");
  document.getElementById("convert-btn").disabled = true;

  try {
    let xmlText = currentProvider === "gemini"
      ? await convertGemini(code)
      : await convertOpenAI(code);

    xmlText = xmlText.replace(/```xml?\n?/gi, "").replace(/```/g, "").trim();
    if (!xmlText.startsWith("<xml")) throw new Error("Keine valide Blockly XML-Antwort erhalten.");

    document.getElementById("blockly-xml").value    = xmlText;
    showStatus("✅ Konvertierung erfolgreich!", "success");
    document.getElementById("export-btn").disabled  = false;
    document.getElementById("copy-btn").disabled    = false;
    document.getElementById("preview-btn").disabled = false;
    saveSettings();

  } catch(e) {
    showStatus(`❌ Fehler: ${e.message}`, "error");
  } finally {
    document.getElementById("convert-btn").disabled = false;
  }
}

async function convertGemini(code) {
  const apiKey = document.getElementById("gemini-key").value.trim();
  if (!apiKey) throw new Error("Bitte Gemini API-Key eingeben.");

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nArduino-Code:\n\`\`\`cpp\n${code}\n\`\`\`` }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 8192 }
    })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function convertOpenAI(code) {
  const endpoint = document.getElementById("oai-endpoint").value.trim();
  const model    = document.getElementById("oai-model").value.trim();
  const apiKey   = document.getElementById("oai-key").value.trim();

  if (!endpoint) throw new Error("Bitte Endpoint URL eingeben.");
  if (!model)    throw new Error("Bitte Modellname eingeben.");

  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: `Arduino-Code:\n\`\`\`cpp\n${code}\n\`\`\`` }
      ],
      temperature: 0.2,
      max_tokens: 8192
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

function exportXML() {
  const xml = document.getElementById("blockly-xml").value;
  if (!xml) return;
  const blob = new Blob([xml], { type: "text/xml" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "blockly_export.xml"; a.click();
  URL.revokeObjectURL(url);
  showStatus("💾 XML gespeichert als blockly_export.xml", "success");
}

function copyXML() {
  navigator.clipboard.writeText(document.getElementById("blockly-xml").value)
    .then(() => showStatus("📋 In Zwischenablage kopiert!", "success"));
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
    scrollbars: true, trashcan: true,
  });
  try {
    const dom = new DOMParser().parseFromString(xmlText, "text/xml");
    Blockly.Xml.domToWorkspace(dom.documentElement, workspace);
    showStatus("🔍 Vorschau geladen!", "success");
  } catch(e) {
    showStatus(`❌ Vorschau-Fehler: ${e.message}`, "error");
  }
}

function showStatus(msg, type = "info") {
  const el = document.getElementById("status-msg");
  el.textContent = msg;
  el.className = `status-${type}`;
}
