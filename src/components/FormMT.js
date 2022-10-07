import React from 'react';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Grid
} from '@material-ui/core';
import { Formik } from 'formik';

const Form = ({
  loading,
  handleSubmit = () => {}
}) => {
  return (
    <Formik
      initialValues={{
        dni: '',
        code: ''
      }}
      validationSchema={Yup.object().shape({
        dni: Yup.string()
          .min(7, 'Minimo 7 caracteres')
          .max(8, 'Maximo 8 caracteres')
          .required('DNI es requerido'),
        code: Yup.string()
          .max(255)
          .required('codigo es requerido'),
      })}
      onSubmit={values => handleSubmit(values)}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container justifyContent="center" spacing={1}>
            <Grid item md={6} sm={12}>
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
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                error={Boolean(touched.code && errors.code)}
                fullWidth
                helperText={touched.code && errors.code}
                label="Codigo de turno"
                margin="normal"
                name="code"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.code}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box my={2}>
            <Button
              color="primary"
              disabled={loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              GUARDAR
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
