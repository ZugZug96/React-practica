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

//Agregar hoja de estilos
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      datosCargados: false,
    };
    this.setState = this.setState.bind(this);
  }

  /* Las funciones se suelen poner antes del método render, no es necesario ponerles
  la palabra "function" */

  hacerFetch() {
    fetch('http://localhost/srs/proyecto/controllers/getBibliotecas.php')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
          datosCargados: true
        })
        console.log(json)
        console.log(this.state.items)
      });
    /* return this.state - No es necesario retornar el state, es algo asi como una variable
    global, así que con el setState nos basta y nos sobra */
  }

  //Si pusieramos otra función iría aquí mismo, arriba del render
  mandarAlert() {
    alert("Me la como toda porque aún no estoy mandando el fetch")
  }



  render() {
    return (
      /* Dentro del return solo puede haber un elemento padre que encapsule todo,
         dentro de este elemento padre podemos meter todos los elementos que 
         nos salgan del culo */
      <div className="container"> {/* Yo suelo usar clases de CSS porque se inyectan, y la pagina no tiene que recargarse */}
        {/* No era mala idea poner el botón cuando las cosas no estuvieran cargadas,
        pero y si tienes que mostrar 40 botones?, no podras regresarlos todos
        en el operador ternario */}

        {/* En el onClick tienes que mandar la función literalmente, hace rato estabamos mandando un string */}
        <Button variant="contained" color="secondary" align="center" onClick={this.hacerFetch}>Cargar Tabla</Button>

        {this.state.datosCargados ?
          // Cuando el fetch termine mandamos esto
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
          : /* Y si el fetch no se ha mandado... */ <h1> Presiona el botón </h1>}
      </div>

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
  //Pequeña clase para especiar un poco el contenido de la página,
  // la puedes quitar después (de hecho nisiquier la uso, después la cree en App.css)
  container: {
    width: '80%', //estos estilos son más JS que CSS, así que casi todo lo que no sea numero se ponen en comillas
    margin: 'auto',
    marginTop: '10%' //Como en JS no se usa mucho el guion (-), algunas propiedades de CSS que suelen llevar guion se ponen con camelCase
  }
});

export default App;


