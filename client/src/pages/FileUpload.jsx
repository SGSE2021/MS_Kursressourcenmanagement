import React, { Component, useState } from 'react'
import api from '../api'
import styled from 'styled-components'
import FileUploader from '../components/UploadFiles'
import {DropzoneArea} from 'material-ui-dropzone'
const FormData = require('form-data');

const Container = styled.div.attrs({
    className: 'container',
})`
    display: flex;
    flex-wrap: wrap;
`

function FileUpload (props) {
    const [selectedFile, setSelectedFile] = useState(null)

    const submitForm = async (e) => {
        e.preventDefault()
        // var formData = new FormData();
        // // formData.append("filename", selectedFile.name)
        // formData.append("files", selectedFile, selectedFile.name);
        
        const data = new FormData() 
        data.append('file', selectedFile)
        data.append("myfile", selectedFile, selectedFile.name);

        console.log(selectedFile)
        console.log(data)

        const { data:responsedata } = await api.uploadRessource(props.match.params.id, data)
        console.log(responsedata.success)
    };

    return (
        <Container>
            <form>
                <DropzoneArea
                  onChange={this.handleChange.bind(this)}
                />
                <FileUploader onFileSelect={(file) => setSelectedFile(file)}>
                </FileUploader>
                <button onClick={(e) => submitForm(e)} >Speichern</button>
            </form>
        </Container>
    )
}

export default FileUpload