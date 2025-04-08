import Etudiant from "./etudiant.js";


// if not static work with this
// let etudiant = new Etudiant()
// console.log(etudiant.allEtudiants())


//if static work with this
const displayEtudiants = async () => {
    return Etudiant.allEtudiants()
        .then((response) => {
            return response.map((etudiant) => {
                const { id, name, date, note } = etudiant
                return `
                    <tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${date}</td>
                        <td>${note}</td>
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







