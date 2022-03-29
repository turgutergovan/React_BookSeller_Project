import React from "react";
import { Link } from "react-router-dom";
import { Layer, getTheme, FontIcon } from "@fluentui/react";

const theme = getTheme();

const contentStyle = {
  backgroundColor: theme.palette.themePrimary,
  color: theme.palette.white,
  lineHeight: "50px",
};

export default function Header() {
  const content = (
    <div style={contentStyle}>
      <div className="ms-Grid" dir="ltr">
        <div
          className=" ms-Grid-row"
          style={{
            paddingLeft: 32,
            paddingRight: 20,
          }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="header-text"
          >
              <Link to="/cart" className="header-button">
                  <FontIcon iconName="ShoppingCart"></FontIcon>
              </Link>
            Book Store
          </Link>
        </div>
      </div>
    </div>
  );
  return <Layer>{content}</Layer>
}
