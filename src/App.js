import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import MovieRouter from "./routes/MovieRouter";

function App() {
  return (
    <>
      <div className="main">
        <div className="nav_bar">
          <Navbar />
        </div>
        <div className="m_body">
            <Routes>
              <Route path="*" element={<MovieRouter />} />
            </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
