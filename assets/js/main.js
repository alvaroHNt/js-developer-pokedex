const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById("loadMoreButton")

const maxRecords = 151
const limit = 10
let offset = 0;

function loadPokemonItens(offset, limit) {
    //Requisição API     
    pokeApi.getPokemons(offset, limit)
        .then((pokemon = []) => {
            const newHTML = pokemon.map((pokemon) =>  `
                <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li></>`).join("")}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt=${pokemon.name}>
                </div>
                </li>`)
        .join("")
            pokemonList.innerHTML += newHTML  
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    if (offset + limit >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})