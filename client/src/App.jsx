import AppContainer from "./components/AppContainer";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./view/Home";
import Login from "./view/Login";
import ErrorPage from "./view/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddRiddle from "./view/AddRiddle";
import AnswerRiddle from "./view/AnswerRiddle";
import ViewDetails from "./view/ViewDetails";
function App() {
  const location = useLocation();
  const [riddles, setRiddles] = useState([]);

  return (
    <AppContainer setRiddles={setRiddles}>
      <Routes location={location} key={location.pathname}>
        <Route index path="/" element={<Login />} />
        <Route
          index
          path="/riddles/:filter"
          element={<Home riddles={riddles} setRiddles={setRiddles} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            index
            path="/view-answer/:answerId"
            element={<ViewDetails />}
          />
          <Route path="/add-riddle" element={<AddRiddle />} />
          <Route
            path="/answer-riddle/:answerId"
            element={<AnswerRiddle />}
          ></Route>
          <Route index path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
