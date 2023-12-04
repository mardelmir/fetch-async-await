const pokedex = document.getElementById('app')
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const resetBtn = document.getElementById('resetBtn')


const getFav = () => {
    pokedex.innerHTML = ''
    if (localStorage.fav) {
        let favStored = JSON.parse(localStorage.fav)
        console.log(favStored)
        favStored.forEach(element => {
            const { favId, favName, favImg, favType, favHeight, favWeight } = element

            pokedex.innerHTML += `
        <div class="pokemon" >
            <button class="star filled" onclick="deleteFav(event,${favId})"></button>
            <img src="${favImg}" alt="${favName}" onclick="showModal(event)"/>
            <p><span>${favName}</span></p>
            <div class="hidden">
                <div class="modal">
                    <button class="cerrar" onclick="hideModal(event)">x</button>
                    <img src="${favImg}" alt="${favName}" />
                    <p><span>${favName}</span></p>
                    <div class="text">
                        <p>Tipo: ${favType}</p>
                        <p>Altura: ${favHeight}</p>
                        <p>Peso: ${favWeight}</p>
                    </div>
                </div>
            </div>
        </div>`
        })
    } else { pokedex.innerHTML = '<span>No hay pokemons guardados</span>' }
}


const deleteFav = (id) => {
    let arrayFav = JSON.parse(localStorage.getItem('fav'))
    arrayFav.filter(pokemon => {
        let identificacion = `${id}`
        if (pokemon.favId == identificacion) {
            const index = arrayFav.indexOf(pokemon)
            arrayFav.splice(index, 1)
            console.log(arrayFav)
            localStorage.fav = JSON.stringify(arrayFav)
        }
    })
}

getFav()