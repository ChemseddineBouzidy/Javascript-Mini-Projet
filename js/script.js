import Etudiant from "./etudiant.js";


// if not static work with this
// let etudiant = new Etudiant()
// console.log(etudiant.allEtudiants())


//if static work with this
const displayEtudiants = async () => {
    return Etudiant.allEtudiants()
        .then((response) => {
            return response.map((data) => {
                const { id, name, date, note } = data
                const etudiant = new Etudiant(name,date,note)

                return `
                    <tr>
                        <td>${id}</td>
                        <td>${etudiant.name}</td>
                        <td>${etudiant.getAge()} ans </td>
                        <td><span class="badge rounded-pill text-bg-${etudiant.note >= 10 ? 'success' : 'danger'}">${etudiant.note}/${Etudiant.MAX_NOTE} </span>   </td>   
                         <td> ${etudiant.isAdmitted()} </td>                
                        <td><button class='btn btn-danger btn-sm'>Supprimer</button></td>
                    </tr>`
                console.log(id, name, date, note)
            })
        })
}

const addEtudiant = (event) => {
    event.preventDefault()
    const [name,date,note]= document.querySelectorAll('#name,#date,#note')
    const etudiant = new Etudiant(name.value,date.value,note.value)
    console.log(name.value,date.value,note.value)
    etudiant.addEtudiants()
}






const renderEtudiants = () => {
    const body = document.querySelector('.liste-etudiants')
    displayEtudiants().then((data) => {
        // console.log(data.toString())
        body.innerHTML = data.join(' ') //remove ','
    })
}

const init = () => {
    const refreshButton = document.querySelector('#refresh')
    const addButton = document.querySelector('#add')
    refreshButton.addEventListener('click', () => { renderEtudiants() })
    addButton.addEventListener('click', (event) => { addEtudiant(event) })

}
init()
renderEtudiants()







