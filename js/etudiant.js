import { ENDPOINT } from "./constants.js"
export default class Etudiant {
    static MAX_NOTE = 20
    constructor(name, date, note) {
        this.name = name
        this.date = date
        this.note = note
    }
    getAge = () => { return (new Date()).getFullYear() - new Date(this.date).getFullYear() }
    isAdmitted = () => { return this.note >= 10 ? 'admit' : 'non admit' }
    static allEtudiants = async () => {
        const response = await fetch(ENDPOINT)
        const etudiants = await response.json()
        return etudiants
    }
    addEtudiants = async () => {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.name,
                date: this.date,
                note: parseFloat(this.note)

            })
        })
        console.log(response)
        return response
    }

    static deleteEtudiants = async (id) => {
        const response = await fetch(ENDPOINT+'/'+id,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },

        })
        return response
    }
}