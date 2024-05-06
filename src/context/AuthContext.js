import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
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
  };

  const registerNewUser = async (email, password, firstName, lastName) => {
    await setPersistence(auth, browserLocalPersistence);
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
    return token.user;
  };

  const getUserId = () => {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return false;
    }
  };

  const getCurrentUserDisplayName = () => {
    const user = auth.currentUser;
    console.log("user", user);
    if (user) {
      return user.displayName;
    } else {
      return "";
    }
  };

  const getProfile = async () => {
    const token = getAuth();
    const currentUser = token.currentUser;
    if (currentUser) {
      const userRecords = await (
        await fetch(`${process.env.REACT_APP_API_URL}/users`)
      ).json();
      const userRecord = userRecords.find(
        (user) => user.uid === currentUser.uid
      );
      if (!userRecord) throw new Error("Unable to find user id");
      return userRecord;
    } else {
      return false;
    }
  };

  const signIn = async (email, password) => {
    await setPersistence(auth, browserSessionPersistence);
    let token = await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <UserContext.Provider
      value={{
        registerNewUser,
        signIn,
        logout,
        updateUser,
        getUserId,
        getProfile,
        getCurrentUserDisplayName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
