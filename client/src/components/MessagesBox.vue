<script>
  import Message from './Message.vue'

  export default {
    name: 'MessagesBox',

    components: { Message },

    props: {
      messages: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<template lang="pug">
  #messages-container
    p.no-messages(v-if='!messages.length') No Messages
    .messages(v-else)
      message(v-for='message in messages', :message='message', :key='message.text')
</template>

<style lang="scss">
  @import "../styles/variables.scss";

  #messages-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20vh;
    color: $secondary;
    background-color: $messages-background;
    box-shadow: 10px 10px 10px 10px rgba(0,0,0,.5);
    overflow-y: scroll;

    .no-messages {
      font-size: 1.5em
    }

    .messages {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
