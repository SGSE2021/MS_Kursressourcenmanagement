const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const db = require("./db");
const appointmentRouter = require("./routes/appointment-router");
const ressourceRouter = require("./routes/ressource-router");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array("myFile"));
app.use(express.static("public"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
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
