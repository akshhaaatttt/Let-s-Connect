
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check if the user is an admin
  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }

      console.log("Admin status check:", data);
      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
      
      console.log("Sign in successful:", data);
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${email}!`,
      });
    } catch (error: any) {
      console.error("Sign in error caught:", error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("Attempting sign up for:", email);
      
      // First, check if a user with this email already exists
      // Fix: Use a more direct approach to avoid deep type instantiation
      const lowerEmail = email.toLowerCase();
      const { data, error: queryError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', lowerEmail);
        
      if (queryError) {
        console.error("Error checking existing user:", queryError);
        throw queryError;
      }
      
      // Check if any results were returned
      if (data && data.length > 0) {
        toast({
          title: "User already exists",
          description: "This email is already registered. Please sign in instead.",
          variant: "destructive",
        });
        return;
      }
      
      // Proceed with signup
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            email: email
          }
        }
      });

      if (error) {
        console.error("Sign up error:", error);
        
        // Special handling for the database error
        if (error.message.includes("Database error saving new user")) {
          // Create a profile manually if that's the issue
          try {
            if (signUpData?.user) {
              await supabase.from('profiles').insert({
                id: signUpData.user.id,
                email: email,
                role: 'user'
              });
              
              toast({
                title: "Account created",
                description: "Please check your email to confirm your account.",
              });
              return;
            }
          } catch (profileError) {
            console.error("Error creating profile:", profileError);
          }
        }
        
        throw error;
      }
      
      console.log("Sign up successful:", signUpData);
      
      // Check if email confirmation is required
      if (signUpData?.user?.identities?.length === 0) {
        toast({
          title: "User already exists",
          description: "This email is already registered. Please sign in instead.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      console.error("Sign up error caught:", error);
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Attempting sign out");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      
      console.log("Sign out successful");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      console.error("Sign out error caught:", error);
      toast({
        title: "Error logging out",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      isAdmin,
      isLoading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
