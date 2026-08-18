const areaInteracao = document.createElement("div");
    areaInteracao.classList.add("interacoes");

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerHTML = "👍 Curtir <span>0</span>";

    const botaoNaoCurtir = document.createElement("button");
    botaoNaoCurtir.innerHTML = "👎 Não curtir <span>0</span>";

    const botaoComentario = document.createElement("button");
    botaoComentario.innerHTML = "💬 Comentar";

    const comentarios = document.createElement("div");
    comentarios.classList.add("comentarios");

    botaoCurtir.addEventListener("click", () => {
        const contador = botaoCurtir.querySelector("span");
        contador.textContent = Number(contador.textContent) + 1;
    });

    botaoNaoCurtir.addEventListener("click", () => {
        const contador = botaoNaoCurtir.querySelector("span");
        contador.textContent = Number(contador.textContent) + 1;
    });

    botaoComentario.addEventListener("click", () => {

        const comentario = prompt("Digite seu comentário:");

        if (comentario) {
            const novoComentario = document.createElement("p");
            novoComentario.innerHTML = "💬 " + comentario;
            comentarios.appendChild(novoComentario);
        }

    });

    areaInteracao.appendChild(botaoCurtir);
    areaInteracao.appendChild(botaoNaoCurtir);
    areaInteracao.appendChild(botaoComentario);

    card.appendChild(areaInteracao);
    card.appendChild(comentarios);

});