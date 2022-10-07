import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
  Snackbar,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import AuthContext from '../../context/auth/authContext';
import tokenAuth from '../../config/tokenAuth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100vh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const {
    message,
    authenticated,
    loading,
    login,
    authenticatedUser
  } = authContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // En caso de que el usuario se haya autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    tokenAuth(token);
    if (token) {
      authenticatedUser();
    }
    if (authenticated) {
      navigate('/app/instructions', { replace: true });
    }
    if (message) {
      handleOpen();
    }
    //eslint-disable-next-line
  }, [message, authenticated]);

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>

        <Container maxWidth="sm">
          <Formik
            initialValues={{
              dni: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              dni: Yup.string()
                .min(7, 'Minimo 7 caracteres')
                .max(8, 'Maximo 8 caracteres')
                .required('DNI es requerido'),
              password: Yup.string()
                .max(255)
                .required('Contraseña es requerido')
            })}
            onSubmit={(values, { setSubmitting }) => {
              login(values);
              setSubmitting(false);
              //navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Iniciar Sesión
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Iniciar sesión para acceder al sistema
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.dni && errors.dni)}
                  fullWidth
                  helperText={touched.dni && errors.dni}
                  label="N° de documento"
                  margin="normal"
                  name="dni"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Iniciar Sesión
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  No tengo cuenta
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
