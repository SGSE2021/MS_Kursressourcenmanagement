import React, { Component, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const FileUploader = ({ onFileSelect }) => {
	const fileInput = useRef(null);

	const handleFileInput = (e) => {
		onFileSelect(e.target.files[0]);
	};

	return (
		<div>
			<input type="file" onChange={handleFileInput} name="upload" />
			<Button onClick={(e) => fileInput.current && fileInput.current.click()}>
				Wählen
			</Button>
		</div>
	);
};

export default FileUploader;
