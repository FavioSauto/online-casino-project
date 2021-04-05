import { useState, useEffect } from "react";

// Material
import { makeStyles } from "@material-ui/core/styles";

// Components
import Header from "./components/Header";
import Content from "./components/Content"
import Footer from "./components/Footer";

import SimpleModal from "./components/Modal";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateRows: "65px 1fr auto",
  },
}));

function App() {
  // States
  const [balance, setBalance] = useState(100);
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [playedNumbers, setPlayedNumbers] = useState([])

  // Effects
  useEffect(() => {
    const moneyBalance = parseInt(localStorage.getItem("moneyBalance"));
    const userLoggedIn = localStorage.getItem("isLogin");
    const userName = localStorage.getItem("username");

    if (!moneyBalance) {
      setBalance(100);
    } else {
      setBalance(moneyBalance);
    }

    if (userLoggedIn === "T") {
      setIsLogin(true);
      setUsername(userName);
    } else {
      setIsLogin(false);
      setUsername("");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("moneyBalance", balance);
  }, [balance]);

  useEffect(() => {
    isLogin ? localStorage.setItem("isLogin", "T") : localStorage.setItem("isLogin", "F");

    if (!isLogin) {
      localStorage.removeItem("username");
    } else {
      localStorage.setItem("username", username);
    }
  }, [isLogin]);

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
      <Content numbersPlayed={playedNumbers}>
        <SimpleModal setPlayedNumbers={setPlayedNumbers} balance={balance} setBalance={setBalance}/>
      </Content>
      <Footer />
    </div>
  );
}

export default App;
