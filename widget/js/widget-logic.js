// This file contains the logic for the chat widget, including handling user interactions and communication with the external website.

document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const closeButton = document.getElementById('close-button');

    // Function to open the chat widget
    function openChat() {
        chatContainer.style.display = 'block';
        sendMessageToParent('WIDGET_OPENED');
    }

    // Function to close the chat widget
    function closeChat() {
        chatContainer.style.display = 'none';
        sendMessageToParent('WIDGET_CLOSED');
    }

    // Function to send messages to the parent window
    function sendMessageToParent(type, data = {}) {
        window.parent.postMessage({ type, data }, '*');
    }

    // Event listeners
    chatButton.addEventListener('click', openChat);
    closeButton.addEventListener('click', closeChat);

    // Listen for messages from the parent window
    window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
            return;
        }

        const { type, data } = event.data || {};

        switch (type) {
            case 'INITIALIZE':
                // Handle initialization settings
                console.log('Chat widget initialized with settings:', data);
                break;

            case 'SET_LANGUAGE':
                // Handle language change
                console.log('Changing language to:', data);
                break;

            case 'UPDATE_ATTRIBUTES':
                // Handle attribute updates
                console.log('Updating attributes:', data);
                break;

            default:
                console.log('Unknown message type from parent:', type);
        }
    });

    console.log('Chat widget logic initialized');
});