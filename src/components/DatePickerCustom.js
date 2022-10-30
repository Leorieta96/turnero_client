import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const DatePickerCustom = ({
  disablePast = true,
  handleDate = () => { }
}) => {
  const [date, changeDate] = useState(new Date());

  const handleChangeDate = value => {
    handleDate(value);
    changeDate(value);
  };

  return (
    <DatePicker
      autoOk
      orientation="landscape"
      variant="static"
      openTo="date"
      value={date}
      disablePast={disablePast}
      onChange={handleChangeDate}
    />
  );
};

DatePickerCustom.propTypes = {};

export default DatePickerCustom;
