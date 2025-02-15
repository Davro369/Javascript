
# Crear un Chatbot Simple con IA usando JavaScript y Hugging Face

## Objetivo

El objetivo de esta práctica es que el estudiante aprenda a integrar un modelo de lenguaje de código abierto (de Hugging Face) en una aplicación web frontend utilizando JavaScript. El chatbot responderá preguntas simples del usuario.

## Requisitos previos

Conocimientos básicos de HTML, CSS y JavaScript.

Una cuenta en Hugging Face (opcional, pero recomendable para obtener una clave API).

Un editor de código como Visual Studio Code.

# Pasos 

## 1. Configuración del Proyecto

Crea una carpeta para tu proyecto y dentro de ella, crea los siguientes archivos:

- index.html (estructura básica de la página)
- style.css (estilos para la interfaz)
- script.js (lógica de interacción con la API)

## 2. Estructura HTML (index.html)

```
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chatbot con IA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="chat-container">
    <h1>Chatbot con IA</h1>
    <div id="chat-box" class="chat-box"></div>
    <div class="input-container">
      <input type="text" id="user-input" placeholder="Escribe tu pregunta..." />
      <button id="send-btn">Enviar</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

## 3. Estilos CSS (style.css)

```
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.chat-container {
  width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.chat-box {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}

.input-container {
  display: flex;
  gap: 10px;
}

#user-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#send-btn {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#send-btn:hover {
  background: #0056b3;
}

.message {
  margin-bottom:5px;
  padding:8px;
  border-bottom: #a1a1a1 2px solid ;
  
  border-radius: 5px;
}
```

## 4. Lógica JavaScript (script.js)

Aquí es donde integraremos la API de Hugging Face. Para este ejemplo, usaremos el modelo DialoGPT (un modelo de conversación basado en GPT). Necesitarás obtener una clave API desde Hugging Face si deseas usar su servicio en línea.

```
// URL de la API de Hugging Face
const API_URL = "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct";
// Tu clave API de Hugging Face (opcional, pero recomendable para evitar límites)
const API_KEY = "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"; // Reemplaza con tu clave

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
```

## 5. Ejecutar el Proyecto

- Guarda todos los archivos en la carpeta del proyecto.
- Abre el archivo index.html en tu navegador.
- Ingresa una pregunta en el campo de texto y haz clic en "Enviar". El chatbot generará una respuesta usando el modelo Phi-3.5-mini-instruct de Hugging Face.

# Notas Importantes

- Modelo de Hugging Face: En este ejemplo, usamos el modelo Phi-3.5-mini-instruct de Microsoft, que es un modelo de conversación entrenado para mantener diálogos. Puedes cambiar el modelo en la URL de la API por otro modelo disponible en Hugging Face, como gpt2 o bert .

Por ejemplo, si quieres usar otro modelo, cambia la URL:

```
const API_URL = "https://api-inference.huggingface.co/models/otro-modelo";
```

- Clave API: Aunque algunos modelos de Hugging Face pueden funcionar sin una clave API, es recomendable obtener una para evitar límites de uso y mejorar la experiencia.

- Costos: La mayoría de los modelos en Hugging Face son gratuitos, pero algunos pueden tener costos asociados dependiendo del uso intensivo. Revisa los detalles del modelo antes de usarlo.

- Personalización: Puedes ajustar los parámetros del modelo o incluso implementar tu propio backend para manejar las solicitudes si deseas mayor control.
