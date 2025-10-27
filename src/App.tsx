import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
