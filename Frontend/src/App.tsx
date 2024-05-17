import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./Pages/LandingPage/Page";
import From from "./Pages/FromPage/From";
import FinalPage from "./Pages/Resposnse/FinalPage.jsx";
import "./index.css";
import Nav from "./Pages/header/nav.tsx";
import Loader from "./components/Loader"
function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/student_details/:register" element={<From />} />
          <Route path="/Response" element={<FinalPage />} />
          <Route path="/loader" element={<Loader/>} />
          <Route path="*" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
