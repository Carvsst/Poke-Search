// Função para consultar as informações do Pokémon
function consultarPokemon() {
    // Obtém o valor inserido pelo usuário (nome ou ID do Pokémon)
    const pokemon = document.getElementById("pokemon").value.toLowerCase();
    
    // Se o campo estiver vazio, não faz nada
    if (!pokemon) {
        alert("Por favor, digite um nome ou ID de Pokémon.");
        return;
    }

    // URL da API PokeAPI com o nome ou ID do Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    // Fazendo a requisição à API
    fetch(url)
        .then(response => {
            // Se a resposta não for bem-sucedida (404, por exemplo)
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }
            return response.json();
        })
        .then(data => {
            // Preenche os dados no HTML
            document.getElementById("pokemon-image").src = data.sprites.front_default;
            document.getElementById("pokemon-image").alt = `Imagem de ${data.name}`;
            document.getElementById("nome").textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            
            // Preenchendo os tipos (há mais de um tipo possível)
            const tipos = data.types.map(type => type.type.name).join(", ");
            document.getElementById("tipos").textContent = tipos;

            // Preenchendo altura e peso
            document.getElementById("altura").textContent = `${data.height / 10} m`;
            document.getElementById("peso").textContent = `${data.weight / 10} kg`;

            // Exibe a seção de resultado
            document.getElementById("resultado").style.display = "block";
        })
        .catch(error => {
            // Se houver erro (por exemplo, Pokémon não encontrado)
            alert(error.message);
        });
}
