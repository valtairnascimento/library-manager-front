import React, { createContext, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface IAuthContext {
  logged: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface IAuthProvider {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const token = localStorage.getItem("@library-manager-front:token");
    return !!token;
  });

  const login = async (data: LoginData): Promise<LoginResponse> => {
    const response = await axios.put(
      "https://localhost:7124/api/users/login",
      data
    );
    return response.data;
  };

  const loginMutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("@library-manager-front:token", data.token);
      setLogged(true);
    },
    onError: () => {
      alert("Falha no login. Verifique suas credenciais.");
    },
  });

  const signIn = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const signOut = () => {
    localStorage.removeItem("@library-manager-front:token");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
