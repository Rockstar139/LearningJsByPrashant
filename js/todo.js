// let todoArr = [{todo:"This is a test task", date:"29/06/2026"}];
// localStorage.setItem('todoArr', JSON.stringify(todoArr));
let todoArr;
initializeToDoArr();

function removeToDoElements(){
    document.querySelector('.todo-tasks').innerHTML = "";
}

function initializeToDoArr(){
    todoArr = JSON.parse(localStorage.getItem('todoArr')) ?? [];
    if(todoArr != ""){
        removeToDoElements();
        for(let i=0;i<todoArr.length;i++){
            let todoTask = todoArr[i];
            let {todo, date} = todoTask;
            let divTasks = document.createElement('div');
            divTasks.id = `task${i}`;
            divTasks.className = "tasks";
            let spantxt = document.createElement('span');
            spantxt.className = 'span-txt text';
            spantxt.innerHTML = todo;

            divTasks.appendChild(spantxt);

            let spanDt = document.createElement('span');
            spanDt.className = 'span-dt text';
            spanDt.innerHTML = date;

            divTasks.appendChild(spanDt);

            let btnDel = document.createElement('button');
            btnDel.className = "btn-del";
            btnDel.value = `${i}`;
            
            btnDel.innerText = "Delete";
            btnDel.addEventListener("click",function(){
                delTask(btnDel.value);
            });

            divTasks.appendChild(btnDel);

            document.querySelector('.todo-tasks').appendChild(divTasks);
        }
    }
}

function updateLocalStorage(){
    localStorage.removeItem('todoArr');

    localStorage.setItem('todoArr', JSON.stringify(todoArr));
    
}

function delTask(id){
    todoArr.splice(id,1);
    document.querySelector(`#task${id}`).remove();
    updateLocalStorage();
    
}
function addToTodoList(){
    let todoText = document.querySelector('.todo-text');
    if(todoText.value === ""){
        alert("Please add Todo task first.");
        todoText.focus();
        return;
    }
    
    let todoDate = document.querySelector('.todo-date');
    if(todoDate.value === ""){
        alert("Please add date first.");
        todoDate.focus();
        return;
    }
    let newTodo = {todo:todoText.value,
        date:todoDate.value
    };

    if(todoArr.length == 0){
        todoArr.push(newTodo);
    }
    else{
        todoArr.unshift(newTodo);
    }
    updateLocalStorage();
    initializeToDoArr();
    todoText.value = "";
    todoDate.value = "";
    todoText.focus();
}