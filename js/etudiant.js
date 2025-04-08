import { ENDPOINT } from "./constants.js"
export default class Etudiant {
    constructor(name, age, note) {
        this.name = name
        this.age = age
        this.note = note
    }

    static allEtudiants = async () => {
        const  response = await fetch(ENDPOINT)
        const etudiants = await response.json()
   
        return etudiants
 
    }
}