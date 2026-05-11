const lista = document.getElementById("lista");
const loading = document.getElementById("loading");
const erro = document.getElementById("erro");

async function carregarPokemons() {

    try {

        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }

        const dados = await resposta.json();

        loading.classList.add("d-none");

        for (let i = 0; i < dados.results.length; i++) {

            const pokemon = dados.results[i];

            const detalhesResposta = await fetch(pokemon.url);
            const detalhes = await detalhesResposta.json();

            lista.innerHTML += `

                <div class="col-md-4 col-lg-3">

                    <div class="card shadow-sm p-3 text-center">

                        <img 
                            src="${detalhes.sprites.front_default}" 
                            class="pokemon-img"
                        >

                        <h5 class="mt-3 text-capitalize">
                            ${pokemon.name}
                        </h5>

                        <p>
                            Número: #${detalhes.id}
                        </p>

                    </div>

                </div>

            `;
        }

    } catch (error) {

        loading.classList.add("d-none");

        erro.classList.remove("d-none");

        erro.textContent = "Não foi possível carregar os dados da API.";

        console.error(error);
    }
}

carregarPokemons();