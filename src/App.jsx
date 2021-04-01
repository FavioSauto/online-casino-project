import { useState, useEffect } from "react";

// Material
import { makeStyles } from "@material-ui/core/styles";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateRows: "65px 1fr 65px",
  },
}));

function App() {
  // States
  const [balance, setBalance] = useState(100);
  const [isLogin, setIsLogin] = useState(null);
  const [username, setUsername] = useState("");

  // Effects
  useEffect(() => {
    const moneyBalance = parseInt(localStorage.getItem("moneyBalance"));
    const userLoggedIn = Boolean(localStorage.getItem("isLogin"));
    const userName = localStorage.getItem("username");

    if (!moneyBalance) {
      setBalance(100);
    } else {
      setBalance(moneyBalance);
    }

    if (userLoggedIn === "false" || userLoggedIn === false || userName === "") {
      setIsLogin(false);
      setUsername("");
    } else if (userLoggedIn === "true" || userLoggedIn === true) {
      setIsLogin(true);
      setUsername(userName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("moneyBalance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header
        balance={balance}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        username={username}
        setUsername={setUsername}
      />
      <div></div>
      <Footer />
    </div>
  );
}

export default App;
