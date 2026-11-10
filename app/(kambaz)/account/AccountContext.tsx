"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as client from "./client";

export type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
};

// The shared blank draft that Sign up and the People table start from.
export const emptyUser: User = {
  _id: "0",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
  loginId: "",
  section: "",
  lastActivity: "",
  totalActivity: "",
};

type AccountContextValue = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Ask the server for the session user, so a browser reload keeps the user signed in.
  useEffect(() => {
    client
      .profile()
      .then(setCurrentUser)
      .catch(() => setCurrentUser(null));
  }, []);
  return (
    <AccountContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const value = useContext(AccountContext);
  if (!value) {
    throw new Error("useAccountContext must be used inside AccountProvider");
  }
  return value;
}
