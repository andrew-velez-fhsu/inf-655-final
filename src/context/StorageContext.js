import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ulid } from "ulid";
import { storage } from "../firebase";
import { createContext, useContext } from "react";

const StorageContext = createContext();

export const StorageContextProvider = ({ children }) => {
  const uploadFile = async (file) => {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${ulid()}.${fileExtension}`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);
    console.log("Uploaded file");
    return fileUrl;
  };

  return (
    <StorageContext.Provider value={{ uploadFile }}>
      {children}
    </StorageContext.Provider>
  );
};

export const Storage = () => {
  return useContext(StorageContext);
};
