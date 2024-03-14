import { BrowserRouter,Routes,Route } from "react-router-dom"
import Page from "./components/LandingPage/Page"
import From from "./components/FromPage/From"
import FinalPage from "./components/Resposnse/FinalPage.jsx"
import "./index.css"
function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Page/>}/>
              <Route path="/student_details/:register" element={<From/>}/>
              <Route path="/Response" element={<FinalPage/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
