import React, { useContext, useEffect } from 'react';
import { Card, CardActionArea, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import AuthContext from 'src/context/auth/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Instructions = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { authenticated, authenticatedUser } = authContext;

  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <Page className={classes.root} title="Instrucciones">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3} />
        <Grid item>
          <Card>
            <CardActionArea>
              <CardContent>
                {authenticated ?
                  <>
                    <Typography gutterBottom variant="h1" component="h1">
                      Instrucciones
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h5">
                      1. Selecciona el area
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h5">
                      2. Elige el dia
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h5">
                      3. Ingrese horario de inicio y fin, y cantidad de turnos. Guarde
                    </Typography>
                  </> :
                  <>
                    <Typography gutterBottom variant="h1" component="h1">
                      Instrucciones
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h5">
                      1. Selecciona el area para la que quieres solicitar un turno
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h5">
                      2. Elige el dia, a continuacion se desplegaran los horarios disponibles.
                      Selecciona horario
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h5">
                      3. Completa con tus datos el formulario y enviar datos
                    </Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">
                      NOTA: no necesitas imprimir el turno, puedes sacar captura.
                    </Typography>
                  </>}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </Page>
  );
};

export default Instructions;
