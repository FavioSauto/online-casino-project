import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function Footer() {
  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            ©2021 Online Casino all rights reserved.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
