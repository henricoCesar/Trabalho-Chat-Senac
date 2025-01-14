document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const nameInput = document.getElementById('name-input');
    const messageContainer = document.getElementById('message-container');
 
    messageForm.addEventListener('submit', function(event) {
       event.preventDefault();
 
       const name = nameInput.value.trim();
       const messageText = messageInput.value.trim();
 
       if (name !== '' && messageText !== '') {
         const messageElement = document.createElement('div');
         const now = new Date();
         const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
         messageElement.textContent = `${time} - ${name}: ${messageText}`;
         messageContainer.appendChild(messageElement);
 
         saveMessageToLocalStorage(name, messageText, now);
         messageInput.value = '';
       }
    });
 
    function saveMessageToLocalStorage(name, message, time) {
       let messages = localStorage.getItem('chatMessages');
       messages = messages ? JSON.parse(messages) : [];
       messages.push({name, message, time: time.getTime()});
       localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
 
    function loadMessagesFromLocalStorage() {
       let messages = localStorage.getItem('chatMessages');
       messages = messages ? JSON.parse(messages) : [];
       messages.forEach(msg => {
          const messageElement = document.createElement('div');
          const time = new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          messageElement.textContent = `${time} - ${msg.name}: ${msg.message}`;
          messageContainer.appendChild(messageElement);
       });
    }
    loadMessagesFromLocalStorage();
 });
 
 