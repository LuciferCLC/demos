<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import './assets/reset.css'
  import Topbar from './components/Topbar'
  import ResumeEditor from './components/ResumeEditor'
  import ResumePreview from './components/ResumePreview'
  import icons from './assets/icons'
  import store from './store/index'
  import getAVUser from './lib/getAVUser'

  export default {
    name: 'app',
    store,
    components: { Topbar, ResumeEditor, ResumePreview },
    created () {
      document.body.insertAdjacentHTML('afterbegin', icons)
      let state = localStorage.getItem('state')
      if (state) {
        state = JSON.parse(state)
      }
      this.$store.commit('initState', state)
      this.$store.commit('setUser', getAVUser())
    }
  }
</script>

<style lang="scss">
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #eaebec;
    > main {
      flex-grow: 1;
      min-width: 1024px;
      max-width: 1440px;
      margin: 16px 0;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-self: center;
      width: 100%;
    }
  }

  #resumeEditor {
    min-width: 35%;
    background: #444;
  }

  #resumePreview {
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }

  svg.icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: -0.1em;
    font-size: 16px;
  }
</style>
