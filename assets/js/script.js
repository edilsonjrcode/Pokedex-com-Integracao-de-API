const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById('loadMore')
const maxRecord = 151
const limit = 9
let offset = 0

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.types[0]}">
                <span class="number">#${pokemon.number}</span>
                <span class="nome">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class='type ${type}'>${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt"${pokemon.name}">
                </div>
            </li>`
            ).join('')
            pokemonList.innerHTML += newHtml
        })
}

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML = pokemons.map(convertPokemonLi).join('')
})

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdeRecordNextPage = offset + limit

    if (qtdeRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else{
        loadPokemonItens(offset, limit)

    }
})