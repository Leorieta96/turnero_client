import React, { useContext, useEffect, useState } from 'react';
import { CardHeader, Grid, ListItem, ListItemText, makeStyles, Snackbar, List, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import SERVICES, { SERVICE_NAME } from 'src/utils/services';
import AuthContext from 'src/context/auth/authContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import XrayContext from 'src/context/xray/xrayContext';
import DatePickerCustom from 'src/components/DatePickerCustom';
import BoxResult from 'src/components/BoxResult';
import Form from 'src/components/Form';
import FormAddTurns from 'src/components/FormAddTurns';
import moment from 'moment';
import Result from './result';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const XrayView = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const xrayContext = useContext(XrayContext);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [viewForm, setViewForm] = useState(false);
  const [dateAdmin, setDateAdmin] = useState(null);
  const [turnCurrent, setTurn] = useState(null);
  const { user, authenticated, authenticatedUser, message } = authContext;
  const [service, setService] = useState(window.location.pathname.split('/')[2]);

  const { day, turn, loading, turns, addDay, getDay, saveTurn } = xrayContext;

  const handleDate = (value) => {
    setDate(value);
    setTurn(null);
    getDay({
      date: value.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
      id_service: SERVICES[service]
    });
  };

  const handleDateAdmin = (value) => {
    setDateAdmin(value.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }));
    getDay({
      date: value.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
      id_service: SERVICES[service]
    });
    setViewForm(moment().isSameOrBefore(value, 'day'));
  };

  const handleTurn = (value) => {
    setTurn(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    saveTurn({ day, turn: turnCurrent, paciente: values });
  };

  const handleSubmitAdmin = ({ start, end, slot }) => {
    const a = new Date().setHours(start.split(':')[0], start.split(':')[1]);
    const b = new Date().setHours(end.split(':')[0], end.split(':')[1]);
    const c = (b - a) / slot;
    const turnsAux = [];
    let turnAux = a;
    while (turnAux <= b && `${new Date(turnAux).getHours()}:${new Date(turnAux).getMinutes()}` !== `${new Date(b).getHours()}:${new Date(b).getMinutes()}`) {
      turnsAux.push({ time: `${new Date(turnAux).getHours()}:${new Date(turnAux).getMinutes()}` });
      turnAux += c;
    }
    addDay({ date: dateAdmin, turns: turnsAux, id_service: SERVICES[service] });
  };

  useEffect(() => {
    authenticatedUser();
  }, []);

  useEffect(() => {
    setService(window.location.pathname.split('/')[2]);
  }, [window.location.pathname]);

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
        <CardHeader
          title={`Turnos para ${SERVICE_NAME[service]}`}
          titleTypographyProps={{ variant: 'h3' }}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {(user && authenticated) ?
            <>
              <Grid item md={5} sm={8} xs={12}>
                <DatePickerCustom
                  disablePast={false}
                  handleDate={handleDateAdmin}
                />
              </Grid>
              {turns &&
                <>
                  <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <List>
                    {turns.map((turn) => (
                      <ListItem key={turn._id}>
                        <ListItemText
                          primary={
                            <Typography variant="h2">
                              {`${turn.time} - ${turn.id_paciente ? turn.id_paciente.name : 'LIBRE'}`}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="h4">
                              {`${turn.id_paciente ? turn.id_paciente.dni : ''} - ${turn.id_paciente ? turn.id_paciente.social_coverage : ''}`}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </>}
              {viewForm &&
                <Grid item md={5} sm={8} xs={12}>
                  <FormAddTurns handleSubmit={handleSubmitAdmin} />
                </Grid>}
            </>
            : turn ?
              <Grid item>
                <Result data={turn} />
              </Grid>
              :
              <>
                <Grid item md={5} sm={8} xs={12}>
                  <DatePickerCustom
                    handleDate={handleDate}
                  />
                </Grid>
                <Grid item>
                  <BoxResult data={turns} handleClick={handleTurn} />
                </Grid>
                <Grid item>
                  {turnCurrent &&
                    <>
                      <CardHeader
                        title={'Completa con tus datos'}
                        titleTypographyProps={{ variant: 'h4' }}
                      />
                      <Form handleSubmit={handleSubmit} loading={loading} />
                    </>}
                </Grid>
              </>}
        </MuiPickersUtilsProvider>
      </Grid>
    </Page>
  );
};

export default XrayView;
