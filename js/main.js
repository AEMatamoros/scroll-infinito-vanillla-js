let limit = 20;
let offset = 0;

let gallery = document.getElementById("galleryContainer");

function fetchPokemons() {
  fetch(
    `https://pokeapi.co/api/v2/pokemon?` +
      new URLSearchParams({
        limit,
        offset,
      })
  )
    .then((response) => response.json())
    .then((data) => {
      let promArr = data.results.map((pokemonObj) =>
        fetch(pokemonObj.url).then((response) => response.json())
      );

      Promise.all(promArr).then((data) => {
        let htmlToRender = data
          .map((e) => {
            return `<div class="card" style="width: 18rem">
            <img
              src="${e.sprites.back_default}"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <p class="card-text">
                ${e.name}
              </p>
            </div>
          </div>`;
          })
          .join(" ");
        gallery.innerHTML += htmlToRender;
      }); //Renderizar el contenido
    });
}

fetchPokemons();
// _.debounce(func, [wait=0], [options={}])
window.addEventListener(
  "scroll",
  _.debounce(() => {
    //   console.log(window.scrollY);
    //   console.log(window.innerHeight);
    //   console.log(document.documentElement.scrollHeight);
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      offset = offset + 20;
      fetchPokemons();
    }
  }, 300)
);
