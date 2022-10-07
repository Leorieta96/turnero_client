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
        name: '',
        phone: '',
        social_coverage: ''
      }}
      validationSchema={Yup.object().shape({
        dni: Yup.string()
          .min(7, 'Minimo 7 caracteres')
          .max(8, 'Maximo 8 caracteres')
          .required('DNI es requerido'),
        name: Yup.string()
          .max(255)
          .required('Nombre es requerido'),
        phone: Yup.number().required('El telefono es requerido'),
        social_coverage: Yup.string()
          .max(100)
          .required('Cobertura Social es requerido')
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
            <Grid item xs={12} sm={12} md={2}>
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
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Nombre completo"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <TextField
                error={Boolean(touched.phone && errors.phone)}
                fullWidth
                helperText={touched.phone && errors.phone}
                label="Teléfono"
                margin="normal"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                error={Boolean(
                  touched.social_coverage && errors.social_coverage
                )}
                fullWidth
                helperText={
                  touched.social_coverage && errors.social_coverage
                }
                label="Cobertura Social"
                margin="normal"
                name="social_coverage"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.social_coverage}
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
