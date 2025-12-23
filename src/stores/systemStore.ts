import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SystemLog {
  id: string;
  type: 'threat' | 'auth' | 'infra' | 'payment' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details?: string;
  timestamp: Date;
  source: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
  uptime: number;
  threatsBlocked: number;
  activeUsers: number;
}

export interface TrafficData {
  timestamp: string;
  requests: number;
  errors: number;
  latency: number;
}

interface SystemState {
  logs: SystemLog[];
  metrics: SystemMetrics;
  trafficHistory: TrafficData[];
  isSimulating: boolean;
  
  // Actions
  addLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void;
  updateMetrics: (metrics: Partial<SystemMetrics>) => void;
  addTrafficData: (data: TrafficData) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  clearLogs: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

// Initial mock metrics
const initialMetrics: SystemMetrics = {
  cpu: 42,
  memory: 68,
  requests: 12847,
  errors: 23,
  uptime: 99.97,
  threatsBlocked: 847,
  activeUsers: 156,
};

// Initial mock logs
const initialLogs: SystemLog[] = [
  {
    id: generateId(),
    type: 'threat',
    severity: 'high',
    message: 'SQL injection attempt blocked',
    details: 'Source IP: 192.168.1.45',
    timestamp: new Date(Date.now() - 120000),
    source: 'WAF',
  },
  {
    id: generateId(),
    type: 'auth',
    severity: 'medium',
    message: 'Multiple failed login attempts',
    details: 'User: suspicious@email.com, Attempts: 5',
    timestamp: new Date(Date.now() - 300000),
    source: 'Auth Service',
  },
  {
    id: generateId(),
    type: 'infra',
    severity: 'low',
    message: 'Auto-scaling triggered',
    details: 'Instance count: 4 → 6',
    timestamp: new Date(Date.now() - 600000),
    source: 'Kubernetes',
  },
  {
    id: generateId(),
    type: 'payment',
    severity: 'low',
    message: 'Payment processed successfully',
    details: 'Transaction ID: txn_abc123',
    timestamp: new Date(Date.now() - 900000),
    source: 'Payment Gateway',
  },
];

// Generate initial traffic history
const generateTrafficHistory = (): TrafficData[] => {
  const history: TrafficData[] = [];
  const now = Date.now();
  
  for (let i = 24; i >= 0; i--) {
    history.push({
      timestamp: new Date(now - i * 3600000).toISOString(),
      requests: Math.floor(Math.random() * 500) + 200,
      errors: Math.floor(Math.random() * 10),
      latency: Math.floor(Math.random() * 100) + 50,
    });
  }
  
  return history;
};

let simulationInterval: NodeJS.Timeout | null = null;

export const useSystemStore = create<SystemState>()(
  persist(
    (set, get) => ({
      logs: initialLogs,
      metrics: initialMetrics,
      trafficHistory: generateTrafficHistory(),
      isSimulating: false,

      addLog: (log) => {
        const newLog: SystemLog = {
          ...log,
          id: generateId(),
          timestamp: new Date(),
        };
        
        set((state) => ({
          logs: [newLog, ...state.logs].slice(0, 100), // Keep last 100 logs
        }));
      },

      updateMetrics: (metrics) => {
        set((state) => ({
          metrics: { ...state.metrics, ...metrics },
        }));
      },

      addTrafficData: (data) => {
        set((state) => ({
          trafficHistory: [...state.trafficHistory.slice(-23), data],
        }));
      },

      startSimulation: () => {
        set({ isSimulating: true });
        
        // Clear any existing interval
        if (simulationInterval) clearInterval(simulationInterval);
        
        // Simulate real-time updates
        simulationInterval = setInterval(() => {
          const { addLog, updateMetrics, addTrafficData, isSimulating } = get();
          
          if (!isSimulating) {
            if (simulationInterval) clearInterval(simulationInterval);
            return;
          }
          
          // Random metric changes
          updateMetrics({
            cpu: Math.min(100, Math.max(10, get().metrics.cpu + (Math.random() - 0.5) * 10)),
            memory: Math.min(100, Math.max(20, get().metrics.memory + (Math.random() - 0.5) * 5)),
            requests: get().metrics.requests + Math.floor(Math.random() * 50),
            activeUsers: Math.max(50, get().metrics.activeUsers + Math.floor((Math.random() - 0.5) * 10)),
          });
          
          // Add traffic data
          addTrafficData({
            timestamp: new Date().toISOString(),
            requests: Math.floor(Math.random() * 500) + 200,
            errors: Math.floor(Math.random() * 10),
            latency: Math.floor(Math.random() * 100) + 50,
          });
          
          // Occasionally add a log
          if (Math.random() > 0.7) {
            const logTypes: SystemLog['type'][] = ['threat', 'auth', 'infra', 'payment', 'info'];
            const severities: SystemLog['severity'][] = ['low', 'medium', 'high', 'critical'];
            const messages = [
              { type: 'threat', message: 'Suspicious activity detected', source: 'Security' },
              { type: 'auth', message: 'New user login', source: 'Auth Service' },
              { type: 'infra', message: 'Health check passed', source: 'Load Balancer' },
              { type: 'payment', message: 'Subscription renewed', source: 'Billing' },
              { type: 'info', message: 'Cache refreshed', source: 'Redis' },
            ];
            
            const selected = messages[Math.floor(Math.random() * messages.length)];
            addLog({
              type: selected.type as SystemLog['type'],
              severity: severities[Math.floor(Math.random() * severities.length)],
              message: selected.message,
              source: selected.source,
            });
            
            // Update threats blocked if it's a threat
            if (selected.type === 'threat') {
              updateMetrics({
                threatsBlocked: get().metrics.threatsBlocked + 1,
              });
            }
          }
        }, 3000);
      },

      stopSimulation: () => {
        set({ isSimulating: false });
        if (simulationInterval) {
          clearInterval(simulationInterval);
          simulationInterval = null;
        }
      },

      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: 'system-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        logs: state.logs.slice(0, 50),
        metrics: state.metrics,
      }),
    }
  )
);
