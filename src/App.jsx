// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Instructions from "./pages/Instructions";
import Combination from "./components/Combination";
import SectionNavigator from "./components/SectionNavigator";
import ResultPage from "./components/result";
import AnalyticsPage from "./pages/AnalyticsPage";
import Context from "./Context/context";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.removeItem("verbalAnswers");
    localStorage.removeItem("quantAnswers");
    localStorage.removeItem("dataAnswers");
  }, []);

  return (
    <Context>
      <Router>
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/selectcombination" element={<Combination />} />
            <Route path="/test/:orderId" element={<SectionNavigator />} />
            <Route path="/test" element={<SectionNavigator />} />
            <Route path="/final" element={<ResultPage />} />
            <Route path="/Analytics" element={<AnalyticsPage />} />
          </Routes>
       
      </Router>
    </Context>
  );
}

export default App;
