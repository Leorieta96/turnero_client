import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import indigo from '@material-ui/core/colors/indigo';

const TableCellCustom = withStyles(theme => ({
  head: {
    backgroundColor: indigo.A400,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export default TableCellCustom;
