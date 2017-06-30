<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resume.config" :class="{active:item.field===selected}" @click="selected=item.field">
          <svg class="icon">
            <use :xlink:href="'#icon-'+item.icon"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="item in resume.config" v-show="item.field===selected">
        <div v-if="resume[item.field] instanceof Array">
          <div class="subitem" v-for="(subitem, i) in resume[item.field]">
            <div class="resumeField" v-for="(value,key) in subitem">
              <label>{{key}}</label>
              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
            </div>
            <hr>
          </div>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label> {{key}} </label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',
    computed: {
      selected: {
        get () {
          return this.$store.state.selected
        },
        set (value) {
          return this.$store.commit('switchTab', value)
        }
      },
      resume () {
        return this.$store.state.resume
      }
    },
    methods: {
      changeResumeField (path, value) {
        this.$store.commit('updateResume', {
          path,
          value
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #resumeEditor {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    > nav {
      width: 80px;
      background: black;
      color: white;
      > ol {
        > li {
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 16px 0;
          &.active {
            background: white;
            color: black;
          }
        }
      }
    }
    > .panels {
      flex-grow: 1;
      padding: 30px;
    }
    > li {
      padding: 24px;
    }
  }

  svg.icon {
    width: 24px;
    height: 24px;
  }

  ol {
    list-style: none;
  }

  hr {
    margin: 30px 0;
  }

  .resumeField {
    > label {
      display: block;
    }
    input[type=text] {
      width: 100%;
      height: 40px;
      border: 1px solid #ddd;
      box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.25);
      margin: 16px 0;
      padding: 0 8px;
    }
  }
</style>
