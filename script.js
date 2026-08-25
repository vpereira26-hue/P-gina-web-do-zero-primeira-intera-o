document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // 1. TEMA CLARO / ESCURO (PERSISTENTE)
    // ========================================================
    const btnModo = document.getElementById('modo');
    const temaSalvo = localStorage.getItem('blog_tema');

    if (temaSalvo === 'dark') {
        document.body.classList.add('dark-mode');
        if (btnModo) btnModo.textContent = '☀️';
    }

    if (btnModo) {
        btnModo.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            btnModo.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('blog_tema', isDark ? 'dark' : 'light');
        });
    }

    // ========================================================
    // 2. NAVEGAÇÃO DA NAVBAR (Início, Artigos, Sobre, Contato)
    // ========================================================
    const navLinks = document.querySelectorAll('.nav-links a');
    const banner = document.querySelector('.banner');
    const mainContainer = document.querySelector('main.container-grid');

    // Cria contêiner para telas dinâmicas sem alterar o HTML original
    const secaoDinamica = document.createElement('div');
    secaoDinamica.className = 'secao-dinamica';
    secaoDinamica.style.display = 'none';
    mainContainer.parentNode.insertBefore(secaoDinamica, mainContainer);

    const paginasConteudo = {
        'Início': null, // Exibe o banner e os cards padrão
        'Artigos': `
            <h2>Todos os Artigos</h2>
            <p>Confira a lista completa de publicações sobre frontend e backend.</p>
        `,
        'Sobre': `
            <h2>Sobre o Blog</h2>
            <p>Este blog foi desenvolvido por Victor para compartilhar conhecimentos sobre desenvolvimento web moderno com HTML, CSS e JavaScript.</p>
        `,
        'Contato': `
            <h2>Contato</h2>
            <p>Entre em contato pelo e-mail: contato@meublog.com</p>
        `
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const nomeAba = link.textContent.trim();

            if (nomeAba === 'Início') {
                banner.style.display = 'block';
                mainContainer.style.display = 'grid';
                secaoDinamica.style.display = 'none';
            } else {
                banner.style.display = 'none';
                mainContainer.style.display = 'none';
                secaoDinamica.innerHTML = paginasConteudo[nomeAba] || '<h2>Página não encontrada</h2>';
                secaoDinamica.style.display = 'block';
            }
        });
    });

    // ========================================================
    // 3. INTERAÇÕES DOS CARDS (Curtidas, Comentários, Ler mais)
    // ========================================================
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        const btnLerMais = card.querySelector('.btn-ler-mais');
        const paragrafo = card.querySelector('.card-content p');
        
        const btnCurtir = card.querySelector('.btn-curtir');
        const btnNaoCurtir = card.querySelector('.btn-nao-curtir');
        const contadorCurtir = card.querySelector('.contador-curtir');
        const contadorNaoCurtir = card.querySelector('.contador-nao-curtir');

        const inputComentario = card.querySelector('.input-comentario');
        const btnEnviar = card.querySelector('.btn-enviar-comentario');
        const listaComentarios = card.querySelector('.lista-comentarios');

        const keyCurtidas = `blog_card_${index}_curtidas`;
        const keyNaoCurtidas = `blog_card_${index}_nao_curtidas`;
        const keyComentarios = `blog_card_${index}_comentarios`;

        // Carregar dados armazenados
        const curtidasSalvas = localStorage.getItem(keyCurtidas) || '0';
        const naoCurtidasSalvas = localStorage.getItem(keyNaoCurtidas) || '0';
        const comentariosSalvos = JSON.parse(localStorage.getItem(keyComentarios) || '[]');

        if (contadorCurtir) contadorCurtir.textContent = curtidasSalvas;
        if (contadorNaoCurtir) contadorNaoCurtir.textContent = naoCurtidasSalvas;

        if (listaComentarios) {
            comentariosSalvos.forEach(texto => {
                const item = document.createElement('div');
                item.classList.add('comentario-item');
                item.textContent = texto;
                listaComentarios.appendChild(item);
            });
        }

        // Ler Mais / Ler Menos
        if (btnLerMais && paragrafo) {
            const textoResumido = paragrafo.textContent;
            const textoCompleto = `${textoResumido} Conteúdo expandido com detalhes adicionais, técnicas avançadas e exemplos práticos para aplicação imediata.`;
            let expandido = false;

            btnLerMais.addEventListener('click', () => {
                expandido = !expandido;
                paragrafo.textContent = expandido ? textoCompleto : textoResumido;
                btnLerMais.textContent = expandido ? 'Ler menos' : 'Ler mais';
            });
        }

        // Incrementar Curtir
        if (btnCurtir && contadorCurtir) {
            btnCurtir.addEventListener('click', () => {
                let num = (parseInt(contadorCurtir.textContent, 10) || 0) + 1;
                contadorCurtir.textContent = num;
                localStorage.setItem(keyCurtidas, num);
            });
        }

        // Incrementar Não Curtir
        if (btnNaoCurtir && contadorNaoCurtir) {
            btnNaoCurtir.addEventListener('click', () => {
                let num = (parseInt(contadorNaoCurtir.textContent, 10) || 0) + 1;
                contadorNaoCurtir.textContent = num;
                localStorage.setItem(keyNaoCurtidas, num);
            });
        }

        // Comentários
        function adicionarComentario() {
            if (!inputComentario || !listaComentarios) return;
            
            const texto = inputComentario.value.trim();
            if (texto !== '') {
                const novoComentario = document.createElement('div');
                novoComentario.classList.add('comentario-item');
                novoComentario.textContent = texto;
                listaComentarios.appendChild(novoComentario);

                const comentariosAtuais = JSON.parse(localStorage.getItem(keyComentarios) || '[]');
                comentariosAtuais.push(texto);
                localStorage.setItem(keyComentarios, JSON.stringify(comentariosAtuais));

                inputComentario.value = '';
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