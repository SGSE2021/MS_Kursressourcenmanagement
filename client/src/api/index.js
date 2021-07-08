import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createAppointment = payload => api.post(`/appointment`, payload)
export const getAllAppointments = () => api.get('/appointments')
export const updateAppointment = (id, payload) => api.put(`/appointment/${id}`, payload)
export const deleteAppointment = id => api.delete(`/appointment/${id}`)
export const getAppointmentById = id => api.get(`/appointment/${id}`)
export const getAppointmentsOfCourse = name => api.get(`/appointmentsOfCourse/${name}`)
export const uploadRessource = (name, payload) => api.post(`/ressources/${name}`, payload)
export const getRessources = name => api.get(`/ressources/${name}`)
export const deleteRessource = id => api.delete(`/ressources/${id}`)
export const getRessourceById = id => api.get(`/ressourceById/${id}`)



const apis = {
    createAppointment,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    getAppointmentsOfCourse,
    uploadRessource,
    getRessources,
    deleteRessource,
    getRessourceById,
}

export default apis