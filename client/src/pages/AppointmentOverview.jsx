import React, { Component } from 'react'
import api from '../api'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styled from 'styled-components'
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    display: flex;
    width: 70%;
`

class AppointmentOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            id: this.props.match.params.id,
            appointments: [],
            userRole: "student",
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const appointments = await api.getAppointmentsOfCourse(id)
        const appointmentsArray = []
        appointments.data.data.forEach((e) => {
            appointmentsArray.push({id: e._id, name: e.name, date: e.data})
        })

        this.setState({
            appointments: appointmentsArray
        })
    }

    render() {
        const { id, appointments, userRole } = this.state
        
        const handleClick = (e, data) => {
            alert(`Clicked on menu ${data.item} ${data.id}`);
        };
        
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
                    <ButtonMenu> 
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
                                    <InfoIcon></InfoIcon>
                                    <ListItemText primary={obj.name + ", Zeitpunk: " + obj.date} />
                                    <ContextMenuTrigger id={obj.id}>
                                        <div className="hight"><MoreVertIcon></MoreVertIcon></div>
                                    </ContextMenuTrigger>
                                    <ContextMenu className="contextMenu" id={obj.id}>
                                        <MenuItem
                                        onClick={handleClick}
                                        data={{item: "Bearbeiten", id: obj.id}}
                                        className="menuItem">
                                            Bearbeiten
                                        </MenuItem>
                                        <MenuItem
                                        onClick={handleClick}
                                        data={{item: "löschen", id: obj.id}}
                                        className="menuItem">
                                            Löschen
                                        </MenuItem>
                                    </ContextMenu>
                                </ListItem>
                            )}
                            
                        </List>
                    </Overview>
                    <ButtonMenu> 
                    </ButtonMenu>
                </Container>
            )
        }
        
    }
}

export default AppointmentOverview