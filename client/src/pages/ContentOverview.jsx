import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import {ContentButtonMenu} from '../components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DescriptionIcon from '@material-ui/icons/Description';
import { Divider } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import checkUserData from '../checkUserData'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';


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
        const res = await api.getRessources(id)

        var ressourceArray = []

        res.data.data.forEach((e) => {
            ressourceArray.push({filename: e.filename, id: e._id, file: e.file, size: (e.size / 1000) + " KB"})
        })

        this.setState({
            ressources: ressourceArray
        })
    }

    handleDelete = async (event, data) => {
        if (window.confirm("Termin wirklich löschen?")){
            window.location.reload()
            await api.deleteRessource(data.id)
        }
    };

    handleDownload = async (event, data) => {
        await api.getRessourceById(data.id)
        .then((response) => {
            const content = new Buffer.from(response.data.data.file).toString()
            var f = new File([content], response.data.data.filename, {type: response.data.data.mimetype})

            const url = window.URL.createObjectURL(f)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', f.name)

            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
        })

        event.preventDefault()
    }

    render() {
        const { id, ressources } = this.state
        var loggedUser = checkUserData()

        if(loggedUser === null || loggedUser === undefined){
            return (
                <Router>
                    <Redirect to={`/users/`}>
                    </Redirect>
                </Router>
            )
        }


        const styleFullWidth = {
            width: "100%",
        }
        const menuItemStyle = {
            background: "#ededef",
            zIndex: 1,
            border: "1px solid"
        }
        const iconstyle = {
            fontSize: "3.5em"
        }
        
        return (
            <Container>
                <Overview> 
                    <List component="nav" aria-label="appointments">
                        {ressources.map(obj => 
                            <ListItem button 
                            key={obj.id}>
                                <div style={styleFullWidth}>
                                    <ContextMenuTrigger id={obj.id}>
                                        <ContextContainer>
                                            <DescriptionIcon style={iconstyle}></DescriptionIcon>
                                            <ListItemText primary={obj.filename} secondary={obj.size}/>
                                            <div ><MoreVertIcon></MoreVertIcon></div>
                                        </ContextContainer>
                                    </ContextMenuTrigger>
                                    <ContextMenu className="contextMenu" id={obj.id} style={menuItemStyle}>
                                        <MenuItem
                                        onClick={this.handleDelete}
                                        data={{item: "löschen", id: obj.id}}
                                        className="menuItem">
                                            Löschen
                                        </MenuItem>
                                        <Divider></Divider>
                                        <MenuItem
                                        onClick={this.handleDownload}
                                        data={{item: "download", id: obj.id}}
                                        className="menuItem">
                                            Herunterladen
                                        </MenuItem>
                                    </ContextMenu>
                                </div>
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