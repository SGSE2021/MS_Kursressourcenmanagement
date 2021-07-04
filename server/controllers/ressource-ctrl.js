var Ressource = require('../models/ressource-model');
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

getRessourcesByCourse = async (req, res) => {
    const course = req.params.course;

    await Ressource.find({course: course}, (err, ressources) =>{
        if(err){
            console.log(err)
            res.status(500).send("An Error occured", err)
        }else{
            res.status(200).json({ success: true, data: ressources })
        }
    })
}

uploadRessource = async (req, res) => {
    console.log("hier war ein Post-Req")
    console.log(req.body)

    var obj = {
        filename: req.body.filename,
        course: req.params.course,
        file: req.body.file,
    }
    
    await Ressource.create(obj, (err, item) => {
        if (err) {
            return res.status(500).json({
                success: false,
                id: obj.filename,
                message: 'upload Error!',
            })
        }
        else {
            // item.save();
            res.status(201).json({
                success: true,
                message: "Erfolgreich"
            })
        }
    });

}


module.exports = {
    getRessourcesByCourse,
    uploadRessource,
}