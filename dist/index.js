"use strict";
let idUpdate = null;
class todolist {
    constructor(id, task, status) {
        this.id = id;
        this.task = task;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    gettask() {
        return this.task;
    }
    settask(task) {
        this.task = task;
    }
    getstatus() {
        return this.status;
    }
    setstatus(status) {
        this.status = status;
    }
}
const todoList = [];
function addtodo() {
    const task = document.getElementById("task");
    const listtodo = JSON.parse(localStorage.getItem("listtodo") || "[]");
    const taskvalue = task.value;
    const lastIndex = listtodo.length > 0 ? listtodo[listtodo.length - 1].id : 0;
    const newTodo = new todolist(lastIndex + 1, taskvalue, false);
    listtodo.push(newTodo);
    localStorage.setItem("listtodo", JSON.stringify(listtodo));
    rendertassk();
    window.location.reload;
}
function renderfooter() {
    const listtodo = JSON.parse(localStorage.getItem("listtodo") || "[]");
    let footer = document.getElementsByClassName("text-muted");
    const statustrue = listtodo.filter((item) => item.status == true);
    let count = statustrue.length;
    footer[0].innerHTML = `<small> số công việc hoàn thành là ${count} / ${listtodo.length}</small>`;
    if (count == listtodo.length) {
        footer[0].innerHTML = `<h3 style="color:blue"> bạn đã hoàn thành công việc</h3>`;
    }
    rendertassk();
}
function rendertassk() {
    const listtodo = JSON.parse(localStorage.getItem("listtodo") || "[]");
    const rendertodo = document.getElementById("render");
    let renderlist = "";
    listtodo.forEach((item, index) => {
        renderlist += `  <tr>
    <td><input type="checkbox" name="statusCheckbox" id="statusCheckbox-${item.id}" onchange="changeStatus(${item.id})" ${item.status ? "checked" : ""}></td>
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
renderfooter();
function deleteTask(id) {
    const confirm = window.confirm(`bạn chắc chắn muốn xóa công việc này kh`);
    if (confirm) {
        const listtodo = JSON.parse(localStorage.getItem("listtodo") || "[]");
        console.log(id);
        const index = listtodo.findIndex((task) => task.id === id);
        listtodo.splice(index, 1);
        localStorage.setItem("listtodo", JSON.stringify(listtodo));
        rendertassk();
        renderfooter();
    }
}
function editTask(id) {
    idUpdate = id;
    console.log(idUpdate);
    const listtodo = JSON.parse(localStorage.getItem("listtodo") || "[]");
    let editcontent = document.getElementById("task-edit");
    const findtodo = listtodo.find((task) => task.id === id);
    editcontent.value = findtodo === null || findtodo === void 0 ? void 0 : findtodo.task;
}
function updateTask(id) {
    const listtodo = JSON.parse(localStorage.getItem("listtodo") || "[]");
    let editcontent = document.getElementById("task-edit");
    let editcontentValue = editcontent.value;
    const updatedList = listtodo.map((item) => {
        if (item.id == idUpdate) {
            return Object.assign(Object.assign({}, item), { task: editcontentValue });
        }
        return item;
    });
    localStorage.setItem("listtodo", JSON.stringify(updatedList));
    rendertassk();
}
function changeStatus(id) {
    const listtodo = JSON.parse(localStorage.getItem("listtodo") || "[]");
    const updatedList = listtodo.map((item) => {
        if (item.id === id) {
            return Object.assign(Object.assign({}, item), { status: !item.status });
        }
        return item;
    });
    localStorage.setItem("listtodo", JSON.stringify(updatedList));
    //   const checked: any = document.getElementsByClassName("check") as any;
    // console.log(checked);
    rendertassk();
    renderfooter();
}
renderfooter();
