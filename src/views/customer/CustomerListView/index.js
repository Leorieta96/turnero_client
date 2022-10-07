import React, { useContext, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import BedContext from '../../../context/bed/bedContext';
import Results from './Results';
import PacienteContext from '../../../context/paciente/pacienteContext';
import CHContext from '../../../context/clinic_history/CHContext';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const pacienteContext = useContext(PacienteContext);
  const bedContext = useContext(BedContext);
  const chContext = useContext(CHContext);

  const { occupied_beds, loading, getBedOccupied } = bedContext;
  const { selectPaciente } = pacienteContext;
  const { getClinicHistory } = chContext;

  useEffect(() => {
    getBedOccupied();
    // eslint-disable-next-line
  }, [loading]);

  return (
    <Page className={classes.root} title="Internados">
      <Container maxWidth={false}>
        <Results
          beds={occupied_beds}
          selectPaciente={selectPaciente}
          getClinicHistory={getClinicHistory}
        />
      </Container>
    </Page>
  );
};

export default CustomerListView;
