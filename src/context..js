import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { items } = data;

      if (items) {
        const newBooks = items.slice(0, 20).map((bookSingle) => {
          return {
            kind: bookSingle.kind,
            id: bookSingle.id,
            etag: bookSingle.etag,
            selfLink: bookSingle.selfLink,
            volumeInfo: bookSingle.volumeInfo,
            saleInfo: bookSingle.saleInfo,
            accessInfo: bookSingle.accessInfo,
            searchInfo: bookSingle.searchInfo,
          };
        });

        setBooks(newBooks);

        if (newBooks.length > 1) {
          setResultTitle("Your Search Result");
        } else {
          setResultTitle("No Search Result Found!");
        }
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
