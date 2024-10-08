import React, { createContext, useContext } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

interface IBook {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: string;
}

interface ICreateBookInput {
  title: string;
  author: string;
  isbn: string;
  publicationYear: string;
}

interface IBookContext {
  books: IBook[] | undefined;
  isLoading: boolean;
  createBook: (data: ICreateBookInput) => Promise<void>;
  refetchBooks: () => void;
}

const BookContext = createContext<IBookContext>({} as IBookContext);

const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const fetchBooks = async () => {
    const response = await axios.get<{ data: IBook[] }>(
      "https://localhost:7124/api/books"
    );
    return response.data.data;
  };

  const {
    data: books,
    isLoading,
    refetch: refetchBooks,
  } = useQuery<IBook[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const createBookMutation = useMutation({
    mutationFn: async (newBook: ICreateBookInput) => {
      await axios.post("https://localhost:7124/api/books", newBook);
    },

    onSuccess: () => {
      refetchBooks();
    },
  });

  const createBook = async (data: ICreateBookInput) => {
    await createBookMutation.mutateAsync(data);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        isLoading,
        createBook,
        refetchBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

function useBook(): IBookContext {
  return useContext(BookContext);
}

export { BookProvider, useBook };
