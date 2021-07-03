import React, { Component, useState } from "react";
import api from "../api";
import styled from "styled-components";
import FileUploader from "../components/UploadFiles";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
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
		formData.append("myFile", selectedFile, selectedFile.name);

		console.log(formData.get("myFile"));
		const { data: responseData } = await axios({
			method: "post",
			url: "http://localhost:3000/test",
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		});

		console.log(responseData);
	};

	return (
		<Container>
			<form>
				<FileUploader onFileSelect={(file) => setSelectedFile(file)} />
				<button disabled={!selectedFile} onClick={(e) => submitForm(e)}>
					Hochladen
				</button>
			</form>
		</Container>
	);
}

export default FileUpload;
