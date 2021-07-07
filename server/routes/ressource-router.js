const express = require('express')

const RessourcesCtrl = require('../controllers/ressource-ctrl')

const router = express.Router()

router.get('/ressources/:course', RessourcesCtrl.getRessourcesByCourse)
router.post('/ressources/:course', RessourcesCtrl.uploadRessource)
router.delete('/ressources/:id', RessourcesCtrl.deleteRessource)
router.get('/ressourceById/:id', RessourcesCtrl.getRessourceById)

module.exports = router