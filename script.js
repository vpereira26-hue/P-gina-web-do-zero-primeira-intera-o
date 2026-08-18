// --- 1. MODO ESCURO ---
const botaoModo = document.getElementById('modo');

botaoModo.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        botaoModo.textContent = '☀️ Modo Claro';
    } else {
        botaoModo.textContent = '🌙 Modo Escuro';
    }
});


// --- 2. INTERAÇÕES DOS ARTIGOS (Curtir, Não Curtir e Comentários) ---

// Seleciona todos os artigos da página
const artigos = document.querySelectorAll('.card');

artigos.forEach(artigo => {
    // Elementos de Curtir
    const btnCurtir = artigo.querySelector('.btn-curtir');
    const contadorCurtir = artigo.querySelector('.contador-curtir');
    
    // Elementos de Não Curtir
    const btnNaoCurtir = artigo.querySelector('.btn-nao-curtir');
    const contadorNaoCurtir = artigo.querySelector('.contador-nao-curtir');

    // Elementos de Comentários
    const inputComentario = artigo.querySelector('.input-comentario');
    const btnEnviarComentario = artigo.querySelector('.btn-enviar-comentario');
    const listaComentarios = artigo.querySelector('.lista-comentarios');

    // Lógica de Curtir
    btnCurtir.addEventListener('click', () => {
        let curtidas = parseInt(contadorCurtir.textContent);
        
        // Se já estava curtido, descurte; senão, curte
        if (btnCurtir.classList.contains('ativo')) {
            curtidas--;
            btnCurtir.classList.remove('ativo');
        } else {
            curtidas++;
            btnCurtir.classList.add('ativo');
            
            // Se o botão "não curtir" estava ativo, remove
            if (btnNaoCurtir.classList.contains('ativo')) {
                let naoCurtidas = parseInt(contadorNaoCurtir.textContent);
                naoCurtidas--;
                contadorNaoCurtir.textContent = naoCurtidas;
                btnNaoCurtir.classList.remove('ativo');
            }
        }
        contadorCurtir.textContent = curtidas;
    });

    // Lógica de Não Curtir
    btnNaoCurtir.addEventListener('click', () => {
        let naoCurtidas = parseInt(contadorNaoCurtir.textContent);
        
        if (btnNaoCurtir.classList.contains('ativo')) {
            naoCurtidas--;
            btnNaoCurtir.classList.remove('ativo');
        } else {
            naoCurtidas++;
            btnNaoCurtir.classList.add('ativo');
            
            // Se o botão "curtir" estava ativo, remove
            if (btnCurtir.classList.contains('ativo')) {
                let curtidas = parseInt(contadorCurtir.textContent);
                curtidas--;
                contadorCurtir.textContent = curtidas;
                btnCurtir.classList.remove('ativo');
            }
        }
        contadorNaoCurtir.textContent = naoCurtidas;
    });

    // Lógica para Adicionar Comentários
    btnEnviarComentario.addEventListener('click', () => {
        const textoComentario = inputComentario.value.trim();

        if (textoComentario !== "") {
            // Cria um novo elemento para o comentário
            const novoComentario = document.createElement('div');
            novoComentario.classList.add('comentario-item');
            novoComentario.textContent = textoComentario;

            // Adiciona o comentário na lista do artigo correspondente
            listaComentarios.appendChild(novoComentario);

            // Limpa o input
            inputComentario.value = "";
        }
    });

    // Permitir enviar comentário pressionando a tecla "Enter"
    inputComentario.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnEnviarComentario.click();
        }
    });
});