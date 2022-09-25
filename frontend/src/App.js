import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/authenticate" element={<AuthenticationPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
