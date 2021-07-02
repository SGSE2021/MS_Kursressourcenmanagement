import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import {ContentButtonMenu} from '../components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

class ContentOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            id: this.props.match.params.id,
            ressources: [],
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const res = await api.getRessource(id)

        console.log(res.data.data)

        const ressources = [
            {id: "1", filename: "Test.txt", course: "SGSE"},
            {id: "2", filename: "aufgabe1.pdf", course: "SGSE"},
            {id: "3", filename: "aufgabe2.pdf", course: "SGSE"},
            {id: "4", filename: "aufgabe3.pdf", course: "SGSE"},
            {id: "5", filename: "aufgabe4.pdf", course: "SGSE"},
            {id: "6", filename: "aufgabe5.pdf", course: "SGSE"},
            {id: "7", filename: "aufgabe6.pdf", course: "SGSE"},
            {id: "8", filename: "aufgabe7.pdf", course: "SGSE"},
        ]

        this.setState({
            ressources: ressources
        })
    }

    render() {
        const { id, ressources } = this.state

        const handleClick = (e, data) => {
            if(data.item === "löschen"){
                console.log("löschen")
            }else{
                console.log("bearbeiten")
            }
        };

        return (
            <Container>
                <Overview> 
                    <List component="nav" aria-label="appointments">
                        {ressources.map(obj => 
                            <ListItem button key={obj.id}>
                                <ListItemText primary={obj.filename} />
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
                                    onClick={this.deleteAppointment}
                                    data={{item: "löschen", id: obj.id}}
                                    className="menuItem">
                                        Löschen
                                    </MenuItem>
                                </ContextMenu>
                            </ListItem>
                        )}
                    </List>
                </Overview>
                
                <ContentButtonMenu courseid={id}>
                </ContentButtonMenu>
            </Container>
        )
    }
}

export default ContentOverview