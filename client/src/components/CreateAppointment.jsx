import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker,  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import checkUserData from '../checkUserData'
import { HashRouter as Router, Redirect } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { format } from 'date-fns/esm';


const Container = styled.div.attrs({
    className: 'container',
})`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 25%;
    min-width: 150px;
    margin-left: auto;
    margin-right: auto;
`

const ButtonDiv = styled.div.attrs({
    className: 'ButtonDiv',
})`
    display: flex;
    justify-content: end;
    gap: 15px;
`

class CreateAppointment extends Component {
    constructor (props){
        super(props)
        this.today = new Date()

        this.state = {
            name: "",
            date: new Date(),
            course: this.props.match.params.id
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({name})
    }

    handleChangeInputDate = async event => {
        try{
            const newDate = format(event.valueOf(), "dd.MM.yyyy")
            this.setState({date: newDate})
        } catch (error) {
        }
    }
    
    handleCreateAppointment = async () => {
        const {name, date, course} = this.state
        const payload = {name, date, course}

        await api.createAppointment(payload).then(res => {
            this.setState({
                name: "",
                date: ""
            })
        })
        this.props.history.goBack()
    }

    render() {
        var loggedUser = checkUserData()
        
        if(loggedUser === null || loggedUser === undefined){
            document.location.href = "https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/login";
        }

        const { course } = this.state

        if(loggedUser.role === 3){
            return (
                <Container>
                    <TextField display="flex" id="standard-basic" label="Terminname:" onChange={this.handleChangeInputName}/>
                    <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="datePicker"
                            label="Zeitpunkt des Termins"
                            format="dd.MM.yyyy"
                            value={this.today}
                            showTodayButton={true}
                            onChange={date => this.handleChangeInputDate(date)}
                            />
                    </MuiPickersUtilsProvider>
                    <ButtonDiv>
                        <Button variant="contained" color="primary" onClick={() => {this.handleCreateAppointment()}}>Speichern</Button>
                        <Button variant="contained" color="primary" href={"/resources/#/course/"+ course + "/appointments/"}>Abbrechen</Button>
                    </ButtonDiv>
                </Container>
            )
        }else{
            return (
                <Container>Keine Rechte f??r Studenten</Container>
            )
        }
    }
}

export default CreateAppointment