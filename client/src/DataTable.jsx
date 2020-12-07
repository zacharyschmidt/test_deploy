import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});




export default function DataTable(props) {
  const classes = useStyles();
  const data = props.data
  const name = props.name
  const time = props.time
  const units = props.units

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{`${time}`}</TableCell>
            <TableCell align="right">{`${name} (${units})`}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(1).map((element) => (
            <TableRow key={element[0]}>
              <TableCell component="th" scope="row">
                {element[0]}
              </TableCell>
              <TableCell align="right">{element[1]}</TableCell>
       
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}