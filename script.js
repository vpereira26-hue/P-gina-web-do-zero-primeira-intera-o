// ========================================================
// 2. NAVEGAÇÃO ENTRE PÁGINAS / ABAS
// ========================================================
const navLinks = document.querySelectorAll('.nav-links .nav-item');
const abas = document.querySelectorAll('.aba-conteudo');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const alvoId = link.getAttribute('data-target');

        // Atualiza a classe ativa nos links da navbar
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Alterna a visibilidade das abas
        abas.forEach(aba => {
            if (aba.id === alvoId) {
                aba.style.display = 'block';
            } else {
                aba.style.display = 'none';
            }
        });
    });
});