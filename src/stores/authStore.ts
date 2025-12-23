import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'admin' | 'developer' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshSession: () => Promise<boolean>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
}

// Role hierarchy for permission checks
const roleHierarchy: Record<UserRole, number> = {
  admin: 4,
  developer: 3,
  editor: 2,
  viewer: 1,
};

// Mock users database
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@company.com': {
    password: 'admin123',
    user: {
      id: 'usr_1',
      email: 'admin@company.com',
      name: 'Jane Mitchell',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      createdAt: '2024-01-15T10:00:00Z',
    },
  },
  'developer@company.com': {
    password: 'dev123',
    user: {
      id: 'usr_2',
      email: 'developer@company.com',
      name: 'Alex Chen',
      role: 'developer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      createdAt: '2024-02-20T14:30:00Z',
    },
  },
  'editor@company.com': {
    password: 'edit123',
    user: {
      id: 'usr_3',
      email: 'editor@company.com',
      name: 'Sarah Kim',
      role: 'editor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      createdAt: '2024-03-10T09:15:00Z',
    },
  },
  'viewer@company.com': {
    password: 'view123',
    user: {
      id: 'usr_4',
      email: 'viewer@company.com',
      name: 'Mike Johnson',
      role: 'viewer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      createdAt: '2024-04-05T11:45:00Z',
    },
  },
};

const generateToken = () => {
  return 'tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser = mockUsers[email.toLowerCase()];
        
        if (mockUser && mockUser.password === password) {
          const session: AuthSession = {
            token: generateToken(),
            refreshToken: generateToken(),
            expiresAt: Date.now() + 3600000, // 1 hour
          };
          
          set({
            user: mockUser.user,
            session,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          session: null,
          isAuthenticated: false,
        });
      },

      refreshSession: async () => {
        const { session } = get();
        if (!session) return false;
        
        // Simulate token refresh
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const newSession: AuthSession = {
          token: generateToken(),
          refreshToken: session.refreshToken,
          expiresAt: Date.now() + 3600000,
        };
        
        set({ session: newSession });
        return true;
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),

      hasPermission: (requiredRole) => {
        const { user } = get();
        if (!user) return false;
        
        const userLevel = roleHierarchy[user.role];
        
        if (Array.isArray(requiredRole)) {
          return requiredRole.some(role => userLevel >= roleHierarchy[role]);
        }
        
        return userLevel >= roleHierarchy[requiredRole];
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
