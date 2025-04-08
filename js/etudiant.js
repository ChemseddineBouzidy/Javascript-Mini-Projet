import { ENDPOINT } from "./constants.js"
export default class Etudiant {
    constructor(name, date, note) {
        this.name = name
        this.date = date
        this.note = note
    }
    getAge = () =>{}
    static allEtudiants = async () => {
        const  response = await fetch(ENDPOINT)
        const etudiants = await response.json()
        return etudiants
    }
     addEtudiants = async () =>{
        const response = await fetch(ENDPOINT,{
            method:'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                name:this.name,
                date:this.date,
                note:this.note

            })
        })
        console.log(response)
        return response
    }
}