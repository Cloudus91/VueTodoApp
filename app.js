const STORAGE_KEY = "app-js-randomkey";

const app = new Vue({
    el: '#app',
    data: {
        inputValue: "",
        newId: 0,
        filter: "all",
        todos: [],
        activeEdit: null
    },
    created() {
        this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    },
    methods: {
        addValue() {
            if (this.inputValue) {
                this.todos.push({
                    id: this.newId++,
                    text: this.inputValue.trim(),
                    completed: false,
                })
            }
            this.inputValue = "";
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
        },
        check(todo) {
            todo.completed = !todo.completed;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
        },
        deleteATodo(index) {
            this.todos.splice(index, 1)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
        },
        editTodo(todo) {
            this.activeEdit = todo
        },
        doneEdit(todo) {
            if (!this.activeEdit) {
                return
            }
            this.activeEdit = null
            todo.text = todo.text.trim()
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
        }
    },
    computed: {
        left() {
            return this.todos.filter(todo => !todo.completed).length
        },
        filtered() {
            if (this.filter == "all") {
                return this.todos
            } else if (this.filter == "notdone") {
                return this.todos.filter(todo => !todo.completed)
            } else if (this.filter == "done") {
                return this.todos.filter(todo => todo.completed)
            }
            return this.todos
        }
    }
})