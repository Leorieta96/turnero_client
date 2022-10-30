import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
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

const Result = ({ data }) => {
  const classes = useStyles();
  const { date, code, turns } = data;
  const { id_paciente, time } = turns.length ? turns[0] : { id_paciente: false, time: false };
  return (
    <Container
      maxWidth="md"
    >
      <Box m={4}>
        {id_paciente ?
          <Card>
            <CardHeader
              title="Datos del Paciente"
              titleTypographyProps={{ variant: 'h3' }}
            />
            <CardContent>
              <Box mb={8}>
                <Grid container spacing={3}>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Nombre completo
                    </Typography>
                    <Typography>{id_paciente.name}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      N° de documento
                    </Typography>
                    <Typography>{id_paciente.dni}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Telefono
                    </Typography>
                    <Typography>{id_paciente.phone}</Typography>
                  </Grid>
                  <Grid className={classes.item} item xs={4}>
                    <Typography color="textPrimary" gutterBottom variant="h6">
                      Cobertura Social
                    </Typography>
                    <Typography>{id_paciente.social_coverage}</Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
              <Grid m={2} container spacing={3} direction="column">
                <Grid item container spacing={6} wrap="nowrap" justify="center">
                  <Grid className={classes.item} item md={4} sm={6} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      Dia y Hora
                    </Typography>
                    <Typography variant="h4">{`${moment(date).format('DD/MM/YYYY')} ${time}`}</Typography>
                  </Grid>
                  <Grid className={classes.item} item md={4} sm={6} xs={12}>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      Codigo
                    </Typography>
                    <Typography variant="h4">{code}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
          </Card>
          :
          <>
            <Typography color="h2" gutterBottom variant="h3">
              No tienes turno asignado
            </Typography>
            <Typography color="h5" gutterBottom>
              o verifica los datos ingresados
            </Typography>
          </>}
      </Box>
    </Container>
  );
};

Result.propTypes = {
  data: PropTypes.object
};

export default Result;
