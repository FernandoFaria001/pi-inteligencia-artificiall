document.addEventListener('DOMContentLoaded', function () {
    const supportButton = document.getElementById('supportButton');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    // Abrir o chat ao clicar no botão de suporte
    supportButton.addEventListener('click', function () {
        chatWindow.style.display = 'flex';
    });

    // Fechar o chat ao clicar no botão de fechar
    closeChat.addEventListener('click', function () {
        chatWindow.style.display = 'none';
    });

    // Enviar mensagem ao clicar no botão "Enviar"
    sendButton.addEventListener('click', sendMessage);

    // Enviar mensagem ao pressionar a tecla "Enter"
    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Função para enviar a mensagem
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message); // Exibe a mensagem do usuário no chat
            userInput.value = ''; // Limpa o campo de entrada

            // Envia a mensagem para o backend
            try {
                const response = await fetch('http://localhost:3004/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                });

                // Verifica se a resposta é JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Resposta não é JSON');
                }

                const data = await response.json();
                if (data.response) {
                    addMessage('bot', data.response); // Exibe a resposta do bot no chat
                }
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
                addMessage('bot', 'Desculpe, ocorreu um erro ao processar sua mensagem.');
            }
        }
    }

    // Função para adicionar mensagens ao chat
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);

        // Adiciona a foto de perfil
        const avatar = document.createElement('img');
        avatar.src = sender === 'user' ? 'img/avatar.jpg' : 'img/avatar.jpg';
        avatar.alt = sender === 'user' ? 'Usuário' : 'Bot';
        avatar.classList.add('avatar');
        messageElement.appendChild(avatar);

        // Adiciona o balão de mensagem
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerHTML = `<p>${message}</p>`;
        messageElement.appendChild(messageContent);

        // Adiciona a mensagem ao chat
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Rolagem automática
    }
});