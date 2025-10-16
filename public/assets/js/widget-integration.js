// This file handles the integration of the chat widget into the main website, including communication with the widget iframe.

const chatIframe = document.getElementById('bnpb-chat-widget-iframe');

// Listen for messages from the chat widget iframe
window.addEventListener('message', (event) => {
    // Verify the origin of the message
    if (
      event.origin !== "https://99d371c5cf23.ngrok-free.app" &&
      !event.origin.startsWith("https://99d371c5cf23.ngrok-free.app")
    ) {
      return;
    }

    console.log('📨 Received message from chat widget:', event.data);

    const { type, data } = event.data || {};

    switch (type) {
        case 'WIDGET_READY':
            console.log('✅ Chat widget ready!');
            sendMessageToWidget('INITIALIZE', {
                language: 'id',
                theme: 'auto',
                backgroundColor: 'transparent',
                enableBackground: false
            });
            break;

        case 'LANGUAGE_RESPONSE':
            console.log('🌐 Current language:', data.language);
            break;

        case 'WIDGET_OPENED':
            console.log('📖 Widget drawer opened');
            break;

        case 'WIDGET_CLOSED':
            console.log('📕 Widget drawer closed');
            break;

        case 'NEW_MESSAGE':
            console.log('💬 New message received:', data);
            break;

        default:
            console.log('Unknown message type:', type);
    }
});

// Function to send messages to the widget
function sendMessageToWidget(type, data) {
    if (chatIframe && chatIframe.contentWindow) {
        chatIframe.contentWindow.postMessage(
          {
            type,
            data,
            source: "external-website",
          },
          "https://99d371c5cf23.ngrok-free.app"
        );
    }
}

// Public API for controlling the widget from the external website
window.BNPBChatWidget = {
    changeLanguage: function(locale) {
        sendMessageToWidget('SET_LANGUAGE', locale);
    },
    getCurrentLanguage: function() {
        sendMessageToWidget('GET_LANGUAGE');
    },
    updateAttributes: function(attributes) {
        sendMessageToWidget('UPDATE_ATTRIBUTES', attributes);
    }
};

// Log when the iframe has loaded
chatIframe.addEventListener('load', () => {
    console.log('🖼️ Chat widget iframe loaded successfully');
});

// Handle errors when loading the iframe
chatIframe.addEventListener('error', (error) => {
    console.error('❌ Error loading chat widget:', error);
});

console.log('🚀 External website initialized');
console.log('📍 Chat widget URL:', chatIframe.src);
console.log('💡 Try: window.BNPBChatWidget.changeLanguage("en")');