type todo = {
  id: number;
  title: string;
};

interface Todo {
  todoInput: HTMLFormElement;
  todoContainer: HTMLDivElement;
  updateDOM(): void;
  init(): void;
}

interface EventTarget {
  title: HTMLInputElement;
  reset(): void;
}

interface ParentNode {
  append(...nodes: (Node | string | HTMLElement)[]): void;
}

class Todo implements Todo {
  private todoList: todo[];
  public todoInput: HTMLFormElement;
  public todoContainer: HTMLDivElement;
  constructor(todoInput: HTMLFormElement, todoContainer: HTMLDivElement) {
    this.todoInput = todoInput;
    this.todoContainer = todoContainer;
    this.todoList = [];
  }
  init(): void {
    this.updateDOM();
    this.todoInput.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      if (!e.target) return;
      let id: number = Math.random() * 10000000;
      let title: string = e.target.title.value;
      this.update({ id, title });
      e.target.reset();
    });
  }
  updateDOM(): void {
    const dom: HTMLParagraphElement[] = this.todoList.map(
      (todo: todo): HTMLParagraphElement => {
        const todoContainer = document.createElement("div") as HTMLDivElement;
        todoContainer.classList.add("todo");
        const deleteIconContainer = document.createElement(
          "div"
        ) as HTMLDivElement;
        deleteIconContainer.classList.add("deleteIconContainer");
        const deleteIcon = document.createElement("img") as HTMLImageElement;

        deleteIcon.src = "./delete.png";
        deleteIcon.width = 24;
        deleteIconContainer.append(deleteIcon);
        const p = document.createElement("p") as HTMLParagraphElement;

        p.append(todo.title);
        deleteIconContainer.addEventListener("click", () =>
          this.delete(todo.id)
        );
        todoContainer.append(p, deleteIconContainer);
        return todoContainer;
      }
    );
    this.todoContainer.innerHTML = "";

    <any>this.todoContainer.append(...dom);
  }
  update(todo: todo): void {
    this.todoList.push(todo);
    this.updateDOM();
  }
  delete(id: number): void {
    this.todoList = this.todoList.filter((item: todo) => item.id != id);
    this.updateDOM();
  }
}

const formInput = document.getElementById("todoForm") as HTMLFormElement;
const container = document.getElementById("container") as HTMLDivElement;

const todo = new Todo(formInput, container);
todo.init();
