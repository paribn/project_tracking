let inprogressContainer = document.querySelector('.inprogress-container');
let doneContainer = document.querySelector('.done-container');
let todoContainer = document.querySelector('.todo-container');
let reviewContainer = document.querySelector('.review-container');
let elements = document.getElementsByClassName('element');
let form = document.querySelector('form');
let update = document.querySelector('.update');
let stageRow = document.querySelector('.stage-row');



let inputs = form.elements;
let taskName = inputs['task-name'];
let storyPoint = inputs['story-point'];
let assigner = inputs['assinger'];
let stage = inputs['stage'];

let tasks = [];


form.addEventListener('submit', AddTask);



function AddTask(e) {
    e.preventDefault();

    let task = {
        name: taskName.value,
        point: Number(storyPoint.value),
        assigner: assigner.value,
        stage: stage.value || 'TODO',
        createdAt: new Date()

    }
    
    tasks.push(task)
    ClearInput();

    stageRow.classList.add('hide');
    stageRow.value=''

    List();

}

function ClearInput() {

    taskName.value = "";
    storyPoint.value = "";
    assigner.value = "";
}

function List() {

    todoContainer.innerHTML = '';
    inprogressContainer.innerHTML = "";
    reviewContainer.innerHTML = "";
    doneContainer.innerHTML = "";


    let sortedTask = tasks.sort((x, y) => x.createdAt - y.createdAt)

    sortedTask.forEach((task, index) => {
        let taskElement = `<div  class="element" data-id="${index}" draggable="true">${task.name} <span>${task.point}</span></div>`

        switch (task.stage) {
            case "TODO":
                todoContainer.innerHTML += taskElement;
                break;
            case "IN_PROGRESS":
                inprogressContainer.innerHTML += taskElement;
                break;
            case "REVIEW":
                reviewContainer.innerHTML += taskElement;
                break;
            case "DONE":
                doneContainer.innerHTML += taskElement;
                break;
        }
    });

    Draggable();
}

function Draggable() {
    for (const element of elements) {

        element.addEventListener('dragstart', function (e) {
            let element = e.target;

            inprogressContainer.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            [inprogressContainer, doneContainer, todoContainer, reviewContainer].forEach(container => {

                container.addEventListener('dragover', function (e) {
                    e.preventDefault();
                  
                });
             
                container.addEventListener('drop', function (e) {

                    e.preventDefault();
                    let stage = container.getAttribute('data-name');
                    if (element) {
                        container.appendChild(element);
                        let id = Number(element.getAttribute('data-id'))
                        let task = tasks[id];
                        let updateTask = { ...task, stage: stage };

                        tasks.splice(id, 1, updateTask)
                        List();

                    }
                    element = null;
                });

            });

        })
        element.addEventListener('click', Update);

    }

}

let updateId = null;
function Update(e) {

    let element = e.target;
    let id = Number(element.getAttribute('data-id'))
    let task = tasks[id];


    updateId = id;

    inputs['task-name'].value = task.name;
    inputs['story-point'].value = task.point;
    inputs['assinger'].value = task.assigner;
    inputs['stage'].value = task.stage;

    update.classList.remove('hide');
    stageRow.classList.remove('hide');
}
update.addEventListener('click', UpdateTask)

function UpdateTask() {


    let findTask = tasks[updateId];
    findTask.name = taskName.value;
    findTask.point =storyPoint.value;
    findTask.assigner=assigner.value;
    findTask.stage=stage.value;
    tasks.splice(updateId,1,findTask)
    List();


        ClearInput();
    update.classList.add('hide');
    stageRow.classList.add('hide');


    updateId = null;


}