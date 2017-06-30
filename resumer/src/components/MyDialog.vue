<template>
  <div class="dialogWrapper" v-show="visible">
    <div class="dialog">
      <header>
        {{title}}
        <span class="close" @click="close">X</span>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyDialog',
    props: ['title', 'visible'],
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="scss">
  .dialogWrapper {
    background: hsla(0, 0%, 0%, 0.25);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog {
    background: white;
    border-radius: 5px;
    padding: 15px 20px;
    min-height: 4em;
    min-width: 10em;
    > header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      > .close {
        font-weight: bold;
        &:hover {
          cursor: pointer;
        }
      }
    }
    > main {
      padding: 10px;
    }
  }
</style>
