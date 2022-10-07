import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  Button,
  CardContent
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  beds,
  selectPaciente,
  getClinicHistory,
  ...rest
}) => {
  const classes = useStyles();
  const [push, setPush] = useState(false);

  const handleClick = paciente => {
    selectPaciente(paciente);
    getClinicHistory(paciente._id);
    setPush(true);
  };

  return push ? (
    <Navigate to="/app/dashboard" />
  ) : (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <PerfectScrollbar>
          <Box height="auto" position="relative">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cama</TableCell>
                  <TableCell>Sector</TableCell>
                  <TableCell>Nombre del Paciente</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Teléfono Familiar</TableCell>
                  <TableCell>Historia Clinica</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beds.length !== 0 ? (
                  beds.map(bed => (
                    <TableRow hover key={bed._id}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="h3">
                            {bed.number}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="h5">
                            {bed.sector}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{bed.id_paciente.name}</TableCell>
                      <TableCell>{bed.id_paciente.phone}</TableCell>
                      <TableCell>{bed.id_paciente.family_phone}</TableCell>
                      <TableCell>
                        <Box display="flex">
                          <Button
                            color="primary"
                            endIcon={<ArrowRightIcon />}
                            size="small"
                            variant="outlined"
                            onClick={e => handleClick(bed.id_paciente)}
                          >
                            Ver
                          </Button>
                        </Box>
                      </TableCell>
                      {/*<TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow hover>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="h6">
                          No hay pacientes Internados
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  beds: PropTypes.array.isRequired,
  selectPaciente: PropTypes.func,
  getClinicHistory: PropTypes.func
};

export default Results;
