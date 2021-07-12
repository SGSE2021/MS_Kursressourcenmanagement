import React, { Component } from 'react'
import api from '../api'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import {ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components'
import InfoIcon from '@material-ui/icons/Info';
import ButtonMenu from '../components/AppointmentsButtonMenu'
import MenuItem from '@material-ui/core/MenuItem';
import checkUserData from '../checkUserData'
import { HashRouter as Router, Redirect } from 'react-router-dom';

const Container = styled.div.attrs({
    className: 'container',
})`
    display: flex;
    flex-wrap: wrap;
`

const Overview = styled.div.attrs({
    className: 'Overview',
})`
    width: 82%;
    margin-right: 3%;
`

const ContextContainer = styled.div.attrs({
    className: "ContextContainer",
})`
    display: flex;
    width: 100%;

    div: {
        align-items: right;
    }
`

class AppointmentOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            id: this.props.match.params.id,
            appointments: [],
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const appointments = await api.getAppointmentsOfCourse(id)
        const appointmentsArray = []
        appointments.data.data.forEach((e) => {
            appointmentsArray.push({id: e._id, name: e.name, date: e.date})
        })

        this.setState({
            appointments: appointmentsArray
        })
    }

    deleteAppointment = async (event, data) => {
        if (
            window.confirm("Termin wirklich löschen?")
        ){
            window.location.reload()
            await api.deleteAppointment(data.id)
        }
    }

    render() {
        const { id, appointments } = this.state
        var loggedUser = checkUserData()

        const styleFullWidth = {
            width: "100%",
        }
        const menuItemStyle = {
            background: "#ededef",
            zIndex: 1,
            border: "1px solid"
        }
        const iconstyle = {
            fontSize: "2.5em",
            marginRight: "0.2em"
        }
        const linkStyle = {
            color: "black",
            textDecoration: "none",
        }
        
        if(loggedUser.role === 1) {
            return (
                <Container>
                    <Overview>
                        <List component="nav"  aria-label="appointments">
                        {appointments.map(obj => 
                                <ListItem button key={obj.id}>
                                    <InfoIcon></InfoIcon>
                                    <ListItemText primary={obj.name + ", Zeitpunk: " + obj.date} />
                                </ListItem>
                            )}
                        </List>
                    </Overview>
                    <ButtonMenu courseid={id}> 
                    </ButtonMenu>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Overview>
                        <List component="nav" aria-label="appointments">
                            {appointments.map(obj => 
                                <ListItem button key={obj.id}>
                                    <div style={styleFullWidth}>
                                        <ContextMenuTrigger id={obj.id}>
                                            <ContextContainer>
                                                <InfoIcon style={iconstyle}></InfoIcon>
                                                <ListItemText primary={obj.name + ", Zeitpunk: " + obj.date} />
                                                <div className="hight"><MoreVertIcon></MoreVertIcon></div>
                                            </ContextContainer>
                                        </ContextMenuTrigger>
                                        <ContextMenu className="contextMenu" id={obj.id} style={menuItemStyle}>
                                            <MenuItem
                                            data={{item: "Bearbeiten", id: obj.id}}
                                            className="menuItem">
                                                <a href={"/resources/#/course/" + id + "/appointments/update/" + obj.id} style={linkStyle}>Bearbeiten</a>
                                            </MenuItem>
                                            <Divider></Divider>
                                            <MenuItem
                                            onClick={(e) => {this.deleteAppointment(e, {item: "löschen", id: obj.id})}}
                                            className="menuItem">
                                                Löschen
                                            </MenuItem>
                                        </ContextMenu>
                                    </div>
                                </ListItem>
                            )}
                        </List>
                    </Overview>
                    <ButtonMenu courseid={id}> 
                    </ButtonMenu>
                </Container>
            )
        }
    }
}

export default AppointmentOverview