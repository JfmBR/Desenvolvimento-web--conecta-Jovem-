const formulario = document.querySelector("#formulario-inscricao");
const confirmacao = document.querySelector("#confirmacao-envio");
const fecharConfirmacao = document.querySelector("#fechar-confirmacao");

// O navegador valida os campos antes de disparar o evento submit.
// Quando houver integração, abra a confirmação apenas após a resposta de sucesso.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    confirmacao.showModal();
});

fecharConfirmacao.addEventListener("click", () => {
    confirmacao.close();
});
