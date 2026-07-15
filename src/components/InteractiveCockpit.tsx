import React, { useState, useEffect, useRef } from "react";
import { 
  Activity, ShieldAlert, Clock, Bot, Sparkles, TrendingUp, 
  Layers, Globe, Cpu, CheckCircle, AlertTriangle, Workflow, 
  Send, Terminal, ArrowRight, Lock, Database, Search, 
  FileText, RefreshCw, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Department, ChatMessage } from "../types";

export default function InteractiveCockpit() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "delay" | "anomalies" | "assistant">("dashboard");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [globalScore, setGlobalScore] = useState<number>(87.6);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState<boolean>(true);
  
  // AI Assistant Chat state
  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "### 🌐 NIOR Executive Advisor Initialized\nWelcome, Executive. I am the real-time AI Governance and Policy Compliance Engine for NIOR.\n\nYou can query me on the current readiness scores, workflow bottlenecks in **Strategic Supply Chain (D-2)**, active anomalies, or cybersecurity policies. Try clicking one of the suggested prompts below.",
      isSimulated: false
    }
  ]);
  const [isChatTyping, setIsChatTyping] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Anomaly Sim State
  const [isSimulatingAnomalies, setIsSimulatingAnomalies] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    "System booted at 09:56 UTC",
    "Loading isolation forest weights...",
    "RAG Vector Database sync: 100% compliant",
    "Current status: 2 anomalies flagged in active cycles"
  ]);

  // Fetch initial metrics
  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setIsLoadingMetrics(true);
    try {
      const res = await fetch("/api/nior/metrics");
      const data = await res.json();
      setDepartments(data.departments);
      setGlobalScore(data.globalReadiness);
      // Select Strategic Supply Chain (D-2) initially because it has the interesting bottleneck
      const defaultDept = data.departments.find((d: any) => d.id === "supply-chain") || data.departments[0];
      setSelectedDept(defaultDept);
    } catch (e) {
      console.error("Failed to load live metrics, using static fallback", e);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  // Scroll chat history
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, isChatTyping]);

  // Send message to Express API
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    if (!textToSend) setChatInput("");

    // Add user message
    const updatedHistory: ChatMessage[] = [...chatHistory, { role: "user", content: text }];
    setChatHistory(updatedHistory);
    setIsChatTyping(true);

    try {
      const response = await fetch("/api/nior/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory })
      });
      const data = await response.json();
      
      setChatHistory(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: data.content,
          isSimulated: data.isSimulated
        }
      ]);
    } catch (err) {
      console.error("Chat API error:", err);
      setChatHistory(prev => [
        ...prev,
        {
          role: "assistant",
          content: "❌ **Error**: Connection to the server-side AI model failed. Please verify that the development server is active on Port 3000.",
          isSimulated: true
        }
      ]);
    } finally {
      setIsChatTyping(false);
    }
  };

  // Run a mock anomaly scan
  const triggerAnomalyScan = () => {
    if (isSimulatingAnomalies) return;
    setIsSimulatingAnomalies(true);
    
    const logsToAdd = [
      "Initiating real-time telemetry sweep across 5 departments...",
      "Analyzing KPI fluctuation matrices via Isolation Forest...",
      "Cross-referencing historical benchmarks (180-day baseline)...",
      "Scanning vector store embeddings for policy violations...",
      "Scan complete. 0 new anomalies detected. Previous warnings remain active."
    ];

    logsToAdd.forEach((log, index) => {
      setTimeout(() => {
        setSimulationLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
        if (index === logsToAdd.length - 1) {
          setIsSimulatingAnomalies(false);
        }
      }, (index + 1) * 800);
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "optimal") return "text-nior-green border-nior-green/20 bg-nior-green/5";
    if (status === "warning") return "text-amber-400 border-amber-400/20 bg-amber-400/5";
    return "text-nior-red border-nior-red/20 bg-nior-red/5";
  };

  return (
    <div className="w-full glass-panel rounded-3xl overflow-hidden border-border-subtle shadow-2xl">
      {/* Dashboard Top Header bar */}
      <div className="px-6 py-4 bg-bg-card/90 border-b border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-nior-blue/10 border border-nior-blue/20">
            <Activity className="w-5 h-5 text-nior-blue blue-glow animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-nior-blue font-bold uppercase">NIOR Tactical Core v1.0.0</span>
              <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-nior-green/10 text-nior-green border border-nior-green/20">LIVE CLOUD DATALINK</span>
            </div>
            <h3 className="text-lg font-display text-primary-text font-bold">Operational Command Center Sandbox</h3>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <button 
            onClick={fetchMetrics} 
            className="p-2 hover:bg-white/5 rounded-lg border border-border-subtle text-secondary-text hover:text-primary-text transition-all duration-200"
            title="Refresh Core Database"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingMetrics ? "animate-spin text-nior-blue" : ""}`} />
          </button>
          
          <div className="px-3 py-1.5 rounded-lg bg-bg-deep border border-border-subtle flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-text uppercase">Avg Readiness:</span>
            <span className="text-sm font-mono font-bold text-nior-blue blue-glow">{globalScore}%</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-border-subtle bg-bg-card/50 flex">
        {[
          { id: "dashboard", label: "Executive Dashboard", icon: Layers },
          { id: "delay", label: "Delay Analysis", icon: Workflow },
          { id: "anomalies", label: "Anomaly Logs", icon: ShieldAlert },
          { id: "assistant", label: "AI Governance Assistant", icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 md:flex-none py-3.5 px-6 border-b-2 font-display text-xs md:text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 relative ${
                isActive 
                  ? "text-primary-text border-nior-purple bg-white/[0.02]" 
                  : "text-secondary-text border-transparent hover:text-primary-text hover:bg-white/[0.01]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-nior-purple purple-glow" : ""}`} />
              <span className="hidden md:inline">{tab.label}</span>
              {tab.id === "anomalies" && (
                <span className="absolute top-2.5 right-2 md:right-3 w-2 h-2 rounded-full bg-nior-red animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Workspace Display Area */}
      <div className="p-6 bg-bg-deep/80 min-h-[460px] text-primary-text">
        <AnimatePresence mode="wait">
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Department List */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-secondary-text uppercase">Department Directories</h4>
                  <span className="text-[10px] font-mono text-muted-text">Select Unit to Inspect</span>
                </div>
                
                {isLoadingMetrics ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {departments.map((dept) => {
                      const isSelected = selectedDept?.id === dept.id;
                      return (
                        <div
                          key={dept.id}
                          onClick={() => setSelectedDept(dept)}
                          className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? "bg-bg-surface/90 border-nior-blue/40 shadow-md shadow-nior-blue/5 scale-[1.01]" 
                              : "bg-bg-card/40 border-border-subtle hover:border-white/10 hover:bg-bg-card/70"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-muted-text font-semibold bg-white/5 px-2 py-1 rounded">
                              {dept.code}
                            </span>
                            <div>
                              <h5 className="text-sm font-semibold text-primary-text">{dept.name}</h5>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 text-[9px] font-mono border rounded uppercase ${getStatusColor(dept.status)}`}>
                                  {dept.status}
                                </span>
                                {dept.activeAnomaly && (
                                  <span className="text-[10px] font-mono text-nior-red flex items-center gap-1 animate-pulse">
                                    <AlertTriangle className="w-3 h-3" /> Anomaly active
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`text-base font-mono font-bold ${dept.readiness >= 90 ? "text-nior-green" : "text-amber-400"}`}>
                              {dept.readiness}%
                            </span>
                            <p className="text-[9px] font-mono text-muted-text uppercase">Readiness</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Active Department Breakdown */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                {selectedDept ? (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="p-4 rounded-2xl bg-bg-card/70 border border-border-subtle flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono text-nior-purple font-semibold uppercase">{selectedDept.code} // Deep Intelligence File</span>
                        <h4 className="text-xl font-display font-bold text-primary-text mt-0.5">{selectedDept.name}</h4>
                        <p className="text-xs text-secondary-text mt-1">
                          Operational status is currently categorized as <span className="font-semibold text-primary-text uppercase">{selectedDept.status}</span>.
                        </p>
                      </div>
                      <div className="text-right bg-bg-deep border border-border-subtle p-3 rounded-xl min-w-[90px]">
                        <span className="text-2xl font-mono font-bold text-nior-blue block leading-none">{selectedDept.readiness}%</span>
                        <span className="text-[9px] font-mono text-muted-text uppercase mt-1 block">Readiness</span>
                      </div>
                    </div>

                    {/* Historical Trend custom SVG mini-graph */}
                    <div className="p-4 rounded-2xl bg-bg-card/30 border border-border-subtle">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono font-bold text-secondary-text uppercase">Readiness History (5 Cycles)</span>
                        <span className="text-[10px] font-mono text-nior-green flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Proactive trend alignment
                        </span>
                      </div>
                      <div className="h-28 w-full bg-bg-deep/50 rounded-xl relative overflow-hidden flex items-end p-2">
                        {/* Custom SVG Line + Area Chart */}
                        <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 50" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#7ea6ff" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#7ea6ff" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                          
                          {/* Area path */}
                          <path
                            d={`M 0 50 L 0 ${50 - (selectedDept.trends[0]-60)*2} 
                               L 25 ${50 - (selectedDept.trends[1]-60)*2} 
                               L 50 ${50 - (selectedDept.trends[2]-60)*2} 
                               L 75 ${50 - (selectedDept.trends[3]-60)*2} 
                               L 100 ${50 - (selectedDept.trends[4]-60)*2} L 100 50 Z`}
                            fill="url(#chartGradient)"
                          />
                          {/* Line path */}
                          <path
                            d={`M 0 ${50 - (selectedDept.trends[0]-60)*2} 
                               L 25 ${50 - (selectedDept.trends[1]-60)*2} 
                               L 50 ${50 - (selectedDept.trends[2]-60)*2} 
                               L 75 ${50 - (selectedDept.trends[3]-60)*2} 
                               L 100 ${50 - (selectedDept.trends[4]-60)*2}`}
                            fill="none"
                            stroke="#7ea6ff"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          {/* Data points */}
                          {selectedDept.trends.map((val, idx) => (
                            <circle 
                              key={idx} 
                              cx={idx * 25} 
                              cy={50 - (val-60)*2} 
                              r="1.8" 
                              fill="#ffffff" 
                              stroke="#6b5cff" 
                              strokeWidth="0.8" 
                            />
                          ))}
                        </svg>
                        
                        {/* Legend */}
                        <div className="w-full flex justify-between px-2 text-[9px] font-mono text-muted-text z-10">
                          <span>CYCLE 01</span>
                          <span>CYCLE 02</span>
                          <span>CYCLE 03</span>
                          <span>CYCLE 04</span>
                          <span>CURRENT</span>
                        </div>
                      </div>
                    </div>

                    {/* Radial Radar-Style Metrics Map (represented as beautiful glowing vertical metrics) */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-mono font-bold text-secondary-text uppercase px-1">Maturity Evaluation Matrices</h5>
                      <div className="grid grid-cols-5 gap-2.5">
                        {[
                          { key: "efficiency", label: "Efficiency", val: selectedDept.dimensions.efficiency, color: "bg-nior-blue" },
                          { key: "dataManagement", label: "Data Mgmt", val: selectedDept.dimensions.dataManagement, color: "bg-nior-purple" },
                          { key: "digitalTransformation", label: "Digital", val: selectedDept.dimensions.digitalTransformation, color: "bg-indigo-400" },
                          { key: "governanceCompliance", label: "Compliance", val: selectedDept.dimensions.governanceCompliance, color: "bg-teal-400" },
                          { key: "cybersecurityPreparedness", label: "Cyber Security", val: selectedDept.dimensions.cybersecurityPreparedness, color: "bg-nior-green" },
                        ].map((dim) => (
                          <div key={dim.key} className="bg-bg-card/40 border border-border-subtle p-2.5 rounded-xl text-center space-y-2 flex flex-col justify-between">
                            <span className="text-[9px] font-mono text-muted-text block leading-none font-medium truncate uppercase" title={dim.label}>
                              {dim.label}
                            </span>
                            <div className="h-16 w-1.5 bg-white/5 rounded-full mx-auto relative overflow-hidden flex items-end">
                              <div className={`w-full ${dim.color} rounded-full`} style={{ height: `${dim.val}%` }} />
                            </div>
                            <span className="text-xs font-mono font-bold text-primary-text block mt-1 leading-none">
                              {dim.val}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Warnings & Anomaly banner */}
                    {selectedDept.activeAnomaly && (
                      <div className="p-3.5 rounded-xl bg-nior-red/5 border border-nior-red/20 text-nior-red text-xs flex gap-3 items-start">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-bounce mt-0.5" />
                        <div>
                          <span className="font-mono font-bold uppercase tracking-wide block mb-0.5">Tactical Operational Delay Warning</span>
                          <span>{selectedDept.activeAnomaly}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-secondary-text font-mono text-sm">
                    Select a department to view readiness metrics.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: OPERATIONAL DELAY ANALYSIS */}
          {activeTab === "delay" && (
            <motion.div
              key="delay"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-5 rounded-2xl bg-bg-card/40 border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <Workflow className="w-5 h-5 text-nior-purple purple-glow" />
                  <h4 className="text-lg font-display font-bold">Process Mapping & Workflow Bottleneck Audit</h4>
                </div>
                <p className="text-sm text-secondary-text">
                  The Operational Delay module tracks real-time throughput durations against defined service-level SLAs. It isolates processing friction gates to improve efficiency.
                </p>
              </div>

              {/* Dynamic Bottleneck Visualization Pipeline */}
              <div className="p-6 rounded-2xl bg-bg-deep border border-border-subtle space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-nior-purple/5 rounded-full filter blur-3xl pointer-events-none" />
                
                <div className="flex justify-between items-center border-b border-border-subtle pb-4">
                  <div>
                    <span className="text-xs font-mono text-nior-red font-bold uppercase tracking-wider">// DETECTED BLOCKED SEQUENCE</span>
                    <h5 className="text-sm font-semibold text-primary-text mt-0.5">Procurement Approval Pipeline - Strategic Supply Chain (D-2)</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-muted-text uppercase">Bottleneck Hold:</span>
                    <span className="text-base font-mono font-bold text-nior-red ml-2">8.4 Days</span>
                  </div>
                </div>

                {/* Flow steps container */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {[
                    { step: "01", name: "Strategic Request", desc: "Digital verification of assets", duration: "0.2 Days", status: "completed", color: "border-nior-green text-nior-green" },
                    { step: "02", name: "SLA Vetting Gate", desc: "Automated vendor certification", duration: "8.4 Days", status: "blocked", color: "border-nior-red text-nior-red bg-nior-red/5" },
                    { step: "03", name: "Governance Audit", desc: "Regulatory oversight compliance", duration: "Pending", status: "queued", color: "border-border-subtle text-muted-text" },
                    { step: "04", name: "Operational Dispatch", desc: "Deployment to active defense field", duration: "Pending", status: "queued", color: "border-border-subtle text-muted-text" }
                  ].map((f, i) => (
                    <div key={i} className={`p-4 rounded-xl border relative flex flex-col justify-between h-32 transition-all ${f.color}`}>
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] opacity-65">GATE {f.step}</span>
                        {f.status === "completed" && <CheckCircle className="w-4 h-4 text-nior-green" />}
                        {f.status === "blocked" && <AlertTriangle className="w-4 h-4 text-nior-red animate-pulse" />}
                        {f.status === "queued" && <Clock className="w-4 h-4 text-muted-text" />}
                      </div>
                      
                      <div>
                        <h6 className="text-sm font-semibold text-primary-text mt-2">{f.name}</h6>
                        <p className="text-[11px] opacity-75 leading-tight mt-1">{f.desc}</p>
                      </div>

                      <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-muted-text uppercase">SLA Duration:</span>
                        <span className="text-xs font-mono font-bold">{f.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Diagnostic Intervention recommendation */}
                <div className="p-4 rounded-xl bg-nior-purple/5 border border-nior-purple/25 flex gap-4 items-start">
                  <Bot className="w-6 h-6 text-nior-purple purple-glow flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono font-bold text-nior-purple uppercase tracking-wider block mb-1">// COGNITIVE AI RE-ROUTING RECOMMENDATION</span>
                    <p className="text-xs text-secondary-text leading-relaxed">
                      "Analyzing vetting gate bottleneck. Delay of **8.4 days** is caused by manual certification processing on vendor profile B-409. 
                      **Action Required**: Authorize instant document indexing for automated certification check via NIOR vector RAG stack. This will bypass manual gating and reduce latency to **&lt; 0.5 hours**."
                    </p>
                    <button 
                      onClick={() => {
                        setActiveTab("assistant");
                        handleSendMessage("How do we resolve the Strategic Supply Chain delay gate manually?");
                      }}
                      className="mt-3 text-xs text-nior-blue hover:text-primary-text font-semibold flex items-center gap-1 group transition-colors"
                    >
                      Initialize AI Auto-Correction Workflow <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ANOMALY DETECTION SYSTEM */}
          {activeTab === "anomalies" && (
            <motion.div
              key="anomalies"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Log Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-xl bg-bg-card/40 border border-border-subtle space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-nior-red text-glow" />
                    <h4 className="text-sm font-semibold font-display">Neural Anomaly Detection Console</h4>
                  </div>
                  <p className="text-xs text-secondary-text">
                    Isolation Forest models analyze real-time multi-variate stream KPIs to pinpoint outliers. Run real-time diagnostics on live telemetry metrics below.
                  </p>

                  <button
                    onClick={triggerAnomalyScan}
                    disabled={isSimulatingAnomalies}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 ${
                      isSimulatingAnomalies 
                        ? "bg-white/5 border border-white/10 text-muted-text cursor-not-allowed" 
                        : "bg-nior-red text-white hover:opacity-90 shadow-md shadow-nior-red/10 cursor-pointer"
                    }`}
                  >
                    <Terminal className="w-4 h-4" />
                    {isSimulatingAnomalies ? "Neural Engine Auditing..." : "Trigger Live Anomaly Diagnostics"}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-bg-card/20 border border-border-subtle space-y-2.5">
                  <span className="text-[10px] font-mono text-muted-text uppercase">Telemetry Threshold Baselines</span>
                  <div className="space-y-2">
                    {[
                      { label: "Signal Micro-Fluctuation Limit", val: "0.082 dev", status: "Optimal" },
                      { label: "SLA Delay Outlier Metric", val: "7.0 days", status: "Optimal" },
                      { label: "High-Frequency Sync Failure", val: "1.25/min", status: "Warning" }
                    ].map((bas, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-mono p-2 bg-bg-deep rounded">
                        <span className="text-muted-text">{bas.label}</span>
                        <span className="text-primary-text font-bold">{bas.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Active Streams Console Output */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="p-4 rounded-xl bg-bg-deep border border-border-subtle h-[320px] flex flex-col justify-between font-mono text-[11px] text-nior-blue/90">
                  <div className="flex justify-between items-center border-b border-border-subtle pb-2 mb-2 text-muted-text">
                    <span>SYSTEM DETAILED OUTLIER STREAMLOG</span>
                    <span>STANDBY</span>
                  </div>
                  
                  {/* Streaming lines */}
                  <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin pr-1">
                    {simulationLogs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-muted-text select-none">[{i+1}]</span>
                        <span className={log.includes("anomalies detected") || log.includes("Optimal") ? "text-nior-green" : log.includes("latency spike") || log.includes("deviations") ? "text-nior-red font-semibold" : "text-secondary-text"}>
                          {log}
                        </span>
                      </div>
                    ))}
                    {isSimulatingAnomalies && (
                      <div className="text-primary-text flex items-center gap-2 animate-pulse mt-2">
                        <span className="w-2 h-2 rounded-full bg-nior-blue animate-ping" />
                        <span>Scanning neural telemetry nodes...</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg border border-border-subtle bg-bg-card/10 flex items-center gap-2 text-xs text-secondary-text justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-nior-green inline-block" />
                    <span>Diagnostics Server: Compliant with ISO-27001 Operational Defense Standards</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: AI GOVERNANCE ASSISTANT */}
          {activeTab === "assistant" && (
            <motion.div
              key="assistant"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[460px]"
            >
              {/* Left Column: Preset Queries */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-nior-purple text-glow" />
                    <h4 className="text-sm font-semibold font-display">Preset Operational Directives</h4>
                  </div>
                  <p className="text-xs text-secondary-text">
                    Click any strategic directive below to query the real server-side AI model immediately.
                  </p>

                  <div className="space-y-2">
                    {[
                      { q: "What is the readiness score of our cybersecurity unit?", title: "Cyber Readiness Audit" },
                      { q: "How can we improve the supply chain throughput?", title: "Supply Chain Solutions" },
                      { q: "Explain the current anomaly alert on infrastructure.", title: "Anomaly Advisory" }
                    ].map((p, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(p.q)}
                        disabled={isChatTyping}
                        className="w-full text-left p-3 rounded-xl border border-border-subtle bg-bg-card/40 hover:bg-bg-card/80 hover:border-nior-blue/40 text-xs font-medium transition-all group duration-200"
                      >
                        <span className="text-[9px] font-mono text-nior-blue block mb-1 uppercase tracking-wider">{p.title}</span>
                        <span className="text-primary-text block truncate">{p.q}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-bg-card/40 border border-border-subtle text-center text-[10px] text-muted-text">
                  <Lock className="w-4 h-4 text-nior-purple mx-auto mb-1 opacity-70" />
                  All prompts processed inside client sandboxed secure VPC datalinks.
                </div>
              </div>

              {/* Right Column: Chat Box Interface */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full bg-bg-deep rounded-2xl border border-border-subtle p-4 relative overflow-hidden">
                {/* Chat Stream Area */}
                <div 
                  ref={chatScrollRef}
                  className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin mb-4"
                >
                  {chatHistory.map((msg, i) => {
                    const isUser = msg.role === "user";
                    return (
                      <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                        <div 
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                            isUser 
                              ? "bg-nior-purple/20 text-primary-text border border-nior-purple/30 rounded-tr-none" 
                              : "bg-bg-card/80 text-secondary-text border border-border-subtle rounded-tl-none"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-mono tracking-widest text-muted-text uppercase">
                            {isUser ? (
                              <>
                                <Globe className="w-3 h-3 text-nior-blue" />
                                <span>Tactical Lead / Executive</span>
                              </>
                            ) : (
                              <>
                                <Bot className="w-3 h-3 text-nior-purple" />
                                <span>NIOR Governance AI</span>
                                {msg.isSimulated && (
                                  <span className="ml-2 text-amber-500 bg-amber-500/10 px-1 rounded">SIMULATION fallback</span>
                                )}
                              </>
                            )}
                          </div>
                          
                          {/* Rendering custom basic text-based list formatting cleanly */}
                          <div className="space-y-1 text-primary-text">
                            {msg.content.split('\n').map((line, idx) => {
                              if (line.startsWith('### ')) {
                                return <h5 key={idx} className="text-sm font-semibold font-display text-nior-blue mt-2 mb-1">{line.replace('### ', '')}</h5>;
                              }
                              if (line.startsWith('* ')) {
                                return <li key={idx} className="ml-3 list-disc text-secondary-text mt-0.5">{line.replace('* ', '')}</li>;
                              }
                              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                                return <li key={idx} className="ml-3 list-decimal text-secondary-text mt-0.5">{line}</li>;
                              }
                              return <p key={idx} className="text-secondary-text mt-0.5">{line}</p>;
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isChatTyping && (
                    <div className="flex justify-start">
                      <div className="bg-bg-card/80 border border-border-subtle rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-2 text-muted-text">
                        <span className="w-1.5 h-1.5 rounded-full bg-nior-purple animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-nior-purple animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-nior-purple animate-bounce [animation-delay:0.4s]" />
                        <span className="font-mono text-[10px] uppercase ml-1">Analyzing regulations...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Text Form */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="flex gap-2 items-center"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask Governance AI about readiness scores, delays, anomalies, or compliance policies..."
                    disabled={isChatTyping}
                    className="flex-1 bg-bg-card/70 border border-border-subtle focus:border-nior-blue/40 text-xs px-4 py-3 rounded-xl text-primary-text placeholder-muted-text outline-none focus:ring-1 focus:ring-nior-blue/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isChatTyping || !chatInput.trim()}
                    className="p-3 rounded-xl bg-nior-blue text-bg-deep font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
