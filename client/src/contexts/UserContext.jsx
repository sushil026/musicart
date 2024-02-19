import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [id, setId] = useState(null);
  const [cart_quantity, setQuantity] = useState(0)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("profile");
        setId(response.data.userId);
        setQuantity(response.data.cart_quantity)
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ id, setId, setQuantity, cart_quantity }}>
      {children}
    </UserContext.Provider>
  );
}
