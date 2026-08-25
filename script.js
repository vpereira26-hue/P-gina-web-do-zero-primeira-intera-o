document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // 1. ALTERANAR TEMA CLARO / ESCURO
    // ========================================================
    const btnModo = document.getElementById('modo');
    if (btnModo) {
        btnModo.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            btnModo.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // ========================================================
    // 2. INTERAÇÃO DOS LINKS DA NAVBAR
    // ========================================================
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ========================================================
    // 3. FUNCIONALIDADES DOS CARDS (Artigos, Curtidas, Comentários)
    // ========================================================
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Elementos do Card
        const btnLerMais = card.querySelector('.btn-ler-mais');
        const paragrafo = card.querySelector('.card-content p');
        
        const btnCurtir = card.querySelector('.btn-curtir');
        const btnNaoCurtir = card.querySelector('.btn-nao-curtir');
        const contadorCurtir = card.querySelector('.contador-curtir');
        const contadorNaoCurtir = card.querySelector('.contador-nao-curtir');

        const inputComentario = card.querySelector('.input-comentario');
        const btnEnviar = card.querySelector('.btn-enviar-comentario');
        const listaComentarios = card.querySelector('.lista-comentarios');

        // --- Ação: Ler Mais / Ler Menos ---
        if (btnLerMais && paragrafo) {
            // Guarda o texto inicial do artigo
            const textoResumido = paragrafo.textContent;
            // Exemplo de texto expandido
            const textoCompleto = `${textoResumido} Esta é a versão completa do artigo. Aqui você encontra detalhes aprofundados sobre a tecnologia, boas práticas de código, exemplos práticos do dia a dia e dicas de como aplicar essa ferramenta em seus projetos de desenvolvimento web.`;
            let expandido = false;

            btnLerMais.addEventListener('click', () => {
                expandido = !expandido;
                if (expandido) {
                    paragrafo.textContent = textoCompleto;
                    btnLerMais.textContent = 'Ler menos';
                } else {
                    paragrafo.textContent = textoResumido;
                    btnLerMais.textContent = 'Ler mais';
                }
            });
        }

        // --- Ação: Botão Curtir ---
        if (btnCurtir && contadorCurtir) {
            btnCurtir.addEventListener('click', () => {
                let num = parseInt(contadorCurtir.textContent, 10) || 0;
                contadorCurtir.textContent = num + 1;
            });
        }

        // --- Ação: Botão Não Curtir ---
        if (btnNaoCurtir && contadorNaoCurtir) {
            btnNaoCurtir.addEventListener('click', () => {
                let num = parseInt(contadorNaoCurtir.textContent, 10) || 0;
                contadorNaoCurtir.textContent = num + 1;
            });
        }

        // --- Ação: Enviar Comentário ---
        function adicionarComentario() {
            if (!inputComentario || !listaComentarios) return;
            
            const texto = inputComentario.value.trim();
            if (texto !== '') {
                const novoComentario = document.createElement('div');
                novoComentario.classList.add('comentario-item');
                novoComentario.textContent = texto;
                
                listaComentarios.appendChild(novoComentario);
                inputComentario.value = '';
                
                // Rola a lista de comentários para o último comentário enviado
                listaComentarios.scrollTop = listaComentarios.scrollHeight;
            }
        }

        if (btnEnviar) {
            btnEnviar.addEventListener('click', adicionarComentario);
        }

        if (inputComentario) {
            inputComentario.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    adicionarComentario();
                }
            });
        }
    });
});