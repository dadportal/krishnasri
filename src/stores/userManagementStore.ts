import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserRole } from './authStore';

export interface ManagedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  department?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details?: string;
  ipAddress: string;
  timestamp: string;
}

interface UserManagementState {
  users: ManagedUser[];
  auditLogs: AuditLog[];
  isLoading: boolean;
  
  // User CRUD
  addUser: (user: Omit<ManagedUser, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<ManagedUser>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  
  // Audit logs
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  getFilteredAuditLogs: (filters: {
    userId?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
  }) => AuditLog[];
}

const generateId = () => Math.random().toString(36).substring(2, 11);

// Initial mock users
const initialUsers: ManagedUser[] = [
  {
    id: 'usr_1',
    email: 'admin@company.com',
    name: 'Jane Mitchell',
    role: 'admin',
    status: 'active',
    department: 'Executive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-20T08:30:00Z',
  },
  {
    id: 'usr_2',
    email: 'developer@company.com',
    name: 'Alex Chen',
    role: 'developer',
    status: 'active',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    createdAt: '2024-02-20T14:30:00Z',
    lastLogin: '2024-01-19T16:45:00Z',
  },
  {
    id: 'usr_3',
    email: 'editor@company.com',
    name: 'Sarah Kim',
    role: 'editor',
    status: 'active',
    department: 'Content',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    createdAt: '2024-03-10T09:15:00Z',
    lastLogin: '2024-01-18T11:20:00Z',
  },
  {
    id: 'usr_4',
    email: 'viewer@company.com',
    name: 'Mike Johnson',
    role: 'viewer',
    status: 'inactive',
    department: 'Marketing',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    createdAt: '2024-04-05T11:45:00Z',
    lastLogin: '2024-01-10T09:00:00Z',
  },
  {
    id: 'usr_5',
    email: 'new.user@company.com',
    name: 'Emily Davis',
    role: 'viewer',
    status: 'pending',
    department: 'Sales',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    createdAt: '2024-01-18T15:30:00Z',
  },
];

// Initial audit logs
const initialAuditLogs: AuditLog[] = [
  {
    id: 'audit_1',
    userId: 'usr_1',
    userName: 'Jane Mitchell',
    action: 'USER_LOGIN',
    resource: 'Authentication',
    ipAddress: '192.168.1.100',
    timestamp: '2024-01-20T08:30:00Z',
  },
  {
    id: 'audit_2',
    userId: 'usr_1',
    userName: 'Jane Mitchell',
    action: 'USER_CREATE',
    resource: 'User Management',
    details: 'Created user: Emily Davis',
    ipAddress: '192.168.1.100',
    timestamp: '2024-01-18T15:30:00Z',
  },
  {
    id: 'audit_3',
    userId: 'usr_2',
    userName: 'Alex Chen',
    action: 'JOB_CREATE',
    resource: 'Jobs',
    details: 'Created job: Senior ML Engineer',
    ipAddress: '192.168.1.105',
    timestamp: '2024-01-17T10:00:00Z',
  },
  {
    id: 'audit_4',
    userId: 'usr_3',
    userName: 'Sarah Kim',
    action: 'CANDIDATE_UPDATE',
    resource: 'Candidates',
    details: 'Updated status for: Sarah Chen',
    ipAddress: '192.168.1.110',
    timestamp: '2024-01-16T14:20:00Z',
  },
  {
    id: 'audit_5',
    userId: 'usr_1',
    userName: 'Jane Mitchell',
    action: 'ROLE_CHANGE',
    resource: 'User Management',
    details: 'Changed role for Mike Johnson: developer → viewer',
    ipAddress: '192.168.1.100',
    timestamp: '2024-01-15T09:15:00Z',
  },
];

export const useUserManagementStore = create<UserManagementState>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      auditLogs: initialAuditLogs,
      isLoading: false,

      addUser: (user) => {
        const newUser: ManagedUser = {
          ...user,
          id: 'usr_' + generateId(),
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          users: [...state.users, newUser],
        }));
        
        // Add audit log
        get().addAuditLog({
          userId: 'system',
          userName: 'System',
          action: 'USER_CREATE',
          resource: 'User Management',
          details: `Created user: ${user.name}`,
          ipAddress: '127.0.0.1',
        });
      },

      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, ...updates } : u
          ),
        }));
      },

      deleteUser: (id) => {
        const user = get().users.find((u) => u.id === id);
        
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }));
        
        if (user) {
          get().addAuditLog({
            userId: 'system',
            userName: 'System',
            action: 'USER_DELETE',
            resource: 'User Management',
            details: `Deleted user: ${user.name}`,
            ipAddress: '127.0.0.1',
          });
        }
      },

      toggleUserStatus: (id) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id
              ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
              : u
          ),
        }));
      },

      addAuditLog: (log) => {
        const newLog: AuditLog = {
          ...log,
          id: 'audit_' + generateId(),
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          auditLogs: [newLog, ...state.auditLogs],
        }));
      },

      getFilteredAuditLogs: (filters) => {
        const { auditLogs } = get();
        
        return auditLogs.filter((log) => {
          if (filters.userId && log.userId !== filters.userId) return false;
          if (filters.action && !log.action.includes(filters.action)) return false;
          if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
          if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
          return true;
        });
      },
    }),
    {
      name: 'user-management-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
