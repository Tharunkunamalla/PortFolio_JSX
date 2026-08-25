import { createContext, useContext, useState, useEffect } from "react";

const VisitorContext = createContext(undefined);

export function VisitorProvider({ children }) {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      const BASELINE = 1003;
      const KEY = "tharunkunamalla_portfolio_views";
      const hasVisited = sessionStorage.getItem("has_visited_session");
      
      const endpoint = hasVisited ? "get" : "hit";
      const url = `https://countapi.mileshilliard.com/api/v1/${endpoint}/${KEY}`;

      try {
        if (!hasVisited) {
          sessionStorage.setItem("has_visited_session", "true");
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch count: ${res.statusText}`);
        }
        
        const data = await res.json();
        if (typeof data.value === "number") {
          setCount(data.value + BASELINE);
        } else {
          setCount(BASELINE);
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
        // Fallback gracefully so we never show an error or 0
        setCount(BASELINE);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  return (
    <VisitorContext.Provider value={{ count, isLoading }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitor must be used within a VisitorProvider");
  }
  return context;
}
