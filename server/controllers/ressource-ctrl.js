var Ressource = require("../models/ressource-model");

getRessourcesByCourse = async (req, res) => {
	const course = req.params.course;

	await Ressource.find({ course: course }, (err, ressources) => {
		if (err) {
			console.log(err);
			res.status(500).send("An Error occured", err);
		} else {
			res.status(200).json({ success: true, data: ressources });
		}
	});
};

deleteRessource = async (req, res) => {
	console.log(req.body)
	await Ressource.findOneAndDelete({ _id: req.params.id }, (err, ressource) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!ressource) {
            return res
                .status(404)
                .json({ success: false, error: `Ressource not found` })
        }

        return res.status(200).json({ success: true, data: ressource })
    }).catch(err => console.log(err))
}

getRessourceById = async (req, res) => {
	await Ressource.findOne({ _id: req.params.id }, (err, ressource) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!ressource) {
            return res
                .status(404)
                .json({ success: false, error: `Ressource not found` })
        }
        return res.status(200).json({ success: true, data: ressource })
    }).catch(err => console.log(err))
}

uploadRessource = async (req, res) => {
	var obj = {
		filename: req.body.filename,
		course: req.params.course,
		file: req.body.file,
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
};

module.exports = {
	getRessourcesByCourse,
	uploadRessource,
	deleteRessource,
	getRessourceById,
};
