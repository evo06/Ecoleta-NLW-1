
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes`

    citySelect.innerHTML = "<option value> Selecionar a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false

        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //itens de coleta
    //pegar todos os li`sA
    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for (const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }
    const collectedItens = document.querySelector("input[name=items]")

    let selectedItems = []

    function handleSelectedItem(event){

        const itemLi = event.target
        //add ou remover uma classe com javascript
        itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id

        // console.log('ITEM ID:'),itemId
       

        // verificar se exitem items selecionados, se sim
        // pegar os itens selecionados

        const alredadySelected = selectedItems.findIndex( item => {
            const itemFound = item == itemId //isso sera true ou false
            return itemFound 
        })
        // console.log (alredadySelected >= 0)

        // se já estiver selecionado, 
        if (alredadySelected >= 0 ) {
            //tirar da selecao
            const filteredItems = selectedItems.filter(item =>{
                const itemIsDifferent = item != itemId
                return itemIsDifferent

            })

            selectedItems = filteredItems
        }else{
            //se nao estiver selecionado, add a selecao
         // atualizar o campo escondido com os itens selecionados
          selectedItems.push(itemId)

        }

        // console.log('selectedItems:',selectedItems)

        collectedItens.value = selectedItems        

      
    }

