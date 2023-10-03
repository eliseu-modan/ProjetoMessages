import React, { createContext, useContext,useEffect, useState, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminContextProviderProps {
  children: ReactNode;
}

export function useAdminContext(): AdminContextType {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminContextProvider');
  }
  return context;
}

export function AdminContextProvider({ children }: AdminContextProviderProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Recupera o valor de isAdmin do localStorage quando o componente é montado
    const isAdminFromLocalStorage = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminFromLocalStorage === 'true');
  }, []);


  console.log('valor do isadmin', isAdmin)

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}
