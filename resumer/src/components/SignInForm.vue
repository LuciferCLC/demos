<template>
  <div>
    <form @submit.prevent="signIn">
      <div class="row">
        <label>用户名</label>
        <input type="text" required v-model="formData.username">
      </div>
      <div class="row">
        <label>密　码</label>
        <input type="password" required v-model="formData.password">
      </div>
      <div class="actions">
        <input type="submit" value="提交">
        <span>{{errorMessage}}</span>
      </div>
    </form>
  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'SignInForm',
    data () {
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: ''
      }
    },
    methods: {
      signIn () {
        let {username, password} = this.formData
        AV.User.logIn(username, password).then(() => {
          this.$emit('success', getAVUser())
        }, (error) => {
          this.errorMessage = getErrorMessage(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    >label,
    >input {
      margin-bottom: 15px;
      margin-right: 5px;
    }
    >input {
      padding: 3px;
      border-radius: 3px;
      outline: none;
      border: 1px solid #aaa;
    }
  }

  .actions {
    width: 100%;
    >input {
      width: 90%;
      font-size: 15px;
      background: #ccc;
      margin: 10px 15px;
      padding: 5px;
      border: none;
      border-radius: 5px;
      &:hover {
        background: #555;
        color: #fff;
        cursor: pointer;
      }
    }
  }
</style>
