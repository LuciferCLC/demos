import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = '5Wg4JIJNf7TRvDPPHXw0bku4-gzGzoHsz'
var APP_KEY = 'At89yfnpcF7eMG5xFbIEfQAd'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

var app = new Vue({
    el: '#app',
    data: {
        actionType: 'login',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null,
        newTodo: '',
        list: {
            todoList: [],
            doneList: []
        }
    },
    created: function(){
        this.currentUser = this.getCurrentUser()
        this.fetchTodo()
    },
    methods: {
        signUp: function(){
            let user = new AV.User()
            user.setUsername(this.formData.username)
            user.setPassword(this.formData.password)
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert('注册失败！')
            })
        },
        login: function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
                this.fetchTodo()
            }, (error) => {
                alert('登陆失败！')
                console.log(error)
            })
        },
        getCurrentUser: function(){
            let current = AV.User.current()
            if (current) {
                let {id, createdAt, attributes: {username}} = current
                return {id, username, createdAt}
            } else {
                return null
            }
        },
        logout: function(){
            AV.User.logOut()
            this.currentUser = AV.User.current()
            // this.currentUser = null
            window.location.reload()
        },
        fetchTodo: function(){
            if (this.currentUser) {
                var query = new AV.Query('Todos')
                query.find().then((todos) => {
                    let avTodos = todos[0]
                    let id = avTodos.id
                    this.list = JSON.parse(avTodos.attributes.data)
                    this.list.id = id
                }, (error) => {
                    console.error(error.message)
                })
            }
        },
        updateTodo: function(){
            let dataString = JSON.stringify(this.list)
            let avTodos = AV.Object.createWithoutData('Todos', this.list.id)
            avTodos.set('data', dataString)
            avTodos.save().then(() => {
                console.log('更新成功！')
            })
        },
        addTodo: function(){
            this.list.todoList.push({
                title: this.newTodo,
                createAt: this.setDate()
            })
            this.newTodo = '' // 用户按enter键后将input值清空
            this.saveOrUpdate()
        },
        saveTodo: function(){
            let dataString = JSON.stringify(this.list)
            let Todos = AV.Object.extend('Todos')
            let todos = new Todos()
            todos.set('data', dataString)
            let acl = new AV.ACL()  // 新建ACL实例
            acl.setReadAccess(AV.User.current(),true)  // 只有此user可读
            acl.setWriteAccess(AV.User.current(),true)  // 只有此user可写
            todos.setACL(acl)  // 将ACL实例赋予Todos对象
            todos.save().then((todos) => {
                this.list.id = todos.id
                console.log('保存成功！');
            }, (error) => {
                console.error(error.message)
            })
        },
        removeTodo: function(todo, flag){
            if (!flag) {
                let index = this.list.todoList.indexOf(todo)
                this.list.todoList.splice(index, 1)
            } else if (flag) {
                let index = this.list.doneList.indexOf(todo)
                this.list.doneList.splice(index, 1)
            }
            this.saveOrUpdate()
        },
        changeList: function(todo, flag){
            if (!flag) {
                let index = this.list.todoList.indexOf(todo)
                this.list.todoList.splice(index, 1)
                this.list.doneList.push({
                    title: todo.title,
                    createAt: todo.createAt,
                    doneAt: this.setDate()
                })
            } else if (flag) {
                let index = this.list.doneList.indexOf(todo)
                this.list.doneList.splice(index, 1)
                this.list.todoList.push({
                    title: todo.title,
                    createAt: todo.createAt
                })
            }
            this.saveOrUpdate()
        },
        saveOrUpdate: function(){
            if (this.list.id) {
                this.updateTodo()
            } else {
                this.saveTodo()
            }
        },
        setDate: function(){
            let mydate = new Date()
            let year = mydate.getFullYear()
            let month = mydate.getMonth() + 1;
            let date = mydate.getDate();
            let hour = mydate.getHours();
            let min = mydate.getMinutes();
            let sec = mydate.getSeconds();
            let str = year + '.' + addZero(month) + '.'+ addZero(date) + ' ' + addZero(hour) + ':' + addZero(min) + ':' + addZero(sec)
            return str;

            function addZero(str) {
                if (str < 10) return str = '0' + str
                else return str
            }
        }
    }
})