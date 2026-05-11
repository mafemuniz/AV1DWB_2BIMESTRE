const detalhesContainer = document.getElementById("detalhes");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

async function carregarDetalhes() {

    try {

        if (!id) {
            throw new Error("ID não encontrado");
        }

        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar Pokémon");
        }

        const pokemon = await resposta.json();

        loading.classList.add("d-none");

        detalhesContainer.innerHTML = `

            <div class="card shadow p-4 text-center">

                <img
                    src="${pokemon.sprites.front_default}"
                    class="pokemon-img mx-auto"
                >

                <h1 class="text-capitalize mt-3">
                    ${pokemon.name}
                </h1>

                <hr>

                <p><strong>Número:</strong> #${pokemon.id}</p>

                <p><strong>Altura:</strong> ${pokemon.height}</p>

                <p><strong>Peso:</strong> ${pokemon.weight}</p>

                <p>
                    <strong>Tipos:</strong>
                    ${pokemon.types.map(tipo => tipo.type.name).join(", ")}
                </p>

                <p>
                    <strong>Habilidades:</strong>
                    ${pokemon.abilities.map(hab => hab.ability.name).join(", ")}
                </p>

            </div>

        `;

    } catch (error) {

        loading.classList.add("d-none");

        erro.classList.remove("d-none");

        erro.textContent = error.message;

        console.error(error);
    }
}

carregarDetalhes();