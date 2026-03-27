"use client";
// context/SearchContext.js
import { createContext, useState, useContext } from "react";

// Create context for managing the search state
const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  // Local state management for modelId and passengers
  const [modelId, setModelId] = useState("");
  
  const [passengers, setPassengers] = useState("");
 
  // Actions to update the state
  const updateModelId = (id) => {
    setModelId(id);
  };

  const updatePassengers = (count) => {
    setPassengers(count);
  };

  return (
    <SearchContext.Provider
      value={{ modelId, passengers, updateModelId, updatePassengers }}
    >
      {children}
    </SearchContext.Provider>
  );
};
