import React, { useState } from "react";
import { 
  Shield, Cpu, FileText, Activity, Layers, Bot, Lock, 
  ChevronRight, ArrowRight, Check, AlertCircle, Building2, 
  Mail, User, Award, Globe, Database, HelpCircle, Sparkles, Terminal,
  Workflow, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import InteractiveCockpit from "./components/InteractiveCockpit";

export default function App() {
  // Navigation active tab for scroll-linked visual feedback (simulated)
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Contact/Access Request Form State
  const [formData, setFormData] = useState({
    fullName: "",
    officialEmail: "",
    agencyName: "",
    clearanceLevel: "Secret",
    securityConsent: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [generatedCredential, setGeneratedCredential] = useState<any>(null);

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.officialEmail.trim()) {
      errors.officialEmail = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.officialEmail)) {
      errors.officialEmail = "Invalid email format.";
    }
    if (!formData.agencyName.trim()) errors.agencyName = "Department/Agency is required.";
    if (!formData.securityConsent) errors.securityConsent = "You must acknowledge authorization protocols.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Access Request
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate premium verification & JWT security generation
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      const uniqueToken = "NIOR-" + Math.floor(100000 + Math.random() * 900000) + "-V7";
      setGeneratedCredential({
        token: uniqueToken,
        timestamp: new Date().toISOString(),
        clearance: formData.clearanceLevel,
        subject: formData.fullName.toUpperCase(),
        agency: formData.agencyName.toUpperCase()
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-bg-deep text-primary-text font-sans selection:bg-nior-purple/30 selection:text-white relative overflow-hidden">
      
      {/* Decorative Layered Space Background */}
      <div className="absolute inset-0 bg-[#050505] -z-30" />
      
      {/* Top Center Radial Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[750px] bg-gradient-to-b from-nior-blue/10 via-transparent to-transparent blur-3xl pointer-events-none -z-20" />
      
      {/* Subtle Purple Orbital Highlight */}
      <div className="absolute top-[400px] right-[10%] w-[400px] h-[400px] bg-nior-purple/5 rounded-full blur-3xl pointer-events-none -z-20" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

      {/* NAVBAR */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl h-16 bg-bg-card/40 backdrop-blur-md rounded-2xl border border-border-subtle flex items-center justify-between px-6 z-50 shadow-lg shadow-black/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nior-blue to-nior-purple flex items-center justify-center shadow-md shadow-nior-blue/20">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-display font-extrabold text-sm tracking-wider text-primary-text">NIOR</span>
            <span className="text-[9px] font-mono font-medium block text-secondary-text leading-none tracking-widest uppercase">National Readiness</span>
          </div>
        </div>

        {/* Desktop Anchor Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-secondary-text">
          <a href="#metrics" className="hover:text-primary-text transition-colors">Metrics</a>
          <a href="#sandbox" className="hover:text-primary-text transition-colors">Sandbox Cockpit</a>
          <a href="#modules" className="hover:text-primary-text transition-colors">Platform Modules</a>
          <a href="#infrastructure" className="hover:text-primary-text transition-colors">AI Infrastructure</a>
          <a href="#future" className="hover:text-primary-text transition-colors">Vision</a>
        </div>

        <div>
          <a 
            href="#request-access" 
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-border-subtle text-xs font-mono font-bold text-primary-text transition-all"
          >
            Request Access
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-[85vh] relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 max-w-4xl"
        >
          {/* Executive Category Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nior-blue/5 border border-nior-blue/20 text-xs font-mono tracking-widest text-nior-blue uppercase">
            <Sparkles className="w-3.5 h-3.5 blue-glow" /> AI-Powered Government Readiness Platform
          </div>

          {/* Large Centered Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight text-primary-text leading-[1.08]">
            Transform Fragmented <br />
            <span className="font-semibold bg-gradient-to-r from-primary-text via-[#b8c4ff] to-[#7ea6ff] bg-clip-text text-transparent">
              Operations into Intelligence
            </span>
          </h1>

          {/* Subheadline description */}
          <p className="text-sm sm:text-lg md:text-xl text-secondary-text max-w-2xl mx-auto font-normal leading-relaxed">
            NIOR integrates real-time predictive models, multi-dimensional maturity index scoring, and natural language governance assistance into a secure, single-pane command hub.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a 
              href="#sandbox" 
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-primary-text text-bg-deep font-display font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
            >
              Enter Interactive Sandbox <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="#request-access" 
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 rounded-full border border-border-subtle text-xs font-mono font-bold text-primary-text transition-all flex items-center justify-center gap-2"
            >
              Request Executive Clearance
            </a>
          </div>
        </motion.div>

        {/* Ambient planet-arc accent background */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[160%] max-w-[2000px] h-[300px] bg-gradient-to-t from-nior-purple/10 to-transparent blur-3xl pointer-events-none -z-20" />
      </section>

      {/* EXECUTIVE METRICS KPI STRIP */}
      <section id="metrics" className="py-10 border-t border-b border-border-subtle bg-bg-card/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            { label: "Global Operations Readiness Index", val: "87.6%", desc: "Target Benchmark: 90.0%" },
            { label: "Active Monitored G2G Departments", val: "5 Divisions", desc: "100% data telemetry sync" },
            { label: "Critical Path Delay Pipeline", val: "Strategic Supply Chain", desc: "8.4 days manual gating block" },
            { label: "Anomaly Engine Confidence Rating", val: "94.2%", desc: "Isolation Forest threshold" },
          ].map((metric, i) => (
            <div key={i} className="space-y-1.5 border-l border-border-subtle pl-5 first:border-0">
              <span className="text-[10px] font-mono tracking-widest text-muted-text uppercase block">{metric.label}</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-primary-text">{metric.val}</p>
              <span className="text-[11px] font-mono text-secondary-text block">{metric.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM STATEMENT & SOLUTION SECTION */}
      <section id="problem-solution" className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Challenge (Problem) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nior-red/5 border border-nior-red/20 text-[10px] font-mono tracking-widest text-nior-red uppercase">
            Institutional G2G Friction
          </div>
          <h2 className="text-3xl md:text-4xl font-display tracking-tight font-light leading-tight">
            The Cost of <br />
            <span className="font-semibold text-primary-text">Fragmented Operations</span>
          </h2>
          <p className="text-sm leading-relaxed text-secondary-text">
            Modern government organizations operate with siloed, asynchronous databases. Operational bottlenecks occur silently, cybersecurity readiness deteriorates without metrics, and policy compliance is gated by manual auditing cycles.
          </p>

          <div className="space-y-4 pt-4 font-mono text-xs text-secondary-text">
            <div className="flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-nior-red flex-shrink-0" />
              <div>
                <strong className="text-primary-text block">Siloed Analytical Frameworks</strong>
                Fragmented metrics inhibit quick administrative decision-making.
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-nior-red flex-shrink-0" />
              <div>
                <strong className="text-primary-text block">Unreported Process Bottlenecks</strong>
                Workflows stall at manual vetting gates without predictive warnings.
              </div>
            </div>
          </div>
        </div>

        {/* Right: Answer (Solution overview) */}
        <div className="lg:col-span-7 space-y-6 bg-bg-card/30 border border-border-subtle p-8 md:p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-nior-blue/10 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nior-green/5 border border-nior-green/20 text-[10px] font-mono tracking-widest text-nior-green uppercase">
            The NIOR Architecture
          </div>
          <h2 className="text-3xl md:text-4xl font-display tracking-tight font-light leading-tight">
            A Unified Hub for <br />
            <span className="font-semibold text-primary-text">Operational Readiness</span>
          </h2>
          <p className="text-sm leading-relaxed text-secondary-text">
            NIOR aggregates cross-department operations. It layers real-time anomaly algorithms directly over G2G pipelines, calculates structured departmental readiness indices, and exposes policy guidance via RAG-indexed document processors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-bg-deep rounded-xl border border-border-subtle">
              <Activity className="w-5 h-5 text-nior-blue mb-2" />
              <h5 className="text-xs font-mono font-bold uppercase text-primary-text">94.2% Anomaly Precision</h5>
              <p className="text-xs text-secondary-text mt-1">Pre-built machine learning models flag outliers across millions of transactions instantly.</p>
            </div>
            <div className="p-4 bg-bg-deep rounded-xl border border-border-subtle">
              <Bot className="w-5 h-5 text-nior-purple mb-2" />
              <h5 className="text-xs font-mono font-bold uppercase text-primary-text">Actionable Recommendations</h5>
              <p className="text-xs text-secondary-text mt-1">The system's AI assistant reads compliance guidelines to suggest bypasses for delayed gates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE INTERACTIVE SANDBOX COCKPIT */}
      <section id="sandbox" className="py-24 bg-gradient-to-b from-transparent via-bg-card/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nior-purple/5 border border-nior-purple/20 text-[10px] font-mono tracking-widest text-nior-purple uppercase">
              Interact with real-time analytics
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-primary-text">
              Institutional Intelligence <br />
              <span className="font-semibold bg-gradient-to-r from-nior-blue to-nior-purple bg-clip-text text-transparent">Command Sandbox</span>
            </h2>
            <p className="text-sm text-secondary-text">
              Try the live interactive model cockpit below. Select department nodes to inspect operational maturity scores, diagnose delay pipelines, and engage with the **AI Governance Assistant**.
            </p>
          </div>

          <InteractiveCockpit />
        </div>
      </section>

      {/* PLATFORM MODULES GRID */}
      <section id="modules" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono font-bold text-nior-blue uppercase tracking-widest block">// CORE ARCHITECTURAL MODULES</span>
          <h2 className="text-3xl md:text-5xl font-display tracking-tight font-light">
            Engineered for <br />
            <span className="font-semibold text-primary-text">Strategic Administration</span>
          </h2>
          <p className="text-sm text-secondary-text">
            NIOR standardizes operational data inputs into concrete administrative controls using eight distinct product modules.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "executive-command",
              title: "Executive Command Center",
              icon: Layers,
              color: "text-nior-blue bg-nior-blue/5 border-nior-blue/10",
              desc: "A unified cockpit tracking organizational readiness index ratings, real-time tactical indicators, and compliance warnings.",
              caps: ["Aggregate real-time metrics", "Display G2G readiness metrics", "Trigger executive warnings"]
            },
            {
              id: "smart-readiness",
              title: "Smart Readiness Assessment Engine",
              icon: Activity,
              color: "text-nior-purple bg-nior-purple/5 border-nior-purple/10",
              desc: "Evaluates individual department maturity across operational, digital capability, and security baseline categories.",
              caps: ["Track institutional maturity", "Generate benchmarking scales", "Cross-department alignment evaluations"]
            },
            {
              id: "predictive-ops",
              title: "Predictive Operational Intelligence",
              icon: Cpu,
              color: "text-teal-400 bg-teal-400/5 border-teal-400/10",
              desc: "Framer-backed forecast algorithms detect potential operational performance declines before targets are missed.",
              caps: ["Pre-built XGBoost forecasting", "Calculate resource demand curves", "Isolate disruption variables"]
            },
            {
              id: "anomaly-detection",
              title: "Anomaly Detection System",
              icon: Shield,
              color: "text-nior-red bg-nior-red/5 border-nior-red/10",
              desc: "Machine learning Isolation Forest matrices monitor real-time data flow for sudden KPI variations and abnormal delays.",
              caps: ["Real-time outlier flagging", "Automatic trigger notification", "System-wide diagnostic reports"]
            },
            {
              id: "delay-analysis",
              title: "Operational Delay Analysis",
              icon: Workflow,
              color: "text-amber-400 bg-amber-400/5 border-amber-400/10",
              desc: "Processes pipeline step mapping to pinpoint workflow gating, measuring precise SLA compliance and hold factors.",
              caps: ["Identify manual bottleneck grids", "Map sequential flow holds", "Offer digital auto-routing suggestions"]
            },
            {
              id: "governance-assistant",
              title: "AI Governance Assistant",
              icon: Bot,
              color: "text-indigo-400 bg-indigo-400/5 border-indigo-400/10",
              desc: "Server-side Gemini proxy answers compliance policy questions, summarizing operational reports into action plans.",
              caps: ["Natural language policy chat", "Automated corrective recommendations", "Produce institutional summaries"]
            }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-bg-card/40 border border-border-subtle flex flex-col justify-between hover:border-white/10 hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl border w-fit ${mod.color}`}>
                    <Icon className="w-5 h-5 text-glow" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-primary-text">{mod.title}</h4>
                  <p className="text-xs text-secondary-text leading-relaxed">{mod.desc}</p>
                </div>

                <div className="border-t border-border-subtle pt-4 mt-6 space-y-2">
                  <span className="text-[9px] font-mono text-muted-text uppercase block tracking-wider">Features Include:</span>
                  <ul className="space-y-1.5">
                    {mod.caps.map((cap, i) => (
                      <li key={i} className="text-[11px] text-secondary-text flex items-center gap-2">
                        <Check className="w-3 h-3 text-nior-green flex-shrink-0" />
                        <span className="truncate">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI INFRASTRUCTURE & TECH STACK SECTION */}
      <section id="infrastructure" className="py-24 border-t border-border-subtle bg-bg-card/10 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Tech Stack visualization list */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-nior-purple uppercase tracking-widest block">// SYSTEM LEVEL ARCHITECTURE</span>
              <h2 className="text-3xl md:text-5xl font-display tracking-tight font-light">
                Enterprise AI <br />
                <span className="font-semibold text-primary-text">Infrastructure</span>
              </h2>
              <p className="text-sm text-secondary-text">
                NIOR's algorithmic stack relies on secure, containerized cloud processing and high-precision, fine-tuned vector embeddings.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-secondary-text">
              {[
                { name: "Cognitive Language Stack", desc: "Server-side Gemini 3.5 LLMs utilizing named RAG indexes" },
                { name: "Outlier Intelligence Engine", desc: "Isolation Forest and Random Forest classifiers" },
                { name: "Vector Storage Indexing", desc: "ChromaDB vector store maps guidelines to semantic embeddings" },
                { name: "Secure Backend Layer", desc: "FastAPI endpoints protected by encrypted REST JWT validation" },
                { name: "Primary Database Layer", desc: "Secure PostgreSQL container tracking historic organizational telemetry" }
              ].map((tech, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-bg-deep border border-border-subtle flex justify-between items-center hover:border-nior-blue/20 transition-all">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-nior-blue" />
                    <div>
                      <strong className="text-primary-text block">{tech.name}</strong>
                      <span className="text-[10px] text-muted-text">{tech.desc}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-text" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Diagram layout */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-bg-deep border border-border-subtle space-y-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-nior-blue/10 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <span className="text-xs font-mono text-muted-text uppercase">// Operational Data-Ingest Flow</span>
              <span className="text-[10px] font-mono text-nior-green uppercase">Authorized</span>
            </div>

            {/* Diagram boxes */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-bg-card/60 border border-border-subtle text-center relative">
                <span className="text-[10px] font-mono text-nior-blue block mb-1">01 // MULTI-SOURCE INGESTION</span>
                <span className="text-xs font-semibold text-primary-text">G2G Telemetry streams & Policy document indexes</span>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-gradient-to-b from-nior-blue to-nior-purple" />
              </div>

              <div className="p-4 rounded-xl bg-bg-card/60 border border-border-subtle text-center relative">
                <span className="text-[10px] font-mono text-nior-purple block mb-1">02 // COGNITIVE AGENT STACK</span>
                <span className="text-xs font-semibold text-primary-text">Embedding mapping & Isolation Forest anomaly scans</span>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-gradient-to-b from-nior-purple to-teal-400" />
              </div>

              <div className="p-4 rounded-xl bg-bg-card/60 border border-border-subtle text-center relative">
                <span className="text-[10px] font-mono text-teal-400 block mb-1">03 // STRATEGIC ADVICE EXECUTION</span>
                <span className="text-xs font-semibold text-primary-text">SLA re-routing directives & Executive maturity KPIs</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FUTURE VISION SECTION */}
      <section id="future" className="py-24 px-6 max-w-7xl mx-auto text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nior-blue/5 rounded-full filter blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-nior-blue uppercase tracking-widest block">// NIOR ROADMAP & FUTURE SCOPE</span>
          <h2 className="text-3xl md:text-5xl font-display tracking-tight font-light leading-tight">
            Autonomous <br />
            <span className="font-semibold bg-gradient-to-r from-[#b8c4ff] to-[#7ea6ff] bg-clip-text text-transparent">Institutional Governance</span>
          </h2>
          <p className="text-sm text-secondary-text">
            Our upcoming core releases introduce cognitive system integrations that expand beyond standard telemetry mapping.
          </p>
        </div>

        {/* Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {[
            { title: "Process Mining", desc: "Continuous deep workflow sequence mining models automatically map and adjust complex administrative G2G processes in real-time." },
            { title: "Employee Sentiment & Burnout Prediction", desc: "Passive anonymized communications processing indexes metadata variations to forecast potential operational burnout thresholds." },
            { title: "Adaptive Governance Models", desc: "Machine learning layers dynamically recalibrate operational compliance indicators as central government policies alter." }
          ].map((vis, i) => (
            <div key={i} className="p-6 rounded-2xl bg-bg-card/20 border border-border-subtle space-y-3 hover:border-nior-blue/20 transition-all text-left">
              <span className="font-mono text-xs text-nior-blue font-bold">RELEASE 0{i+2}</span>
              <h4 className="text-base font-display font-bold text-primary-text">{vis.title}</h4>
              <p className="text-xs text-secondary-text leading-relaxed">{vis.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STRATEGIC DEMO REQUEST FORM */}
      <section id="request-access" className="py-24 border-t border-border-subtle bg-bg-card/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold text-nior-red uppercase tracking-widest block">// SECURE AUTHORIZATION GATE</span>
            <h2 className="text-3xl font-display tracking-tight font-light leading-tight">
              Initiate Strategic <br />
              <span className="font-semibold text-primary-text">Platform Access</span>
            </h2>
            <p className="text-xs text-secondary-text leading-relaxed">
              To request a secure executive sandbox or receive our strategic platform implementation whitepapers, verify your credentials inside our access gateway.
            </p>

            <div className="space-y-2.5 font-mono text-[10px] text-muted-text">
              <p className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-nior-purple" /> Restricted to government or enterprise email profiles.
              </p>
              <p className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-nior-purple" /> Full RBAC logging protocol audits remain active.
              </p>
            </div>
          </div>

          {/* Right form/success badge column */}
          <div className="lg:col-span-7 bg-bg-deep border border-border-subtle p-6 rounded-3xl shadow-xl">
            <AnimatePresence mode="wait">
              {!formSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleRequestSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-secondary-text block">Full Professional Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Commander Sarah Chen"
                        className="w-full bg-bg-card border border-border-subtle rounded-xl text-xs px-10 py-3 text-primary-text placeholder-muted-text outline-none focus:border-nior-blue/40"
                      />
                    </div>
                    {formErrors.fullName && <p className="text-[10px] text-nior-red font-mono mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-secondary-text block">Enterprise / Gov Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                        <input
                          type="email"
                          required
                          value={formData.officialEmail}
                          onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                          placeholder="e.g. s.chen@agency.gov"
                          className="w-full bg-bg-card border border-border-subtle rounded-xl text-xs px-10 py-3 text-primary-text placeholder-muted-text outline-none focus:border-nior-blue/40"
                        />
                      </div>
                      {formErrors.officialEmail && <p className="text-[10px] text-nior-red font-mono mt-1">{formErrors.officialEmail}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-secondary-text block">Department or Agency</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                        <input
                          type="text"
                          required
                          value={formData.agencyName}
                          onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                          placeholder="e.g. Operational Security Command"
                          className="w-full bg-bg-card border border-border-subtle rounded-xl text-xs px-10 py-3 text-primary-text placeholder-muted-text outline-none focus:border-nior-blue/40"
                        />
                      </div>
                      {formErrors.agencyName && <p className="text-[10px] text-nior-red font-mono mt-1">{formErrors.agencyName}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-secondary-text block">Required Clearance Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Public Trust", "Secret", "Top Secret"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFormData({ ...formData, clearanceLevel: lvl })}
                          className={`py-2 px-3 rounded-xl border font-mono text-[10px] font-bold text-center transition-all ${
                            formData.clearanceLevel === lvl 
                              ? "bg-nior-blue text-bg-deep border-nior-blue shadow-md" 
                              : "bg-bg-card border-border-subtle text-secondary-text hover:text-primary-text hover:border-white/10"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.securityConsent}
                        onChange={(e) => setFormData({ ...formData, securityConsent: e.target.checked })}
                        className="mt-1 rounded border-border-subtle bg-bg-card text-nior-blue outline-none"
                      />
                      <span className="text-[10px] text-secondary-text leading-tight block">
                        I acknowledge that request submission logs are stored inside NIOR audit systems and subject to standard regulatory compliance auditing.
                      </span>
                    </label>
                    {formErrors.securityConsent && <p className="text-[10px] text-nior-red font-mono">{formErrors.securityConsent}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-primary-text text-bg-deep font-semibold text-xs hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Credentials...
                      </>
                    ) : (
                      <>
                        Verify and Generate Clearance Credentials <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-12 h-12 rounded-full bg-nior-green/10 border border-nior-green/20 flex items-center justify-center mx-auto mb-2 text-nior-green text-glow animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-primary-text">Clearance Authorized</h3>
                    <p className="text-xs text-secondary-text">Strategic credential file successfully compiled.</p>
                  </div>

                  {/* High Tech ID Mock Badge */}
                  {generatedCredential && (
                    <div className="p-5 rounded-2xl bg-bg-card border-2 border-nior-green/30 text-left font-mono text-[10px] space-y-4 max-w-sm mx-auto shadow-xl shadow-nior-green/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 px-2 py-0.5 bg-nior-green/15 text-nior-green text-[8px] font-bold tracking-widest border-l border-b border-nior-green/20">
                        {generatedCredential.clearance.toUpperCase()}
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-muted-text font-bold uppercase">NIOR SECURITY PASS // GATE ACCESS</span>
                        <Terminal className="w-4 h-4 text-nior-green animate-pulse" />
                      </div>

                      <div className="grid grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-muted-text block uppercase">SUBJECT:</span>
                          <span className="text-primary-text font-bold truncate block">{generatedCredential.subject}</span>
                        </div>
                        <div>
                          <span className="text-muted-text block uppercase">AGENCY:</span>
                          <span className="text-primary-text font-bold truncate block">{generatedCredential.agency}</span>
                        </div>
                        <div>
                          <span className="text-muted-text block uppercase">CREDENTIAL TOKEN:</span>
                          <span className="text-nior-green font-bold text-glow">{generatedCredential.token}</span>
                        </div>
                        <div>
                          <span className="text-muted-text block uppercase">AUTHORIZED ON:</span>
                          <span className="text-primary-text">{generatedCredential.timestamp.split('T')[0]}</span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-2 flex items-center gap-2 text-muted-text text-[8px] justify-between">
                        <span>AUTHENTICATION PROTOCOL: SECURE-HMAC-256</span>
                        <span>STATUS: PASS</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setFormSuccess(false);
                      setFormData({
                        fullName: "",
                        officialEmail: "",
                        agencyName: "",
                        clearanceLevel: "Secret",
                        securityConsent: false
                      });
                    }}
                    className="text-xs text-secondary-text hover:text-primary-text underline transition-all mt-4"
                  >
                    Register Another Secure Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-bg-deep border-t border-border-subtle py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Category details */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nior-blue to-nior-purple flex items-center justify-center shadow-md">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm tracking-wider text-primary-text">NIOR</span>
              <p className="text-[9px] font-mono text-muted-text max-w-sm mt-0.5 leading-tight uppercase">
                National Intelligence & Operational Readiness Platform
              </p>
            </div>
          </div>

          {/* Legal / Policy Grounding Disclaimers */}
          <div className="max-w-md text-center md:text-right text-[10px] text-muted-text leading-relaxed">
            <p>
              © {new Date().getFullYear()} National Operations. Designed for federal enterprise management. All synthetic dashboards, anomalies, and AI responses remain strictly confined to secure administrative sandbox compliance rules.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
