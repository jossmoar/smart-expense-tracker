"use client";

import "@/i18n";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateDisplayName: (firstName: string, lastName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
    },
    async register(email, password, firstName, lastName) {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: `${firstName} ${lastName}`.trim() });
      // onAuthStateChanged won't refire for a profile-only update, and
      // credential.user is the same mutated instance — spread it into a new
      // object so React actually sees a changed reference and re-renders.
      setUser({ ...credential.user } as User);
    },
    async logout() {
      await signOut(auth);
    },
    async updateDisplayName(firstName, lastName) {
      if (!auth.currentUser) return;
      await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}`.trim() });
      setUser({ ...auth.currentUser } as User);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
