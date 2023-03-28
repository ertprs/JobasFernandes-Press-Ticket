import React, { useState, useContext } from "react";
import SocialMediaList from '../../components/SocialMediaList';

import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Link
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import { i18n } from "../../translate/i18n";

import { AuthContext } from "../../context/Auth/AuthContext";
import { system } from "../../config.json";
import logo from '../../assets/logo.png';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundImage: "url(https://nuvem.automatusinf.com.br/apps/files_sharing/publicpreview/fncQPoGiyZnZPB8?file=/&fileId=1496&x=1920&y=1080&a=true)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  paper: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "55px 30px",
    borderRadius: "12.5px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  powered: {
    color: "white"
  }
}));




const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });

  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = e => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <img style={{ margin: "0 auto", height: "80px", width: "100%" }} src={logo} alt="Whats" />
          </div>
          <Typography component="h1" variant="h5">
            {i18n.t("login.title")}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handlSubmit}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label={i18n.t("login.form.email")}
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label={i18n.t("login.form.password")}
              type="password"
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {i18n.t("login.buttons.submit")}
            </Button>
            {/* <Grid container>
						<Grid item>
							<Link
								href="#"
								variant="body2"
								component={RouterLink}
								to="/signup"
							>
								{i18n.t("login.buttons.register")}
							</Link>
						</Grid>
					</Grid> */}
          </form>
          <br></br>
          <div style={{ textAlign: 'center', margin: 0 }}>
            <SocialMediaList style={{ marginBottom: 0 }} />
          </div>
        </div>
        <br />
      </Container>
      <Link color="inherit" href={system.url}>
        {system.name} - CNPJ: 41.646.725/0001-39
      </Link>
      © 2022 - {new Date().getFullYear()}
      {"."}
    </div>
  );
};

export default Login;