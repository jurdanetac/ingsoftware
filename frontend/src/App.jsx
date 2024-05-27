import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import {
  HashRouter as Router,
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
      <Router basename="/">
        <Routes>
          <Route
            path="/login/"
            element={
              session ? (
                <Navigate replace to="/" />
              ) : (
                <Login setSession={setSession} />
              )
            }
          />
          <Route
            path="/"
            element={
              session ? (
                <Home user={"Test"} logout={logout} />
              ) : (
                <Navigate replace to="/login/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
