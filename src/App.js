import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      datosCargados: false,
    }


    function hacerFetch(){
      fetch('http://localhost/srs/proyecto/controllers/getBibliotecas.php')
        .then(res => res.json())
        .then(json => {
          this.setState({
            items: json,
            datosCargados: true,
          })
          console.log(json)
          console.log(this.state.items)
        });
      return this.state
    }


  }





render() {
  return (


    this.state.datosCargados ?

      <Paper>

        <table>
          <TableHead>
            <TableRow>
              <TableCell align="center">IdDependencia</TableCell>
              <TableCell align="center">Dependencia</TableCell>
              <TableCell align="center">Delegacion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map((item, i) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row" align="center">{item.idDependencia}</TableCell>
                  <TableCell component="th" scope="row" align="center">{item.dependencia}</TableCell>
                  <TableCell component="th" scope="row" align="center">{item.delegacion}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </table>
      </Paper>
      : <Button variant="contained" color="secondary" align="center" onClick="hacerFetch()">Cargar Tabla</Button>
  )
}
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

export default App;


