import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import apiService from "./services/api.js";

const App = () => {
  const [session, setSession] = useState(null);

  // wait for the server to wake up
  useEffect(() => {
    apiService.ping().then((res) => {
      console.log(res);
    });
  }, []);

  const logout = () => {
    setSession(null);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/ingsoftware/login/"
            element={
              session ? (
                <Navigate replace to="/ingsoftware/" />
              ) : (
                <Login setSession={setSession} />
              )
            }
          />
          <Route
            path="/ingsoftware/"
            element={
              session ? (
                <Home user={"Test"} logout={logout} />
              ) : (
                <Navigate replace to="/ingsoftware/login/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
