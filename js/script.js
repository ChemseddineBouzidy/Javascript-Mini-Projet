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

const renderEtudiants = () => {
    const body = document.querySelector('.liste-etudiants')
        displayEtudiants().then((data) => {
            // console.log(data.toString())
            body.innerHTML= data.join(' ') //remove ','
        } )
}

const init = () => {
const refreshButton = document.querySelector('#refresh')
refreshButton.addEventListener('click',()=>{renderEtudiants()})
}
init()
renderEtudiants()







