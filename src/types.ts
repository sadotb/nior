export interface DimensionMetrics {
  efficiency: number;
  dataManagement: number;
  digitalTransformation: number;
  governanceCompliance: number;
  cybersecurityPreparedness: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  readiness: number;
  trends: number[];
  dimensions: DimensionMetrics;
  status: "optimal" | "warning" | "critical";
  activeAnomaly: string | null;
  delayDays: number;
}

export interface GlobalMetrics {
  timestamp: string;
  globalReadiness: number;
  departments: Department[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isSimulated?: boolean;
}

export interface ModuleFeature {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  dimensions?: string[];
  icon: string;
}
