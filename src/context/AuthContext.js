import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = async (record) => {
    await updateProfile(auth.currentUser, {
      displayName: `${record.firstName} ${record.lastName}`,
      firstName: record.firstName,
      lastName: record.lastName,
    });

    await fetch(`${process.env.REACT_APP_API_URL}/users/${record.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(record),
    });

    setUser(record);
  };

  const registerNewUser = async (email, password, firstName, lastName) => {
    let token = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
    });

    //add user to local database
    const userRecord = {
      displayName: token.user.displayName,
      firstName: firstName,
      lastName: lastName,
      uid: token.user.uid,
      email: email,
    };
    await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userRecord),
    });

    setUser(userRecord);
    return token.user;
  };

  const signIn = async (email, password) => {
    let token = await signInWithEmailAndPassword(auth, email, password);
    console.log("token", token);
    //get user from local database
    const userRecords = await fetch(
      `${process.env.REACT_APP_API_URL}/users`
    ).then((data) => data.json());
    console.log("Users:", userRecords);
    const userRecord = userRecords.find((user) => user.uid === token.user.uid);
    if (userRecord) setUser(userRecord);
    else throw new Error("Unable to find user id");
    return token.user;
  };

  const logout = () => {
    setUser(null);
    return signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{ registerNewUser, signIn, logout, user, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
