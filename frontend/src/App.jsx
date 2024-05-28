import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import SignIn from "./components/SignIn";

import { useState, useEffect } from "react";
import apiService from "./services/api.js";

const App = () => {
  // wether user is logged in or not
  const [session, setSession] = useState(null);

  /*
   * sesssion = {
   *  token: token,
   *  username: "user",
   *  name: "name",
   * }
   * */

  // wait for the server to wake up
  useEffect(() => {
    apiService.ping().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      {session ? (
        <h1>Bienvenido {session.name}</h1>
      ) : (
        <SignIn setSession={setSession} />
      )}
    </div>
  );
};

export default App;
