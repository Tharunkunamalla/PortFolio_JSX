import {createContext, useContext, useState, useEffect} from "react";

const TerminalContext = createContext(undefined);

export const TerminalProvider = ({children}) => {
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);

  const toggleTerminal = () => setTerminalOpen((prev) => !prev);
  const toggleMatrix = () => setMatrixActive((prev) => !prev);
  
  const toggleHackerMode = () => {
    setHackerMode((prev) => {
      const newVal = !prev;
      document.documentElement.classList.toggle("hacker-mode", newVal);
      return newVal;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on backtick key or Ctrl + K
      if (e.key === "`" || (e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        toggleTerminal();
      }

      // Close on Escape if terminal is open
      if (e.key === "Escape") {
        if (isTerminalOpen) {
          e.preventDefault();
          if (matrixActive) {
            setMatrixActive(false);
          } else {
            setTerminalOpen(false);
          }
        } else if (matrixActive) {
          e.preventDefault();
          setMatrixActive(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalOpen, matrixActive]);

  return (
    <TerminalContext.Provider
      value={{
        isTerminalOpen,
        setTerminalOpen,
        toggleTerminal,
        matrixActive,
        setMatrixActive,
        toggleMatrix,
        hackerMode,
        setHackerMode,
        toggleHackerMode,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
};
