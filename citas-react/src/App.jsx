import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./routes/Home"
import Lavadero from "./routes/Lavadero"
import Odonto from "./routes/Odonto"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/odonto" element={<Odonto />}></Route>
        <Route path="/lavadero" element={<Lavadero />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
