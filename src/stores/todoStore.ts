import { defineStore } from 'pinia'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
}

let nextId = 1

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as TodoItem[]
  }),
  
  getters: {
    completedTodos: (state) => state.todos.filter(todo => todo.completed),
    activeTodos: (state) => state.todos.filter(todo => !todo.completed),
    totalTodos: (state) => state.todos.length,
    completedCount: (state) => state.todos.filter(todo => todo.completed).length
  },
  
  actions: {
    addTodo(text: string) {
      if (text.trim()) {
        this.todos.push({
          id: `todo-${nextId++}`,
          text: text.trim(),
          completed: false
        })
      }
    },
    
    removeTodo(id: string) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    
    toggleTodo(id: string) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    
    updateTodo(id: string, text: string) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.text = text.trim()
      }
    }
  }
})