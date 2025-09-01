"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/services/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  updatePassword,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { signUp, signIn, logOut } from "@/services/authService";

// ----------------- Types -----------------
interface UserData {
  uid: string;
  name?: string;
  email?: string;
  createdAt?: string;
  lastUpdated?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: (FirebaseUser & UserData) | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  updateUser: (updates: { name?: string; password?: string }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------- Provider -----------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<(FirebaseUser & UserData) | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          setUser({ ...firebaseUser, ...userData });
        } else {
          setUser(firebaseUser as FirebaseUser & UserData);
        }

        setIsAuthenticated(true);
      } else {
        clearAuth();
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ----------------- Local Cards Save -----------------
  const saveLocalCardsToDB = async (uid: string) => {
    const localCards = JSON.parse(localStorage.getItem("savedCards") || "[]");
    if (localCards.length === 0) return;

    try {
      for (const card of localCards) {
        card.uid = uid;
        await addDoc(collection(db, "cards"), card);
      }
      localStorage.removeItem("savedCards");
      console.log("All local cards saved to DB.");
    } catch (error) {
      console.error("Error saving cards:", error);
    }
  };

  // ----------------- Auth Methods -----------------
  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await signUp(email, password);

      await setDoc(doc(db, "users", userCredential.uid), {
        uid: userCredential.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message.match(/\((.*?)\)/)?.[1] || err.message,
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message.match(/\((.*?)\)/)?.[1] || err.message,
      };
    }
  };

  const logout = async () => {
    try {
      await logOut();
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message.match(/\((.*?)\)/)?.[1] || err.message,
      };
    }
  };

  const updateUser = async (updates: { name?: string; password?: string }) => {
    if (!user) return { success: false, error: "User not logged in" };

    try {
      const userRef = doc(db, "users", user.uid);
      const firestoreUpdates: Partial<UserData> = { lastUpdated: new Date().toISOString() };

      if (updates.name) {
        await updateProfile(auth.currentUser!, { displayName: updates.name });
        firestoreUpdates.name = updates.name;
      }

      if (updates.password) {
        await updatePassword(auth.currentUser!, updates.password);
      }

      await updateDoc(userRef, firestoreUpdates);

      setUser((prev) =>
        prev
          ? { ...prev, ...updates, lastUpdated: firestoreUpdates.lastUpdated }
          : null
      );

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message.match(/\((.*?)\)/)?.[1] || err.message,
      };
    }
  };

  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------- Hook -----------------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context ) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
