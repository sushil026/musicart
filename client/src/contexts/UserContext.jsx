import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [id, setId] = useState(null); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("profile");
        setId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
