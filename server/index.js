const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require('express-fileupload')
var Ressource = require("./models/ressource-model");

const db = require("./db");
const appointmentRouter = require("./routes/appointment-router");
const ressourceRouter = require("./routes/ressource-router");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
// in latest body-parser use like below.

app.use(upload())

// for parsing multipart/form-data
// app.use(upload.array("myFile"));
app.use(express.static("public"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {

	// adds upload function. In index.js because of the library express-fileupload
	app.post("/api/ressources/:course/upload", async (req, res) => {
		if(req.files) {
			var obj = {
				filename: req.files.file.name,
				course: req.params.course,
				file: req.files.file,
			};

			await Ressource.create(obj, (err, item) => {
				if (err) {
					return res.status(500).json({
						success: false,
						id: obj.filename,
						message: "upload Error!",
					});
				} else {
					// item.save();
					res.status(201).json({
						success: true,
						message: "Erfolgreich",
					});
				}
			});
		}
	})

	app.get("/", (req, res) => {
		res.send("Hello World!");
	});

	app.use("/api", appointmentRouter);
	app.use("/api", ressourceRouter);

	app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
});

app.post("/test", function (req, res) {
	console.log(req.body);
	res.send("test " + JSON.stringify(req.body));
});
