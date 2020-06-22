<template>
  <v-app>
    <Nav title="宿舍考勤情况" path="/login"></Nav>
    <div id="username-page">
      <div class="username-page-container">
        <h1 class="title">Type your username</h1>
        <form id="usernameForm" name="usernameForm">
          <div class="form-group">
            <input type="text" id="name" placeholder="Username" autocomplete="off" class="form-control" />
          </div>
          <div class="form-group">
            <button type="submit" class="accent username-submit">Start Chatting</button>
          </div>
        </form>
      </div>
    </div>

    <div id="chat-page" class="hidden">
      <div class="chat-container">
        <div class="chat-header">
          <h2>Spring WebSocket Chat Demo</h2>
        </div>
        <div class="connecting">
          Connecting...
        </div>
        <ul id="messageArea"></ul>
        <form id="messageForm" name="messageForm" nameForm="messageForm">
          <div class="form-group">
            <div class="input-group clearfix">
              <input type="text" id="message" placeholder="Type a message..." autocomplete="off" class="form-control" />
              <button type="submit" class="primary">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'AdminSendMsg',
  data() {
    return {
      username: '',
      colors: ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'],
      stompClient: '',
      messageContent: ''
    }
  },
  components: { Nav },
  created() {},
  mounted() {},
  methods: {
    init() {},
    connect(event) {
      this.username = document.querySelector('#name').value.trim()

      if (this.username) {
        // usernamePage.classList.add('hidden')
        // chatPage.classList.remove('hidden')

        // var socket = new SockJS('/ws')
        // this.stompClient = Stomp.over(socket)

        this.stompClient.connect({}, this.onConnected, this.onError)
      }
      event.preventDefault()
    },

    onConnected() {
      // Subscribe to the Public Topic
      this.stompClient.subscribe('/topic/public', this.onMessageReceived)

      // Tell your username to the server
      this.stompClient.send('/app/chat.addUser', {}, JSON.stringify({ sender: this.username, type: 'JOIN' }))

      this.connectingElement.classList.add('hidden')
    },

    // onError(error) {
    // //   connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!'
    // //   connectingElement.style.color = 'red'
    // },

    sendMessage(event) {

      if (this.messageContent && this.stompClient) {
        // let chatMessage = {
        //   sender: this.username,
        //   content: this.messageContent,
        //   type: 'CHAT'
        // }

        // stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage))
        this.messageContent = ''
      }
      event.preventDefault()
    },

    onMessageReceived(payload) {
      var message = JSON.parse(payload.body)

      var messageElement = document.createElement('li')

      if (message.type === 'JOIN') {
        messageElement.classList.add('event-message')
        message.content = message.sender + ' joined!'
      } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message')
        message.content = message.sender + ' left!'
      } else {
        messageElement.classList.add('chat-message')

        var avatarElement = document.createElement('i')
        var avatarText = document.createTextNode(message.sender[0])
        avatarElement.appendChild(avatarText)
        // avatarElement.style['background-color'] = getAvatarColor(message.sender)

        messageElement.appendChild(avatarElement)

        var usernameElement = document.createElement('span')
        var usernameText = document.createTextNode(message.sender)
        usernameElement.appendChild(usernameText)
        messageElement.appendChild(usernameElement)
      }

      var textElement = document.createElement('p')
      var messageText = document.createTextNode(message.content)
      textElement.appendChild(messageText)

      messageElement.appendChild(textElement)

    //   messageArea.appendChild(messageElement)
    //   messageArea.scrollTop = messageArea.scrollHeight
    },

    getAvatarColor(messageSender) {
      var hash = 0
      for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i)
      }

      var index = Math.abs(hash % this.colors.length)
      return this.colors[index]
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
