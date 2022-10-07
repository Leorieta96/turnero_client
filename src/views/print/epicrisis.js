import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const Epicrisis = ({ className, ...rest }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const [epicrisis] = useState(JSON.parse(localStorage.getItem('epicrisis')));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    if (localStorage.getItem('epicrisis') === null) {
      window.close();
    }
    return () => {
      localStorage.removeItem('epicrisis');
    };
  }, []);

  return (
    <Page className={classes.root} title="Epicrisis">
      <Container
        maxWidth="lg"
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Box m={4} ref={componentRef}>
          <Card>
            <CardHeader
              subheader="Centro de Salud Mama Antula"
              title="EPICRISIS"
              titleTypographyProps={{ variant: 'h1' }}
              style={{ textAlign: 'center' }}
            />
            <Divider />
            <CardHeader
              title="Datos del Paciente"
              titleTypographyProps={{ variant: 'h3' }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Nombre y Apellido
                  </Typography>
                  <Typography>{epicrisis.paciente.name}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    N° de documento
                  </Typography>
                  <Typography>{epicrisis.paciente.dni}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Domicilio
                  </Typography>
                  <Typography>{epicrisis.paciente.domicile}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Localidad
                  </Typography>
                  <Typography>{epicrisis.paciente.location}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Telefono
                  </Typography>
                  <Typography>{epicrisis.paciente.phone}</Typography>
                  <Typography>{epicrisis.paciente.family_phone}</Typography>
                </Grid>
                <Grid className={classes.item} item xs={4}>
                  <Typography color="textPrimary" gutterBottom variant="h6">
                    Cobertura Social
                  </Typography>
                  <Typography>{epicrisis.paciente.social_coverage}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={3} direction="column">
                <Grid item container spacing={6} wrap="nowrap" justify="center">
                  <Grid className={classes.item} item md={4} sm={6} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Fecha de ingreso:
                      {new Date(epicrisis.date_admission)
                        .toJSON()
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('/')}
                    </Typography>
                  </Grid>
                  <Grid className={classes.item} item md={4} sm={6} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Fecha de egreso:
                      {new Date(epicrisis.date_egress)
                        .toJSON()
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('/')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item sm={12} container spacing={2} justify="center">
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      Motivo
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      {epicrisis.action}
                    </Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      Diagnostico Presuntivo
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      {epicrisis.presumptive_diagnosis}
                    </Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h4">
                      Diagnostico Final
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      {epicrisis.final_diagnosis}
                    </Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      Tratamiento
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      {epicrisis.treatment}
                    </Typography>
                  </Grid>

                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      Tratamiento Ambulatorio
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      {epicrisis.treatment_outpatient}
                    </Typography>
                  </Grid>

                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      Observaciones
                    </Typography>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      {epicrisis.observations}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" p={2}>
                {`Dr/a ${epicrisis.user.name}`}
              </Box>
            </CardContent>
            <Divider />
          </Card>
        </Box>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handlePrint}>
            Imprimir
          </Button>
        </Box>
      </Container>
    </Page>
  );
};

Epicrisis.propTypes = {
  className: PropTypes.string
};

export default Epicrisis;
