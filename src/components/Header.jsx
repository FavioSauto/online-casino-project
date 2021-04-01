import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "white",
  },
  title: {
    color: "black",
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  avatar: {
    background: "#2E3B55",
  },
  loginButton: {
    marginLeft: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: theme.spacing(2),
    width: "40px",
    height: "40px",
  },
  balance: {
    color: "black",
  },
  popOver: {
    padding: theme.spacing(2),
  },
}));

function Header({ balance, isLogin, setIsLogin, username, setUsername }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarLetter, setAvatarLetter] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogin = (event) => {
    setAvatarLetter(username[0].toUpperCase());
    setIsLogin(true);
  };

  const handleLogout = (event) => {
    setAvatarLetter("");
    setIsLogin(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Online Casino
          </Typography>
          <Typography color="inherit" className={classes.balance}>
            $ {balance.toFixed(2)}
          </Typography>

          {isLogin ? (
            <>
              <Button
                aria-describedby={id}
                className={classes.logoutButton}
                onClick={handleClick}
              >
                <Avatar className={classes.avatar}>{avatarLetter}</Avatar>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Button
                  aria-describedby={id}
                  className={classes.loginButton}
                  variant="contained"
                  onClick={handleLogout}
                  color="primary"
                >
                  Log out
                </Button>
              </Popover>
            </>
          ) : (
            <>
              <Button
                aria-describedby={id}
                className={classes.loginButton}
                variant="contained"
                onClick={handleClick}
                color="primary"
              >
                Login
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div className={classes.popOver}>
                  <FormControl>
                    <InputLabel htmlFor="loginInput">Name</InputLabel>
                    <Input
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      id="loginInput"
                    />

                    <Button
                      aria-describedby={id}
                      className={classes.loginButton}
                      variant="contained"
                      onClick={handleLogin}
                      color="primary"
                    >
                      Login
                    </Button>
                  </FormControl>
                </div>
              </Popover>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
