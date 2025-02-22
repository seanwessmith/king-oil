import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../services/supabaseClient";
import { User as SupabaseUser } from "@supabase/supabase-js";

// Define your custom user interface.
export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

// Define the credentials type for login.
interface LoginCredentials {
  email: string;
  password: string;
}

// Define the credentials type for signup.
interface SignupCredentials {
  email: string;
  password: string;
  fullName?: string;
}

// Define the context interface.
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to transform a Supabase user into our custom User type.
const transformUser = (supabaseUser: SupabaseUser): User => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    name:
      (supabaseUser.user_metadata?.full_name as string) ||
      (supabaseUser.user_metadata?.name as string) ||
      "",
    image: (supabaseUser.user_metadata?.avatar_url as string) || "",
  };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize the user on component mount.
  useEffect(() => {
    // Fetch the current session.
    const getUserFromSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      if (session?.user) {
        setUser(transformUser(session.user));
      }
    };

    getUserFromSession();

    // Subscribe to auth state changes.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(transformUser(session.user));
        } else {
          setUser(null);
        }
      }
    );
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Login function using Supabase's signInWithPassword.
  const login = async (credentials: LoginCredentials): Promise<void> => {
    const { email, password } = credentials;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.session?.user) {
      setUser(transformUser(data.session.user));
    }
  };

  // Signup function using Supabase's signUp.
  const signup = async (credentials: SignupCredentials): Promise<void> => {
    const { email, password, fullName } = credentials;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "",
        },
      },
    });

    if (error) {
      throw error;
    }

    // Optionally, set the user if the session is auto-created.
    if (data.session?.user) {
      setUser(transformUser(data.session.user));
    }
  };

  // Logout function using Supabase's signOut.
  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};