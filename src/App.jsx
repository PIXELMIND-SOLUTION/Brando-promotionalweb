import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import DeleteAccount from "./components/DeleteAccount";

const App = () =>{
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/user/delete-account" element={<DeleteAccount/>}/>
    </Routes>
    </>
  )
};

export default App;