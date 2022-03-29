import React, { useEffect } from "react";
import axios from "axios";
import {
  DetailsList,
  Stack,
  PrimaryButton,
  SelectionMode,
  getContrastRatio,
} from "@fluentui/react";
import { useContext, BooksellerContext } from "../context";

const columnProps = {
  tokens: { childrenGap: 20 },
  styles: { root: { width: 100 } },
};
export default function Carts() {
  const [state, dispatch] = useContext(BooksellerContext);
  const { carts, books } = state;
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
          <PrimaryButton
            text="Delete Cart"
            onClick={() => deleteCart(item.id)}
          />
        </Stack>
      ),
    },
  ];
  async function deleteCart(cartID) {
    const response = await axios.delete(
      "https://book-store-api-test.herokuapp.com/carts/${cartID}"
    );
    if (response.status === 200) {
      getCart();
    }
  }

  const getCart = () => {
    axios
      .get("https://book-store-api-test.herokuapp.com/carts/")
      .then((response) => {
        dispatch({ type: "FETCH_CARTS", payload: response.data });
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <div className="content">
        <h3>Total Book Count: {books.length}</h3>
        <div className="content-header">
          {carts.length > 0 ? "Carts" : "Carts Is Empty"}
        </div>
        {carts.length > 0 && (
          <DetailsList
            items={carts}
            colums={columns}
            SelectionMode={SelectionMode.none}
          ></DetailsList>
        )}
      </div>
    </div>
  );
}
