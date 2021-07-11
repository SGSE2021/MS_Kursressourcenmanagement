import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker,  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import { format } from 'date-fns/esm';
import checkUserData from '../checkUserData'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';


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

class UpdateAppointment extends Component {
    constructor (props){
        super(props)
        this.today = new Date()
        
        this.state = {
            name: "",
            formatedDate: "",
            selectedDate: "",
            course: this.props.match.params.id,
            appointmentId: this.props.match.params.apId,
            userRole: "prof",
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({name})
    }

    handleChangeInputDate = async event => {
        try{
            const newDate = format(event.valueOf(), "dd.MM.yyyy")
            this.setState({formatedDate: newDate, selectedDate: event})
        } catch (error) {
        }
    }
    
    componentDidMount = async () => {
        const res = await api.getAppointmentById(this.props.match.params.apId)
        var appointment = {name: res.data.data.name, date: res.data.data.date}

        const splittedDate = appointment.date.split(".")
        const newDate = new Date(splittedDate[2], splittedDate[1], splittedDate[0])

        this.setState({
            name: appointment.name,
            formatedDate: appointment.date,
            selectedDate: newDate,
        })
    }

    handleUpdateAppointment = async () => {
        const {appointmentId, name, formatedDate, course} = this.state
        const payload = {name: name, date: formatedDate, course: course}

        try{
            await api.updateAppointment(appointmentId, payload).then(res => {
                this.setState({
                    name: "",
                    date: ""
                })
            })
        } catch {

        }finally {
            this.props.history.push(`/resources/course/${course}/appointments/`)
        }
        
    }

    render() {
        const { name, selectedDate, course } = this.state
        var loggedUser = checkUserData()

        if(loggedUser === null || loggedUser === undefined){
            <Router>
                <Redirect to={`/users/`}>
                </Redirect>
            </Router>
        }

        if( loggedUser.userRole === 3){
            return (
                <Container>
                    <TextField display="flex" id="standard-basic" label="Terminname:" value={name} onChange={this.handleChangeInputName}/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="datePicker"
                            label="Zeitpunkt des Termins"
                            format="dd.MM.yyyy"
                            showTodayButton={true}
                            value={selectedDate}
                            onChange={this.handleChangeInputDate}
                            />
                    </MuiPickersUtilsProvider>
                    <ButtonDiv>
                        <Button variant="contained" color="primary" onClick={() => {this.handleUpdateAppointment()}}>Speichern</Button>
                        <Button variant="contained" color="primary" href={"/resources/course/"+ course + "/appointments/"}>Abbrechen</Button>
                    </ButtonDiv>
                </Container>
            )
        }else{
            <Container>Keine Rechte für Studenten</Container>
        }
    }
}

export default UpdateAppointment