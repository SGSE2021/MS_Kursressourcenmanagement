import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import {ContentButtonMenu} from '../components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DescriptionIcon from '@material-ui/icons/Description';
import { Divider } from '@material-ui/core';

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
            ressourceArray.push({filename: e.filename, id: e._id, file: e.file, size: (e.file.size / 1000) + " KB"})
        })

        this.setState({
            ressources: ressourceArray
        })
    }

    handleDelete = async (event, data) => {
        if (window.confirm("Termin wirklich löschen?")){
            window.location.reload()
            console.log(data.id)
            await api.deleteRessource(data.id)
        }
    };

    handleDownload = async (event, data) => {
        console.log(data)

        const res = await api.getRessourceById(data.id)

        console.log(res.data.data.file)
    }

    render() {
        const { id, ressources } = this.state

        const styleFullWidth = {
            width: "100%",
        }
        const menuItemStyle = {
            background: "#ededef",
            zIndex: 1,
            border: "1px solid"
        }
        const dividerStyle = {
            color: "black"
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
                                            <DescriptionIcon></DescriptionIcon>
                                            <ListItemText primary={obj.filename} secondary={obj.size}/>
                                            <div ><MoreVertIcon></MoreVertIcon></div>
                                        </ContextContainer>
                                    </ContextMenuTrigger>
                                    <ContextMenu className="contextMenu" id={obj.id} style={menuItemStyle}>
                                        <MenuItem
                                        onClick={this.handleDelete}
                                        data={{item: "löschen", id: obj.id}}
                                        className="menuItem"
                                        style={menuItemStyle}>
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