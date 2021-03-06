import React, { useState } from "react";
import api from "../api";
import styled from "styled-components";
import FileUploader from "../components/UploadFiles";
import axios from "axios";
import { Button } from '@material-ui/core';
import { HashRouter as Router, Redirect } from "react-router-dom";

const FormData = require("form-data");

const Container = styled.div.attrs({
	className: "container",
})`
	display: flex;
	flex-wrap: wrap;
`;

function FileUpload(props) {
	const [selectedFile, setSelectedFile] = useState(null);

	const submitForm = async (e) => {
		e.preventDefault();
	
		const formData = new FormData();
		formData.append("file", selectedFile);
		
		try {
			await axios.post("https://sgse2021-ilias.westeurope.cloudapp.azure.com/resources-api/api/ressources/" + props.match.params.id + "/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
		  
		  props.history.goBack()
		} catch {
			
		}
	};

	const btnStyle = {
		marginLeft: "10px",
	}
	return (
		<Container>
			<form>
				<FileUploader onFileSelect={(file) => setSelectedFile(file)} />
				<Button variant="contained" color="primary" disabled={!selectedFile} onClick={(e) => submitForm(e)}>
					Hochladen
				</Button>
				<Button style={btnStyle} variant="contained" color="primary" href={`/resources/#/course/${props.match.params.id}`}>Abbrechen</Button>
			</form>
		</Container>
	);
}

export default FileUpload;
