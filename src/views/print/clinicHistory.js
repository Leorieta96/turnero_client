import React, { Fragment, useEffect, useRef, useState } from 'react';
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
  Container,
  ListItem,
  ListItemText
} from '@material-ui/core';
import Page from 'src/components/Page';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Epicrisis = ({ className, ...rest }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const [{ activities, historysCurrent, hisopados, diagnostics, paciente, treatments }] = useState(JSON.parse(localStorage.getItem('clinicHistory')));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    if (localStorage.getItem('clinicHistory') === null) {
      window.close();
    }
    window.print();
    return () => {
      localStorage.removeItem('clinicHistory');
    };
  }, []);

  return (
    <Page className={classes.root} title="Imprimir Historia Clinica">
      <Container
        maxWidth="lg"
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Box m={4} ref={componentRef}>
          <Card>
            <CardHeader
              subheader="Centro de Salud Mama Antula"
              title="Historia Clinica"
              titleTypographyProps={{ variant: 'h1' }}
              style={{ textAlign: 'center' }}
            />
            <Divider />
            <CardHeader
              title="Datos del Paciente"
              titleTypographyProps={{ variant: 'h3' }}
            />
            <CardContent>
              <Box mb={8}>
                <Grid container spacing={3}>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Nombre y Apellido
                    </Typography>
                    <Typography>{paciente.name}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      N° de documento
                    </Typography>
                    <Typography>{paciente.dni}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Domicilio
                    </Typography>
                    <Typography>{paciente.domicile}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Localidad
                    </Typography>
                    <Typography>{paciente.location}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Telefono
                    </Typography>
                    <Typography>{paciente.phone}</Typography>
                    <Typography>{paciente.family_phone}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Cobertura Social
                    </Typography>
                    <Typography>{paciente.social_coverage}</Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
              <Grid m={2} container spacing={3} direction="column">
                <Grid item container spacing={6} wrap="nowrap" justify="center">
                  {activities.map(activity => (
                    <Grid key={activities._id} className={classes.item} item md={4} sm={6} xs={12}>
                      <Typography color="textPrimary" gutterBottom variant="h6">
                        {`Fecha de ${activity.type}:
                        ${moment(activity.date).format('DD/MM/YYYY')}`}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                <Grid item container sm={12} spacing={2} justify="center">
                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Diagnosticos
                    </Typography>
                    {diagnostics.map((d, i) => (
                      <Fragment key={d._id}>
                        <ListItem
                          divider={i < diagnostics.length - 1}
                        >
                          <ListItemText
                            primary={
                              <Box mb={1}>
                                <Typography variant="h5">
                                  {moment(d.date).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                                <Typography variant="h4">
                                  {d.description}
                                </Typography>
                              </Box>
                            }
                            secondary={`Codigo: ${d.code}
                                ${d.code_0 ? d.code_0 : ''}
                                ${d.code_1 ? d.code_1 : ''}
                                ${d.code_2 ? d.code_2 : ''}
                                ${d.code_3 ? d.code_3 : ''}
                                ${d.code_4 ? d.code_4 : ''}
                              `}
                          />
                        </ListItem>
                      </Fragment>
                    ))}
                  </Grid>
                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Antecedendes de Enfermedad Actual
                    </Typography>
                    {historysCurrent.map((hc, i) => (
                      <Fragment key={hc._id}>
                        <ListItem
                          divider={i < historysCurrent.length - 1}
                        >
                          <ListItemText
                            primary={
                              <Box mb={1}>
                                <Typography variant="h5">
                                  {moment(hc.date).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                                <Typography variant="h6">
                                  {`${hc.disease}\t${hc.observations}`}
                                </Typography>
                              </Box>
                            }
                            secondary={`Dr/a ${hc.professional_name.name}`}
                          />
                        </ListItem>
                      </Fragment>
                    ))}
                  </Grid>
                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Tratamientos
                    </Typography>
                    {treatments.map((t, i) => (
                      <Fragment key={t._id}>
                        <ListItem
                          divider={i < treatments.length - 1}
                        >
                          <ListItemText
                            primary={
                              <Box mb={1}>
                                <Typography variant="h5">
                                  {moment(t.date).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                                <Typography variant="h6">
                                  {`${t.name}\t${t.observations}`}
                                </Typography>
                              </Box>
                            }
                            secondary={`Dr/a ${t.professional_name.name}`}
                          />
                        </ListItem>
                      </Fragment>
                    ))}
                  </Grid>
                  <Grid className={classes.item} item xs={10}>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Hisopados
                    </Typography>
                    {hisopados.map((h, i) => (
                      <Fragment key={h._id}>
                        <ListItem
                          divider={i < hisopados.length - 1}
                        >
                          <ListItemText
                            primary={
                              <Box mb={1}>
                                <Typography variant="h5">
                                  {moment(h.date).format('DD/MM/YYYY HH:mm')}
                                </Typography>
                                <Typography variant="h4">
                                  {`${h.result}`}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      </Fragment>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
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
