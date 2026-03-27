import React, { createContext, useContext, useState } from 'react';

// Create context
const DataContext = createContext();

// Create provider component
export const DataProvider = ({ children }) => {
  const [modelId, setModelId] = useState("");
  const [passengers, setPassengers] = useState("");

  return (
    <DataContext.Provider value={{ modelId, setModelId, passengers, setPassengers }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use context
export const useDataContext = () => {
  return useContext(DataContext);
};
