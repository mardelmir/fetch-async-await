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
        return pokemons.results.forEach(pokemon => {
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
            console.error('Error:', error)
        })
}

const printPokemon = (data) => {
    const pokeName = data.name
    const pokeImg = data.sprites.other.home.front_default
    const template = `
        <div class="pokemon">
            <img src="${pokeImg}" alt="${pokeName}" />
            <p>${pokeName}</p>
        </div>`
    pokedex.innerHTML += template
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
    if (press.key === 'Enter' ) {
        searchPokemon()
    }
})

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




// const getInfoPokemons = (results) => {
//     results.forEach(pokemon => {
//         fetch(pokemon.url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Ha surgido un error.')
//                 }
//                 return response.json()
//             })
//             .then(data => printPokemons(data))
//             .catch((error) => {
//                 console.error(error)
//             })
//     })
// }