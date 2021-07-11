import React from 'react'

import { Menu } from '../components'

function App(props) {
    return (
        <Menu loggedUser={props.loggedUser}></Menu>
    );
} 

export default App;