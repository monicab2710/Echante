"use client";
import { createContext, useState } from 'react';

import { ThemeProvider } from "next-themes";

export const UserContext = createContext(null);


export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);


  return (
    <UserContext.Provider value={{user , setUser }}>

    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      {children}
    </ThemeProvider>
    </UserContext.Provider>
  );
}
