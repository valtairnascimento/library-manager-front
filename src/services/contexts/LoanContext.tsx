import React, { createContext, useContext } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

interface ILoan {
  id: number;
  idUser: number;
  userName: string;
  idBook: number;
  bookName: string;
  loanDate: string;
  returnDate: string;
}

interface ICreateLoanInput {
  idUser: number;
  idBook: number;
  loanDate: string;
}

interface IReturnLoanInput {
  id: number;
  returnDate: string;
}

interface ILoanContext {
  loans: ILoan[] | undefined;
  isLoading: boolean;
  createLoan: (data: ICreateLoanInput) => Promise<void>;
  returnLoan: (data: IReturnLoanInput) => Promise<void>;
  refetchLoans: () => void;
}

const LoanContext = createContext<ILoanContext>({} as ILoanContext);

const LoanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const fetchLoans = async () => {
    const response = await axios.get<{ data: ILoan[] }>(
      "https://localhost:7124/api/loans"
    );
    return response.data.data;
  };

  const {
    data: loans,
    isLoading,
    refetch: refetchLoans,
  } = useQuery<ILoan[]>({
    queryKey: ["loans"],
    queryFn: fetchLoans,
  });

  const createLoanMutation = useMutation({
    mutationFn: async (newLoan: ICreateLoanInput) => {
      await axios.post("https://localhost:7124/api/loans", newLoan);
    },

    onSuccess: () => {
      refetchLoans();
    },
  });

  const returnLoanMutation = useMutation({
    mutationFn: async ({ id, returnDate }: IReturnLoanInput) => {
      await axios.put(`https://localhost:7124/api/loans/return/${id}`, {
        id,
        returnDate,
      });
    },
    onSuccess: () => {
      refetchLoans();
    },
  });

  const createLoan = async (data: ICreateLoanInput) => {
    await createLoanMutation.mutateAsync(data);
  };

  const returnLoan = async (data: IReturnLoanInput) => {
    await returnLoanMutation.mutateAsync(data);
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        isLoading,
        createLoan,
        returnLoan,
        refetchLoans,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

function useLoan(): ILoanContext {
  return useContext(LoanContext);
}

export { LoanProvider, useLoan };
