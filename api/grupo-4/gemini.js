// gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuração da chave de API
const API_KEY = "AIzaSyCDK0G3Cpux8b4EfajqPVYi5HURXGv0hH0"; // Substitua pela sua chave de API
const genAI = new GoogleGenerativeAI(API_KEY);

// Função para enviar mensagens ao Gemini
async function sendMessageToGemini(message) {
    try {
        // Definir instrução inicial
        const context = "Você é um assistente especializado apenas em eventos. Responda apenas perguntas relacionadas a eventos, como datas, locais, ingressos, organização e informações sobre eventos.";

        // Criar a mensagem final
        const finalMessage = `${context}\n\nPergunta do usuário: ${message}`;

        // Usando o modelo Gemini 1.5 Flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Envia a mensagem para o Gemini
        const result = await model.generateContent(finalMessage);
        const response = await result.response;
        const text = response.text(); // Extrai o texto da resposta

        return text; // Retorna a resposta do Gemini
    } catch (error) {
        console.error("Erro ao enviar mensagem para o Gemini:", error);
        throw error;
    }
}

module.exports = { sendMessageToGemini };
