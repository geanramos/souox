// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do formulário e da mensagem de erro
    const loginForm = document.getElementById('login-form');
    const codigoInput = document.getElementById('codigo');
    const senhaInput = document.getElementById('senha');
    const errorMessage = document.getElementById('error-message');

    // Adiciona um "ouvinte" para o evento de envio do formulário
    loginForm.addEventListener('submit', (event) => {
        // Previne o comportamento padrão do formulário (que seria recarregar a página)
        event.preventDefault(); 

        // Limpa mensagens de erro anteriores
        errorMessage.textContent = '';

        // Pega os valores digitados pelo usuário
        const codigoDigitado = codigoInput.value;
        const senhaDigitada = senhaInput.value;

        // Busca o nosso "banco de dados" JSON
        fetch('database.json')
            .then(response => {
                // Verifica se a requisição foi bem sucedida
                if (!response.ok) {
                    throw new Error('Erro ao carregar o banco de dados.');
                }
                return response.json(); // Converte a resposta em JSON
            })
            .then(usuarios => {
                // Procura por um usuário que corresponda ao código e senha digitados
                const usuarioEncontrado = usuarios.find(user => user.codigo === codigoDigitado && user.senha === senhaDigitada);

                if (usuarioEncontrado) {
                    // Se encontrou o usuário, exibe uma mensagem de sucesso e redireciona
                    errorMessage.style.color = '#a5d6a7'; // Verde
                    errorMessage.textContent = 'Login bem-sucedido! Redirecionando...';
                    
                    // Aguarda 1 segundo antes de redirecionar para a URL do usuário
                    setTimeout(() => {
                        window.location.href = usuarioEncontrado.url;
                    }, 1000);

                } else {
                    // Se não encontrou, exibe uma mensagem de erro
                    errorMessage.style.color = '#ff9b9b'; // Vermelho
                    errorMessage.textContent = 'Código ou senha inválidos. Tente novamente.';
                }
            })
            .catch(error => {
                // Se houver qualquer erro ao carregar o JSON, exibe no console e na tela
                console.error('Erro:', error);
                errorMessage.textContent = 'Erro no sistema. Contate o administrador.';
            });
    });
});