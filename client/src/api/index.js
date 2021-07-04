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
export const uploadRessource = (name, payload) => api.post(`/ressources/${name}`,  {content: payload})
export const getRessource = name => api.get(`/ressources/${name}`)


const apis = {
    createAppointment,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    getAppointmentsOfCourse,
    uploadRessource,
    getRessource,
}

export default apis