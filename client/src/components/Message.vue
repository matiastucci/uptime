<script>
  export default {
    name: 'Message',

    props: {
      message: {
        type: Object,
        required: true
      }
    }
  }
</script>

<template lang="pug">
  .message
    span.type(:class='message.type')
    p.text {{ message.text }}
</template>

<style lang="scss">
  @import "../styles/variables.scss";
  .message {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: .8em;
    font-size: 1.2em;

    .type {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 10px;

      &.recovered {
        background-color: $recovered;
      }

      &.warning {
        background-color: $warning;
      }
    }

    .text {
      margin: 0;
    }
  }
</style>
