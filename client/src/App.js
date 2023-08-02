import React from "react";
import "./App.css";
import Create from "./compoents/Create";
import Read from "./compoents/Read";
import Edit from "./compoents/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/"  element={<Create />} ></Route>
      <Route path="/Read" element={<Read />} ></Route>
      <Route path="/Edit/:id" element={<Edit />} ></Route>
    </Routes>
    </BrowserRouter>

      
    </>
  );
};

export default App;
