// URL de la API de Hugging Face
const API_URL = "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct";
// Tu clave API de Hugging Face (opcional, pero recomendable para evitar límites)
const API_KEY = "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"; // Clave 

// Elementos del DOM
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Función para agregar mensajes al chat
function addMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Desplazar hacia abajo
}

// Función para enviar la pregunta a la API de Hugging Face
async function sendMessageToAI(question) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        inputs: question,
      }),
    });

    const data = await response.json();
    console.log(data)
    const aiResponse = data[0].generated_text || "Lo siento, no pude generar una respuesta.";
    addMessage("ai", aiResponse); // Mostrar respuesta del chatbot
  } catch (error) {
    console.error("Error al comunicarse con la API:", error);
    addMessage("ai", "Lo siento, ocurrió un error al procesar tu solicitud.");
  }
}

// Evento para enviar mensaje
sendBtn.addEventListener("click", () => {
  const question = userInput.value.trim();
  if (question) {
    addMessage("user", question); // Mostrar pregunta del usuario
    userInput.value = ""; // Limpiar input
    sendMessageToAI(question); // Enviar pregunta a la IA
  }
});

// Permitir enviar con la tecla Enter
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});


