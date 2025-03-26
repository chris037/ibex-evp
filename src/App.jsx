import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyles";
import Home from "./pages/Home";
import Register from "./pages/Register";
import EVP from "./pages/EVP";
import EVPRead from "./pages/EVPRead";
import Tasks from "./pages/Tasks";
import EVPVideo from "./pages/EVPVideo";
import Dreamwall from "./pages/Dreamwall";
import ReferPage from "./pages/ReferPage";
import CareerQuizLanding from "./pages/CareerQuizLanding";
import CareerQuiz from "./pages/CareerQuiz";
import Social from "./pages/Social"
import BackButton from "./components/BackButton"; // Import Back Button
import Survey from "./pages/Survey"; // ✅ Import Survey Page



function App() {
  return (
    <Router basename="/evp">
      <GlobalStyle />
      <BackButton /> {/* Add Back Button globally */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/evp" element={<EVP />} />
        <Route path="/read-evp" element={<EVPRead />} /> {/* Add this route */}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/video" element={<EVPVideo />} />
        <Route path="/dreamwall" element={<Dreamwall />} /> {/* ✅ Route for Dreamwall */}
        <Route path="/refer" element={<ReferPage />} />
        <Route path="/career-quiz" element={<CareerQuizLanding />} />
        <Route path="/quiz" element={<CareerQuiz />} />
        <Route path="/social" element={<Social />} /> {/* ✅ Added Social Page */}
        <Route path="/survey" element={<Survey />} /> {/* ✅ Add Survey Route */}
      </Routes>
    </Router>
  );
}

export default App;
