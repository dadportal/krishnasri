import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'developer' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  fetchUserRole: (userId: string) => Promise<UserRole>;
  updateUserRole: (userId: string, role: UserRole) => Promise<boolean>;
}

// Role hierarchy for permission checks
const roleHierarchy: Record<UserRole, number> = {
  admin: 4,
  developer: 3,
  editor: 2,
  viewer: 1,
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  supabaseUser: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        set({ isInitialized: true, isLoading: false });
        return;
      }

      if (session?.user) {
        // Fetch user role from database
        const role = await get().fetchUserRole(session.user.id);
        
        // Fetch profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
          role,
          avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
          createdAt: profile?.created_at || session.user.created_at,
        };

        set({
          user,
          supabaseUser: session.user,
          session,
          isAuthenticated: true,
        });
      }

      set({ isInitialized: true, isLoading: false });

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state change:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const role = await get().fetchUserRole(session.user.id);
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const user: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
            role,
            avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
            createdAt: profile?.created_at || session.user.created_at,
          };

          set({
            user,
            supabaseUser: session.user,
            session,
            isAuthenticated: true,
          });
        } else if (event === 'SIGNED_OUT') {
          set({
            user: null,
            supabaseUser: null,
            session: null,
            isAuthenticated: false,
          });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isInitialized: true, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false });
        return { success: false, error: error.message };
      }

      if (data.user) {
        const role = await get().fetchUserRole(data.user.id);
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: profile?.full_name || data.user.email?.split('@')[0] || 'User',
          role,
          avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
          createdAt: profile?.created_at || data.user.created_at,
        };

        set({
          user,
          supabaseUser: data.user,
          session: data.session,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: 'Unknown error occurred' };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  signup: async (email: string, password: string, name: string, role: UserRole = 'viewer') => {
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        set({ isLoading: false });
        return { success: false, error: error.message };
      }

      if (data.user) {
        // The trigger will create the profile and assign default role
        // If admin is creating a user with a specific role, update it
        if (role !== 'viewer') {
          await get().updateUserRole(data.user.id, role);
        }

        set({ isLoading: false });
        return { success: true };
      }

      set({ isLoading: false });
      return { success: false, error: 'Unknown error occurred' };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  logout: async () => {
    set({ isLoading: true });
    
    try {
      await supabase.auth.signOut();
      set({
        user: null,
        supabaseUser: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({ isLoading: false });
    }
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

  fetchUserRole: async (userId: string): Promise<UserRole> => {
    try {
      const { data, error } = await supabase.rpc('get_user_role', { _user_id: userId });
      
      if (error) {
        console.error('Error fetching user role:', error);
        return 'viewer';
      }
      
      return (data as UserRole) || 'viewer';
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'viewer';
    }
  },

  updateUserRole: async (userId: string, role: UserRole): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role })
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  },
}));
