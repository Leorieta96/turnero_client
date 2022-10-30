import React, { useContext, useEffect, useState } from 'react';
import { Grid, makeStyles, Snackbar, Typography, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import AuthContext from 'src/context/auth/authContext';
import XrayContext from 'src/context/xray/xrayContext';
import FormMT from 'src/components/FormMT';
import Result from './result';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MisTurnos = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const xrayContext = useContext(XrayContext);
  const [open, setOpen] = useState(false);
  const { authenticatedUser, message } = authContext;

  const { turnResult, loading, getTurnResult } = xrayContext;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = ({ code, dni }) => {
    getTurnResult({ code, dni });
    /*
      con el code y el dni pedir a la api el dia con el turno,
      en la api buscar dia por code y filtar el turno
      TODO
      instrucciones
    */
  };

  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <Page className={classes.root} title="Rayos">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={loading} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <CircularProgress />
      </Snackbar>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12}>
          <Typography variant="h2">
            Mis turnos
          </Typography>
        </Grid>
        {turnResult === null ?
          <Grid item xs={12}>
            <FormMT loading={loading} handleSubmit={handleSubmit} />
          </Grid>
          :
          <Grid item xs={12}>
            <Result data={turnResult} />
          </Grid>}
      </Grid>
    </Page>
  );
};

export default MisTurnos;
