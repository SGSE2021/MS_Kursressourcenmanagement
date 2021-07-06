import React, { Component } from 'react'
import api from '../api'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styled from 'styled-components'
import InfoIcon from '@material-ui/icons/Info';

import ButtonMenu from '../components/AppointmentsButtonMenu'

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
            userRole: "prof",
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
        const { id, appointments, userRole } = this.state
        
        const handleClick = (e, data) => {
            if(data.item === "löschen"){
                console.log("löschen")
            }else{
                console.log("bearbeiten")
                console.log(data)
            }
        };

        const styleFullWidth = {
            width: "100%",
        }
        const menuItemStyle = {
            background: "#ededef",
            zIndex: 1,
            border: "1px solid"
        }
        
        if(userRole == "student") {
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
                                                <InfoIcon></InfoIcon>
                                                <ListItemText primary={obj.name + ", Zeitpunk: " + obj.date} />
                                                <div className="hight"><MoreVertIcon></MoreVertIcon></div>
                                            </ContextContainer>
                                        </ContextMenuTrigger>
                                        <ContextMenu className="contextMenu" id={obj.id} style={menuItemStyle}>
                                            <MenuItem
                                            onClick={handleClick}
                                            data={{item: "Bearbeiten", id: obj.id}}
                                            className="menuItem">
                                                Bearbeiten
                                            </MenuItem>
                                            <Divider></Divider>
                                            <MenuItem
                                            onClick={this.deleteAppointment}
                                            data={{item: "löschen", id: obj.id}}
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