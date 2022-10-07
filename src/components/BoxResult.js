import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  CardHeader,
  Grid
} from '@material-ui/core';

const BoxResult = ({
  data,
  handleClick = () => { },
}) => {
  const [selected, setSelected] = useState();
  const handleSelected = (value, key) => {
    handleClick(value, key);
    setSelected(key);
  };

  return (
    <>
      <CardHeader
        title={'Turnos disponibles'}
        titleTypographyProps={{ variant: 'h4' }}
      />
      <ButtonGroup color="primary">
        <Grid container>
          {data.length > 0 && data.map((value, key) => (
            <Grid item>
              <Button key={value.id} onClick={() => handleSelected(value, key)} variant={selected === key ? 'contained' : 'outlined'}>{value.time}</Button>
            </Grid>

          ))}
        </Grid>
      </ButtonGroup>
    </>
  );
};

/* BoxResult.propTypes = {
  className: PropTypes.string,
}; */

export default BoxResult;
