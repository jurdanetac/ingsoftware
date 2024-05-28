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
   *  id,
   *  token: token,
   *  user: {
   *   id: 1,
   *   username: "user"
   *   }
   * }
   * */

  // wait for the server to wake up
  useEffect(() => {
    apiService.ping().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App">{session ? <h1>Bienvenido</h1> : <SignIn />}</div>
  );
};

export default App;
