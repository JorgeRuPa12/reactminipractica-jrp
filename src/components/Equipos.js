import React, { Component } from 'react'
import axios from 'axios'

export default class Equipos extends Component {
    selectEquipos = React.createRef()
    cajaJugador = React.createRef()
    url = "https://apiejemplos.azurewebsites.net/"
    state ={
        equipos: []
    }

    loadEquipos = () => {
        let request = "api/Equipos"
        let equipos = [];
        let url = this.url+request
        axios.get(url).then(response => {
            this.setState({
                equipos: response.data
            })
        })
    }

    buscarJugadorXEquipo = (e) => {
        e.preventDefault()
        let idequipo = this.selectEquipos.current.value
        let request = "api/Jugadores/JugadoresEquipos/"+idequipo
        let url = this.url + request
        axios.get(url).then(response => {
            this.setState({
                jugadores: response.data
            })
        })
    }

    buscarJugadorXNombre = (e) => {
        e.preventDefault()
        let nombre = this.cajaJugador.current.value
        let request = "api/Jugadores/FindJugadores/"+nombre
        let url = this.url + request
        axios.get(url).then(response => {
            this.setState({
                jugadores: response.data
            })
        })

    }

    componentDidMount = () => {
        this.loadEquipos()
    }

    render() {
        return (
        <div>
            <h1>Mini Practica React</h1>
            <form onSubmit={this.buscarJugadorXNombre}>
                <label>Nombre Jugador</label>
                <input type="text" ref={this.cajaJugador}/>
                <button>Buscar por NOMBRE</button>
            </form>
            <hr/>
            <form onSubmit={this.buscarJugadorXEquipo}>
                <select ref={this.selectEquipos}>
                    {
                        this.state.equipos.map((equipo, index) => {
                            return(
                                <option value={equipo.idEquipo} key={index}>{equipo.nombre}</option>
                            )
                        })
                    }
                </select>
                <button>Buscar jugadores</button>
            </form>
            {
                this.state.jugadores &&
                (
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Posicion</th>
                                <th>Pais</th>
                                <th>Fecha nacimiento</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.jugadores.map((jugador, index) => {
                                    return(
                                        <tr key={index}>
                                            <td><img src={jugador.imagen} style={{width:"100px", height:"100px"}}/></td>
                                            <td>{jugador.nombre}</td>
                                            <td>{jugador.posicion}</td>
                                            <td>{jugador.pais}</td>
                                            <td>{jugador.fechaNacimiento}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    
                )
            }
        </div>
        )
    }
}
