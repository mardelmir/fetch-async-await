const pokedex = document.getElementById('app')
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const resetBtn = document.getElementById('resetBtn')

const getPokemons = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Error al acceder a la información.', response.status)
        }
        const pokemons = await response.json()
        pokemons.results.forEach((pokemon) => {
            onePokemonInfo(pokemon.url)
        })
    } catch (error) {
        console.error('Error', error)
    }
}

const onePokemonInfo = (url) => {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ha surgido un error.')
            }
            return response.json()
        })
        .then((data) => printPokemon(data))
        .catch((error) => {
            pokedex.innerHTML = '<span>Pokemon no encontrado</span>'
            console.error(error)
        })
}

const printPokemon = (data) => {
    const pokeImg = data.sprites.other.home.front_default
    const { name, height, weight, type } = data
    const pokeType = data.types.map((element) => element.type.name);

    pokedex.innerHTML += `
        <div class="pokemon" >
            <img src="${pokeImg}" alt="${name}" onclick="showModal(event)"/>
            <p><span>${name}</span></p>
            <div class="hidden">
                <div class="modal">
                    <button class="cerrar" onclick="hideModal(event)">x</button>
                    <img src="${pokeImg}" alt="${name}" />
                    <p><span>${name}</span></p>
                    <div class="text">
                        <p>Tipo: ${pokeType}</p>
                        <p>Altura: ${height}</p>
                        <p>Peso: ${weight}</p>
                    </div>
                </div>
            </div>
        </div>`
}

const showModal = (event) => {
    const pokemonDiv = event.target.parentElement
    const detail = pokemonDiv.lastElementChild
    detail.classList.remove('hidden')
    detail.classList.add('show')
}

const hideModal = (event) => {
    event.target.parentElement.parentElement.classList.add('hidden')
    event.target.parentElement.parentElement.classList.remove('show')
}

const searchPokemon = () => {
    const find = `${searchInput.value}`.toLowerCase()
    const findUrl = `https://pokeapi.co/api/v2/pokemon/${find}`
    onePokemonInfo(findUrl)
    pokedex.innerHTML = ''
    searchInput.value = ''
}

searchBtn.addEventListener('click', () => {
    searchPokemon()
})
document.addEventListener('keydown', (press) => {
    if (press.key === 'Enter') {
        searchPokemon()
    }
})


// Paginación

let value = 0
let url = `https://pokeapi.co/api/v2/pokemon?offset=${value}&limit=10`

prevBtn.addEventListener('click', () => {
    if (value <= 0) {
        alert('Esta es la primera página')
    } else {
        pokedex.innerHTML = ''
        value = value - 10
        url = `https://pokeapi.co/api/v2/pokemon?offset=${value}&limit=10`
        getPokemons(url)
    }
})

nextBtn.addEventListener('click', () => {
    if (value >= 1282) {
        alert('Esta es la última página')
    } else {
        pokedex.innerHTML = ''
        value = value + 10
        url = `https://pokeapi.co/api/v2/pokemon?offset=${value}&limit=10`
        getPokemons(url)
    }
})

resetBtn.addEventListener('click', () => {
    location.reload()
})


getPokemons(url)
