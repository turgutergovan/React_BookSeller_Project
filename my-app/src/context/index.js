import React, { useContext, useReducer } from "react";
const BooksellerContext = React.createContext();

const initialState = {
  carts: [],
  book: [],
  books: [],
};

const reducer = (state , action) => {
  switch (action.type) {
    case "FETCH_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "FETCH_CARTS":
      return {
        ...state,
        carts: action.payload,
      };
    case "FETCH_BOOK_ID":
      return {
        ...state,
        book: action.payload,
      };
    default:
      return state;
  }
};

const BooksellerProvider = (props) => {
    const [state, dispatch] = useReducer (reducer, initialState);
    return (
        <BooksellerContext.Provider value={[state,dispatch]}>
        {props.children}
        </BooksellerContext.Provider>
    );

};

export {BooksellerProvider,useContext,BooksellerContext};
