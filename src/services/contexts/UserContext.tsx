import React, { createContext, useContext } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

interface IUser {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  loans: string[];
}

interface ICreateUserInput {
  name: string;
  email: string;
  birthdate: string;
  role: string;
  password: string;
}

interface IUserContext {
  users: IUser[] | undefined;
  isLoading: boolean;
  createUser: (data: ICreateUserInput) => Promise<void>;
  refetchUsers: () => void;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const fetchUsers = async () => {
    const response = await axios.get<{ data: IUser[] }>(
      "https://localhost:7124/api/users"
    );
    return response.data.data;
  };

  const {
    data: users,
    isLoading,
    refetch: refetchUsers,
  } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: async (newUser: ICreateUserInput) => {
      await axios.post("https://localhost:7124/api/users", newUser);
    },

    onSuccess: () => {
      refetchUsers();
    },
  });

  const createUser = async (data: ICreateUserInput) => {
    await createUserMutation.mutateAsync(data);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        createUser,
        refetchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser(): IUserContext {
  return useContext(UserContext);
}

export { UserProvider, useUser };
