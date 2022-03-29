import React, { useEffect } from "react";
import axios from "axios";
import {
  DetailsList,
  SelectionMode,
  Stack,
  PrimaryButton,
  CommandBar,
} from "@fluentui/react";
import { BooksellerContext, useContext } from "../context";
import { useNavigate } from "react-router-dom";
import Toolbar from "../component/Toolbar";

const columnProps = {
  tokens: { childrenGap: 20 },
  styles: { root: { width: 100 } },
};
export default function Books() {
  const [state, dispatch] = useContext(BooksellerContext);

  const navigate = useNavigate();
  const columns = [
    {
      key: "id",
      name: "Id",
      fieldName: "id",
      minWidth: 10,
      maxWidth: 50,
      isRowHeader: true,
    },
    {
      key: "imgUrl",
      name: "FotoÄŸraf",
      fieldName: "name",
      minWidth: 200,
      maxWidth: 250,
      isRowHeader: true,
      onRender: (item) => (
        <img
          src={item.imgUrl}
          style={{ width: "200px", height: "250px" }}
          alt={`${item.name} - ${item.author}`}
        />
      ),
    },
    {
      key: "name",
      name: "Ad",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 150,
      isRowHeader: true,
    },
    {
      key: "author",
      name: "Yazar",
      fieldName: "author",
      minWidth: 100,
      maxWidth: 200,
      isRowHeader: true,
    },
    {
      key: "about",
      name: "Konusu",
      fieldName: "about",
      minWidth: 300,
      maxWidth: 500,
      isRowHeader: true,
    },
    {
      key: "process",
      name: "Ä°ÅŸlemler",
      fieldName: "Process",
      minWidth: 300,
      maxWidth: 500,
      isRowHeader: true,
      onRender: (item) => (
        <Stack {...columnProps} horizontal>
          <PrimaryButton text="Add Cart" onClick={() => addToCart(item)} />

          <PrimaryButton
            text="Edit Book"
            onClick={() =>
              navigate("/book/edit/" + item.id, {
                state: { id: item.id },
              })
            }
          />
          <PrimaryButton
            text="Delete Book"
            onClick={async () => await deleteBook(item.id)}
          />
        </Stack>
      ),
    },
  ];

  function addToCart(cartItem) {
    axios
      .post("https://book-store-api-test.herokuapp.com/carts", cartItem)
      .then((res) => {
        console.log(res.data);
      });
  }

  async function deleteBook(bookID) {
    await axios.delete(
      "https://book-store-api-test.herokuapp.com/books/${bookID}"
    );
    getBooks();
  }

  function getBooks() {
    axios
      .get("https://book-store-api-test.herokuapp.com/books")
      .then((response) => {
        dispatch({ type: "FETCH_BOOKS", payload: response.data });
      });
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <Toolbar />
      <div className="content">
        <div className="content-header"> Books</div>

        <DetailsList
          items={state.books}
          columns={columns}
          selectionMode={SelectionMode.none}
        />
      </div>
    </div>
  );
}
