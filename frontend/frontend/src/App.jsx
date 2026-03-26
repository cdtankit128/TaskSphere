import { useEffect, useState } from "react";
import { getHello } from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getHello().then(setMessage);
  }, []);

  return <h1>{message}</h1>;
}

export default App;
