import Etudiant from "./etudiant.js";

let filterBySettings = {
    'column': 'name',
    'desc': true
}


// if not static work with this
// let etudiant = new Etudiant()
// console.log(etudiant.allEtudiants())


//if static work with this
const displayEtudiants = async () => {
    return Etudiant.allEtudiants()
        .then((response) => {

            response.sort((a, b) => {
                const isNumber = typeof a[filterBySettings.column] === 'number'
                if (isNumber) {
                    if (filterBySettings.desc) {
                        return b[filterBySettings.column] - (a[filterBySettings.column])
                    }
                    return a[filterBySettings.column] - (b[filterBySettings.column])
                }
                if (filterBySettings.desc) {
                    return b[filterBySettings.column].localeCompare(a[filterBySettings.column])
                }
                return a[filterBySettings.column].localeCompare(b[filterBySettings.column])
            })

            return response.map((data) => {
                const { id, name, date, note } = data
                const etudiant = new Etudiant(name, date, note)

                return `
                    <tr>
                        <td>${id}</td>
                        <td>${etudiant.name}</td>
                        <td>${etudiant.getAge()} ans </td>
                        <td><button class="badge rounded-pill text-bg-${etudiant.note >= 10 ? 'success' : 'danger'}">${etudiant.note}/${Etudiant.MAX_NOTE} </button>   </td>   
                         <td> ${etudiant.isAdmitted()} </td>                
                        <td><button  class='btn btn-danger btn-sm delete' data-id='${id}' >Supprimer</button></td>
                    </tr>`
                console.log(id, name, date, note)
            })
        })
}

const addEtudiant = (event) => {
    event.preventDefault()
    const [name, date, note] = document.querySelectorAll('#name,#date,#note')
    const etudiant = new Etudiant(name.value, date.value, note.value)
    console.log(name.value, date.value, note.value)
    etudiant.addEtudiants()
}
window.deleteEtudiant = (id) => {
    Etudiant.deleteEtudiants(id).then(() => alert('étudiant supprimer'))
    // console.log(id)

}





const renderEtudiants = () => {
    const body = document.querySelector('.liste-etudiants')
    displayEtudiants().then((data) => {
        // console.log(data.toString())
        body.innerHTML = data.join(' ') //remove ','
        init()
    })
}

const init = () => {
    const refreshButton = document.querySelector('#refresh')
    const addButton = document.querySelector('#add')
    const deleteHtmlButton = document.querySelectorAll('.delete')
    refreshButton.addEventListener('click', () => { renderEtudiants() })
    addButton.addEventListener('click', (event) => { addEtudiant(event) })
    deleteHtmlButton.forEach((button) => {
        // console.log(button.dataset.id)
        button.addEventListener('click', (event) => {
            // console.log(button.dataset.id)
            window.deleteEtudiant(button.dataset.id)
        })

    })




}
// init()

window.renderSort = (column) => {
    if (filterBySettings.column === column) {
        const element = document.querySelector('.sort-element[data-column='+column+'] span')
        element.innerHTML = `<button class='btn fw-bold' onClick='toggleSprtDirection()' >${filterBySettings.desc ? '&darr;' : '&uarr;'}</button>`
        // return `<button ${filterBySettings.desc >= 10 ? '&darr;' : '&uarr;'}"></button>`        
    }
}
renderSort('id')
renderSort('name')
renderSort('date')
renderSort('note')
window.toggleSprtDirection = () => {
    filterBySettings.desc = !filterBySettings.desc
    renderSort(filterBySettings.column)
    renderEtudiants()
}

renderEtudiants()







