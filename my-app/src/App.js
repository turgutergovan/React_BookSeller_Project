import React from "react"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Books from "./pages/Books"
import Header from "./component/Header";
import './App.css';
import BooksCreate from "./pages/BooksCreate";
import BooksEdit from "./pages/BooksEdit";
import Carts from "./pages/Carts";

export default function App() {
  return (
    <BrowserRouter>
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm-1 mx-xl1">
    <Header/>
    </div>
    </div>
    </div>
    <div style={{paddingTop:50}}>
      <Routes>
        <Route exact path="/" element={<Books/>}/>
        <Route path="/book" element={<Books/>}/>
        <Route path="/book/create" element={<BooksCreate />}/>
        <Route path="/book/edit/:id" element={<BooksEdit />}/>
        <Route path="/cart" element={<Carts/>}/>
      </Routes>
    </div>
    </BrowserRouter>

   
  );
}


