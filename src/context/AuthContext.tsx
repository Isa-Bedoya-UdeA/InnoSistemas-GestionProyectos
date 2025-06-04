import React, { createContext, useContext } from 'react';

type User = {
    nombre: string;
};

type AuthContextType = {
    user: User | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Usuario simulado
    const user: User = { nombre: 'John Doe' };

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook de acceso rápido (opcional)
export const useAuth = () => useContext(AuthContext);