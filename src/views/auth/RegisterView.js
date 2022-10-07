import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import AuthContext from '../../context/auth/authContext';
import tokenAuth from '../../config/tokenAuth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const {
    message,
    authenticated,
    registerUser,
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
      navigate('/app/dashboard', { replace: true });
    }
    if (message) {
      handleOpen();
    }
    //eslint-disable-next-line
  }, [message, authenticated]);

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              dni: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: '',
              role: ''
            }}
            validationSchema={Yup.object().shape({
              dni: Yup.string()
                .min(7)
                .max(8)
                .required('N° de documento es requerido'),
              firstName: Yup.string()
                .max(255)
                .required('Nombre es requerido'),
              lastName: Yup.string()
                .max(255)
                .required('Apellido es requerido'),
              password: Yup.string()
                .max(255)
                .required('Contraseña es requierida'),
              confirmPassword: Yup.string()
                .max(255)
                .required('Repetir Contraseña'),
              role: Yup.string()
                .max(255)
                .required()
            })}
            onSubmit={values => {
              values = {
                ...values,
                name: `${values.firstName} ${values.lastName}`
              };
              registerUser(values);
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
                    Crear nueva cuenta
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Usa tu DNI para crear una cuenta
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Nombre"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Apellido"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
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
                  value={values.dni}
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
                <TextField
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Repetir contraseña"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmPassword}
                  variant="outlined"
                />
                <RadioGroup
                  aria-label="quiz"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="medico"
                    control={<Radio />}
                    label="Médico/a"
                  />
                  <FormControlLabel
                    value="enfermero"
                    control={<Radio />}
                    label="Enfermero/a"
                  />
                </RadioGroup>
                {/* <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box> */}
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Regristarme
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Ya tengo cuenta
                  <Link component={RouterLink} to="/login" variant="h6">
                    Iniciar Sesión
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

export default RegisterView;
