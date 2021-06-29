const express = require('express')

const AppointmentsCtrl = require('../controllers/appointment-ctrl')

const router = express.Router()

router.post('/appointment', AppointmentsCtrl.createAppointment)
router.put('/appointment/:id', AppointmentsCtrl.updateAppointment)
router.delete('/appointment/:id', AppointmentsCtrl.deleteAppointment)
router.get('/appointment/:id', AppointmentsCtrl.getAppointmentById)
router.get('/appointments', AppointmentsCtrl.getAppointments)
router.get('/appointmentsOfCourse/:course', AppointmentsCtrl.getAppointmentsOfCourse)

module.exports = router