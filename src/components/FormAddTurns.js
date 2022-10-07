import React from 'react';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Grid
} from '@material-ui/core';
import { Formik } from 'formik';

const FormAddTurns = ({
  handleSubmit = () => { }
}) => {
  return (
    <Formik
      initialValues={{
        start: '',
        end: '',
        slot: '',
      }}
      validationSchema={Yup.object().shape({
        start: Yup.string()
          .required('Hora de inicio es requerido'),
        end: Yup.string()
          .required('Hora de fin es requerido'),
        slot: Yup.number().required('Cantidad es requerida')
      })}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm({
          values: {
            start: '',
            end: '',
            slot: '',
          },
        });
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
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container justifyContent="center" spacing={1}>
            <Grid item>
              <TextField
                error={Boolean(touched.start && errors.start)}
                fullWidth
                helperText={touched.start && errors.start}
                label="Hora de inicio"
                margin="normal"
                name="start"
                onBlur={handleBlur}
                onChange={handleChange}
                type="time"
                value={values.start}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                error={Boolean(touched.end && errors.end)}
                fullWidth
                helperText={touched.end && errors.end}
                label="Hora de fin"
                margin="normal"
                name="end"
                onBlur={handleBlur}
                onChange={handleChange}
                type="time"
                value={values.end}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                error={Boolean(touched.slot && errors.slot)}
                fullWidth
                helperText={touched.slot && errors.slot}
                label="Cantidad de turnos"
                margin="normal"
                name="slot"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.slot}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box my={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
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

export default FormAddTurns;
