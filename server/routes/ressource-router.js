const express = require('express')

const RessourcesCtrl = require('../controllers/ressource-ctrl')

const router = express.Router()

router.get('/ressources/:course', RessourcesCtrl.getRessourcesByCourse)
router.post('/ressources/:course', RessourcesCtrl.uploadRessource)

module.exports = router