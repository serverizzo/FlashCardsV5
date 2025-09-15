import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
    userId: string | null;
    setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType>({
    // user: null,
    // setUser: () => {}
    userId: null,
    setUserId: () => {}
  });

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState("")

  return (
    // <UserContext.Provider value={{ user, setUser }}>
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};