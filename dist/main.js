"use strict";
class Todo {
    constructor(todoInput, todoContainer) {
        this.todoInput = todoInput;
        this.todoContainer = todoContainer;
        this.todoList = [];
    }
    init() {
        this.updateDOM();
        this.todoInput.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!e.target)
                return;
            let id = Math.random() * 10000000;
            let title = e.target.title.value;
            this.update({ id, title });
            e.target.reset();
        });
    }
    updateDOM() {
        const dom = this.todoList.map((todo) => {
            const todoContainer = document.createElement("div");
            todoContainer.classList.add("todo");
            const deleteIconContainer = document.createElement("div");
            deleteIconContainer.classList.add("deleteIconContainer");
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "./public/delete.png";
            deleteIcon.width = 24;
            deleteIconContainer.append(deleteIcon);
            const p = document.createElement("p");
            p.append(todo.title);
            deleteIconContainer.addEventListener("click", () => this.delete(todo.id));
            todoContainer.append(p, deleteIconContainer);
            return todoContainer;
        });
        this.todoContainer.innerHTML = "";
        this.todoContainer.append(...dom);
    }
    update(todo) {
        this.todoList.push(todo);
        this.updateDOM();
    }
    delete(id) {
        this.todoList = this.todoList.filter((item) => item.id != id);
        this.updateDOM();
    }
}
const formInput = document.getElementById("todoForm");
const container = document.getElementById("container");
const todo = new Todo(formInput, container);
todo.init();
