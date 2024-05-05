import { ulid } from "ulid";

import { createContext, useContext, useState } from "react";

const PetsContext = createContext();

export const PetsContextProvider = ({ children }) => {
  const [pets, setPets] = useState([]);

  const getPetsByUser = async (uid) => {
    const allPets = await fetch(`${process.env.REACT_APP_API_URL}/pets`).then(
      (data) => data.json()
    );
    const myPets = allPets.filter((pet) => pet.uid === uid);
    setPets(myPets);
    return myPets;
  };

  const addNewPet = async (uid) => {
    const id = ulid();
    const pet = { uid, id };
    await fetch(`${process.env.REACT_APP_API_URL}/pets`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(pet),
    });
    return pet;
  };

  const updatePet = async (profile) => {
    await fetch(`${process.env.REACT_APP_API_URL}/pets/${profile.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(profile),
    });
  };

  return (
    <PetsContext.Provider value={{ pets, getPetsByUser, addNewPet, updatePet }}>
      {children}
    </PetsContext.Provider>
  );
};

export const Pets = () => {
  return useContext(PetsContext);
};
