import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ais, AI } from 'src/utils/ai';

// Define the types for context values
interface AIContextType {
  ai: number;
  setAI: React.Dispatch<React.SetStateAction<number>>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {

  const [ai, setAI] = useState<number>(0);

  return (
    <AIContext.Provider value={{ ai, setAI }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = (): AIContextType => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAIContext must be used within an AIProvider');
  }
  return context;
};
