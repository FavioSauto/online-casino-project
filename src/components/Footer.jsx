import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'sticky',
    bottom: '0'
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <AppBar component="footer" position="static" color="white">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              ©2021 Online Casino all rights reserved.
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Footer;
