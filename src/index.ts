let idUpdate: number | null = null;

class todolist {
  id: number;
  task: string;
  status: boolean;
  constructor(id: number, task: string, status: boolean) {
    this.id = id;
    this.task = task;
    this.status = status;
  }
  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }
  gettask(): string {
    return this.task;
  }

  settask(task: string) {
    this.task = task;
  }
  getstatus(): boolean {
    return this.status;
  }

  setstatus(status: boolean) {
    this.status = status;
  }
}
const todoList: todolist[] = [];
function addtodo(): void {
  const task: HTMLInputElement = document.getElementById(
    "task"
  ) as HTMLInputElement;
  const listtodo: todolist[] = JSON.parse(
    localStorage.getItem("listtodo") || "[]"
  );
  const taskvalue = task.value;
  const lastIndex = listtodo.length > 0 ? listtodo[listtodo.length - 1].id : 0;
  const newTodo = new todolist(lastIndex + 1, taskvalue, false);
  listtodo.push(newTodo);
  localStorage.setItem("listtodo", JSON.stringify(listtodo));
  rendertassk();
  window.location.reload;
}
function renderfooter() {
  const listtodo: todolist[] = JSON.parse(
    localStorage.getItem("listtodo") || "[]"
  );
  let footer: HTMLCollectionOf<Element> = document.getElementsByClassName(
    "text-muted"
  ) as HTMLCollectionOf<Element>;
  const statustrue: todolist[] = listtodo.filter(
    (item: todolist) => item.status == true
  );
  let count: number = statustrue.length;
  footer[0].innerHTML = `<small> số công việc hoàn thành là ${count} / ${listtodo.length}</small>`;
  if (count == listtodo.length) {
    footer[0].innerHTML = `<h3 style="color:blue"> bạn đã hoàn thành công việc</h3>`;
  }
  rendertassk();
}
function rendertassk(): void {
  const listtodo: todolist[] = JSON.parse(
    localStorage.getItem("listtodo") || "[]"
  );

  const rendertodo: HTMLElement = document.getElementById(
    "render"
  ) as HTMLElement;
  let renderlist = "";
  listtodo.forEach((item: todolist, index: number) => {
    renderlist += `  <tr>
    <td><input type="checkbox" name="statusCheckbox" id="statusCheckbox-${
      item.id
    }" onchange="changeStatus(${item.id})" ${item.status ? "checked" : ""}></td>
    <td class="check">${item.task}</td>

    <td>
      <button
      onclick="editTask(${item.id})"
        type="button"
        class="btn btn-outline-info btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#task-modal1"
        data-source="1"
        data-content="task1"
      >
        <i class="fa fa-pen fa-1" aria-hidden="true"></i>
      </button>
    </td>
    <td>
      <button
      onclick="deleteTask(${item.id})"
        class="btn btn-outline-secondary btn-sm remove"
        data-source="1"
        type="button"
      >
        <i class="fa fa-trash fa-1" aria-hidden="true"></i>
      </button>
    </td>
  </tr>`;
    rendertodo.innerHTML = renderlist;
  });
  renderfooter();
  window.location.reload;
}

rendertassk();
// renderfooter();
function deleteTask(id: number): void {
  const confirm = window.confirm(`bạn chắc chắn muốn xóa công việc này kh`);
  if (confirm) {
    const listtodo: todolist[] = JSON.parse(
      localStorage.getItem("listtodo") || "[]"
    );
    console.log(id);

    const index = listtodo.findIndex((task) => task.id === id);
    listtodo.splice(index, 1);
    localStorage.setItem("listtodo", JSON.stringify(listtodo));
    rendertassk();
    renderfooter();
  }
}
function editTask(id: number): void {
  idUpdate = id;
  console.log(idUpdate);

  const listtodo: todolist[] = JSON.parse(
    localStorage.getItem("listtodo") || "[]"
  );
  let editcontent: HTMLInputElement = document.getElementById(
    "task-edit"
  ) as HTMLInputElement;
  const findtodo: todolist | undefined = listtodo.find(
    (task) => task.id === id
  );
  editcontent.value = findtodo?.task as string;
}
function updateTask(id: number): void {
  const listtodo: todolist[] = JSON.parse(
    localStorage.getItem("listtodo") || "[]"
  );
  let editcontent: HTMLInputElement = document.getElementById(
    "task-edit"
  ) as HTMLInputElement;
  let editcontentValue = editcontent.value;
  const updatedList: todolist[] = listtodo.map((item: todolist) => {
    if (item.id == idUpdate) {
      return { ...item, task: editcontentValue } as todolist;
    }
    return item;
  });
  localStorage.setItem("listtodo", JSON.stringify(updatedList));
  rendertassk();
}
function changeStatus(id: number): void {
  const listtodo: todolist[] = JSON.parse(
    localStorage.getItem("listtodo") || "[]"
  );

  const updatedList: todolist[] = listtodo.map((item: todolist) => {
    if (item.id === id) {
      return { ...item, status: !item.status } as todolist;
    }
    return item;
  });

  localStorage.setItem("listtodo", JSON.stringify(updatedList));

  rendertassk();
  renderfooter();
}
// renderfooter();
