const pokedex = document.getElementById('app')
const searchBtn = document.getElementById('searchBtn')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')


const getPokemons = async (url) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Ha surgido un error.')
        } const pokemons = await response.json()
        const { next, previous, results } = pokemons
        const pagination = [next, previous, results]
        getInfoPokemons(results)
        return pagination
    } catch (error) {
        console.error(error)
    }
}

const getInfoPokemons = (results) => {
    results.forEach(pokemon => {
        fetch(pokemon.url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ha surgido un error.')
                }
                return response.json()
            })
            .then(data => {
                const pokeName = data.name
                const pokeImg = data.sprites.other.home.front_default
                const template = `
            <div class="pokemon">
                <img src="${pokeImg}" alt="${pokeName}" />
                <p>${pokeName}</p>
            </div>`
                pokedex.innerHTML += template
            })
    })
}

// const [next, prev, searchPoke] = pagination

// prevBtn.addEventListener('click', prevPage (prev))
// const prevPage = (previous) => {
//     console.log('no existe')
    
//     if (!previous) {
//         console.log('no existe')
//     } else {
//         getPokemons(previous)
//     }
// }

// const search = (results) => {
//     console.log(results)
// }

getPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')

