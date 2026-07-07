const botao = document.getElementById("modo");

botao.addEventListener("click", () => {

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
botao.innerHTML = "☀️ Modo Claro";
}else{
botao.innerHTML = "🌙 Modo Escuro";
}

});

const botoes = document.querySelectorAll(".card button");

botoes.forEach((botao) => {

botao.addEventListener("click", () => {

alert("Em breve você poderá ler este artigo completo!");

});

});
