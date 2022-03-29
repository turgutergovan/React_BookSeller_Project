import React, { useEffect } from "react";
import { Stack, PrimaryButton, TextField } from "@fluentui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext, BooksellerContext } from "../context";

export default function BooksEdit() {
  const location = useLocation();
  const [state, dispatch] = useContext(BooksellerContext);
  const { book } = state;

  const onChangeText = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "FETCH_BOOK_ID",
      payload: { ...book, [name]: value },
    });
  };
  function editBook() {
    axios
      .put(
        "https://book-store-api-test.herokuapp.com/books/" + location.state.id,
        book
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Book successfully updated");
        }
      });
  }
  function fetchBookById() {
    axios
      .get(
        "https://book-store-api-test.herokuapp.com/books/" + location.state.id
      )
      .then((res) => {
        dispatch({ type: "FETCH_BOOK_ID", payload: res.data });
      });
  }
  useEffect(()=>{
      fetchBookById();
  },[]);
return(
    <div className="content">
    <div className="content-header">Books Edit</div>
    <Stack
      tokens={{ childrenGap: 10 }}
      styles={{
        root: {
          width: 700,
          marginLeft: 10,
          marginTop: 10,
        },
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={book.name}
        defaultValue={"Tutunamayanlar"}
        placeholder={"Please enter name here"}
        onChange={onChangeText}
        required
      />
      <TextField
        label="Author"
        name="author"
        value={book.author}
        defaultValue={"Tutunamayanlar"}
        placeholder={"Please enter author here"}
        onChange={onChangeText}
        required
      />
      <TextField
        label="Image"
        name="imgUrl"
        value={book.imgUrl}
        defaultValue={"Tutunamayanlar"}
        placeholder={"Please enter image url here"}
        onChange={onChangeText}
        required
      />
      <TextField
        label="About"
        name="about"
        value={book.about}
        defaultValue={"Tutunamayanlar"}
        placeholder={"Please enter about here"}
        onChange={onChangeText}
        required
      />
      <PrimaryButton
        text="Create Book"
        onClick={() => editBook()}
        style={{ width: "100%", height: "50px" }}
        onChange={onChangeText}
      />
    </Stack>
  </div>
);

}
