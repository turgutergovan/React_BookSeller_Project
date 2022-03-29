import React, { useState } from "react";
import { Stack, PrimaryButton, TextField } from "@fluentui/react";
import axios from "axios";

export default function BooksCreate() {
  const [pageData, setPageData] = useState({
    name: "",
    author: "",
    imgUrl: "",
    about: "",
  });
  const onChangeText = (e) => {
    const { name, value } = e.target;
    setPageData({ ...pageData, [name]: value });
  };
  function createBook() {
    axios
      .post("https://book-store-api-test.herokuapp.com/books", pageData)
      .then((res) => {
        if (res.status === 200) {
          alert("Book created successfully");
        }
      });
  }
  return (
    <div className="content">
      <div className="content-header">Books Create</div>
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
          value={pageData.name}
          defaultValue={"Tutunamayanlar"}
          placeholder={"Please enter name here"}
          onChange={onChangeText}
          required
        />
        <TextField
          label="Author"
          name="author"
          value={pageData.author}
          defaultValue={"Tutunamayanlar"}
          placeholder={"Please enter author here"}
          onChange={onChangeText}
          required
        />
        <TextField
          label="Image"
          name="imgUrl"
          value={pageData.imgUrl}
          defaultValue={"Tutunamayanlar"}
          placeholder={"Please enter image url here"}
          onChange={onChangeText}
          required
        />
        <TextField
          label="About"
          name="about"
          value={pageData.about}
          defaultValue={"Tutunamayanlar"}
          placeholder={"Please enter about here"}
          onChange={onChangeText}
          required
        />
        <PrimaryButton
          text="Create Book"
          onClick={() => createBook()}
          style={{ width: "100%", height: "50px" }}
          onChange={onChangeText}
        />
      </Stack>
    </div>
  );
}
