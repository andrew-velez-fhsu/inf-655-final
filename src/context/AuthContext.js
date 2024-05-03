import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const registerNewUser = async (email, password) => {
    let token = await createUserWithEmailAndPassword(auth, email, password);
    setUser(token.user);
    return token.user;
  };
  const signIn = async (email, password) => {
    let token = await signInWithEmailAndPassword(auth, email, password);
    setUser(token.user);
    return token.user;
  };
  const logout = () => {
    setUser(null);
    return signOut(auth);
  };
  return (
    <UserContext.Provider value={{ registerNewUser, signIn, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
