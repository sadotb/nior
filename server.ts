import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Department metrics API (Mock Real-Time Database)
  const departmentsData = [
    {
      id: "cybersecurity",
      name: "Cybersecurity Command",
      code: "D-1",
      readiness: 94,
      trends: [90, 91, 93, 92, 94],
      dimensions: {
        efficiency: 95,
        dataManagement: 92,
        digitalTransformation: 90,
        governanceCompliance: 96,
        cybersecurityPreparedness: 98
      },
      status: "optimal",
      activeAnomaly: null,
      delayDays: 1.2
    },
    {
      id: "supply-chain",
      name: "Strategic Supply Chain",
      code: "D-2",
      readiness: 78,
      trends: [82, 80, 81, 79, 78],
      dimensions: {
        efficiency: 70,
        dataManagement: 75,
        digitalTransformation: 82,
        governanceCompliance: 80,
        cybersecurityPreparedness: 83
      },
      status: "warning",
      activeAnomaly: "Procurement latency spike detected inside primary supplier pipelines.",
      delayDays: 8.4
    },
    {
      id: "infrastructure",
      name: "Public Infrastructure",
      code: "D-3",
      readiness: 85,
      trends: [84, 85, 83, 86, 85],
      dimensions: {
        efficiency: 88,
        dataManagement: 80,
        digitalTransformation: 84,
        governanceCompliance: 85,
        cybersecurityPreparedness: 88
      },
      status: "optimal",
      activeAnomaly: "Micro-fluctuation alerts in smart grid power telemetry.",
      delayDays: 3.1
    },
    {
      id: "digital-services",
      name: "Digital Services Division",
      code: "D-4",
      readiness: 89,
      trends: [85, 87, 88, 88, 89],
      dimensions: {
        efficiency: 91,
        dataManagement: 84,
        digitalTransformation: 94,
        governanceCompliance: 86,
        cybersecurityPreparedness: 90
      },
      status: "optimal",
      activeAnomaly: null,
      delayDays: 2.0
    },
    {
      id: "emergency-ops",
      name: "Emergency Operations",
      code: "D-5",
      readiness: 92,
      trends: [88, 89, 91, 91, 92],
      dimensions: {
        efficiency: 94,
        dataManagement: 88,
        digitalTransformation: 90,
        governanceCompliance: 92,
        cybersecurityPreparedness: 96
      },
      status: "optimal",
      activeAnomaly: null,
      delayDays: 1.5
    }
  ];

  app.get("/api/nior/metrics", (req, res) => {
    res.json({
      timestamp: new Date().toISOString(),
      globalReadiness: 87.6,
      departments: departmentsData
    });
  });

  // AI Governance Assistant Chat API (server-side Gemini proxy)
  app.post("/api/nior/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages array provided." });
      return;
    }

    const userMessage = messages[messages.length - 1]?.content || "";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Lazy fallback warning/mock simulation for preview environments without API keys configured
      console.warn("GEMINI_API_KEY not configured or has placeholder value. Using smart sandbox simulator response.");
      
      const promptLower = userMessage.toLowerCase();
      let responseText = "";

      if (promptLower.includes("cybersecurity") || promptLower.includes("d-1")) {
        responseText = `### 🛡️ Cybersecurity Command Status (D-1)
* **Readiness Level**: **94%** (Optimal)
* **Security Rating**: Excellent.
* **Advisor Note**: High cybersecurity preparedness score across all core operational sectors. A minor delay in routine server patch cycles is flagged, which our automation layer has queued for immediate execution at 0200 UTC. No critical vulnerabilities are unresolved.`;
      } else if (promptLower.includes("supply") || promptLower.includes("chain") || promptLower.includes("d-2")) {
        responseText = `### 📦 Strategic Supply Chain Status (D-2)
* **Readiness Level**: **78%** (Warning Threshold)
* **Identified Bottleneck**: Procurement vetting cycles currently hold materials for an average of **8.4 days**.
* **Actionable Recommendations**:
  1. **Automated Vetting**: Elevate supplier authorization checks to the NIOR instant RAG vetting engine.
  2. **Anomaly Action**: Investigate anomalous procurement volume spike flagged in pipeline segment B-12.`;
      } else if (promptLower.includes("anomaly") || promptLower.includes("alert")) {
        responseText = `### ⚠️ Active NIOR Anomaly Report
The Anomaly Detection Engine has flagged **two operations**:
1. **Strategic Supply Chain (D-2)**: Abnormal procurement telemetry spike (84% above historical peak). Suggests frontloading of custom micro-components.
2. **Public Infrastructure (D-3)**: Sensor signal micro-fluctuations in localized grid segments. Scheduled for predictive diagnostics.`;
      } else if (promptLower.includes("readiness") || promptLower.includes("score")) {
        responseText = `### 📊 NIOR Global Operations Readiness
The aggregate Readiness score is **87.6%** (Target: 90.0%).
* **Top Performing Unit**: Cybersecurity Command (**94%**)
* **Critical Path Unit**: Strategic Supply Chain (**78%**)
* **System Directive**: Enhance data management protocols in the Digital Services Division (D-4) to cross the 90% threshold organization-wide.`;
      } else {
        responseText = `### 🌐 NIOR AI Governance Assistant
Welcome to the Executive Decision Support Interface. I can assist you with:
1. **Maturity Insights**: Ask me to analyze individual departments (e.g., *Strategic Supply Chain*).
2. **Operational Bottlenecks**: Inquire about current process bottlenecks (*"What is delaying our supply chain?"*).
3. **Anomalies**: Request high-level audits on *anomalies* and risk assessments.

*Note: You are currently utilizing the built-in High-Fidelity Sandbox Simulator mode. To connect the live Gemini AI engine, configure your \`GEMINI_API_KEY\` in the Secrets panel.*`;
      }

      res.json({
        role: "assistant",
        content: responseText,
        isSimulated: true
      });
      return;
    }

    try {
      // Initialize Gemini Client with standard User-Agent header for telemetry
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // System instruction grounding Gemini to NIOR platform
      const systemInstruction = `You are the AI Governance Assistant for NIOR (National Intelligence & Operational Readiness Platform). 
You are an expert AI advisor in government operations, national security readiness, policy compliance, and tactical workflows.
Refer to these details when answering:
- NIOR Platform: A premium AI platform combining predictive operational intelligence with national security readiness.
- Departments & Scores:
  1. Cybersecurity Command (Ready Score: 94%): High cybersecurity preparedness, slight delay in routine patch compliance.
  2. Strategic Supply Chain (Ready Score: 78%): Bottlenecks detected in vetting. Delayed procurement gate holds processing for 8.4 days.
  3. Public Infrastructure (Ready Score: 85%): Standard readiness, some sensor node alerts in energy distribution grid.
  4. Digital Services Division (Ready Score: 89%): High digital maturity, data management audit pending.
  5. Emergency Operations (Ready Score: 92%): Ready, continuous tactical training completed.
- Anomalies currently flagged:
  * Strategic Supply Chain: Anomalous procurement spikes.
  * Public Infrastructure: Signal degradation detected in smart grid nodes.
- When asked a question, provide direct, authoritative, executive-grade recommendations. Keep answers highly professional, structured, and short (under 150 words). Format your response cleanly using Markdown with elegant bullet points. Include emojis representing national security, defense, and analytical operations.`;

      // Structure conversation history for Gemini generateContent call
      const formattedHistory = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.6,
        },
      });

      const reply = response.text || "An unexpected response format was returned by the AI engine.";

      res.json({
        role: "assistant",
        content: reply,
        isSimulated: false
      });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({
        error: "Failed to query Gemini AI Engine.",
        details: err.message || err
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NIOR Server] Running at http://localhost:${PORT}`);
  });
}

startServer();
