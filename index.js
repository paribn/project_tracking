let inprogressContainer = document.querySelector('.inprogress-container');
let doneContainer = document.querySelector('.done-container');
let todoContainer = document.querySelector('.todo-container');
let review = document.querySelector('.review');
let elements = document.getElementsByClassName('element');
let form = document.querySelector('form');

let tasks = [];


form.addEventListener('submit', AddTask);



function AddTask(e) {
    e.preventDefault();
    let inputs = form.elements;

    let taskName = inputs['name'];
    let storyPoint = inputs['story-point'];
    let assigner = inputs['assinger'];

    let task = {
        name: taskName,
        point: Number(storyPoint.value),
        assigner: assigner.value,
        stage: 'TODO',
        createdAt: new Date()

    }
    tasks.push(task)

    taskName = "";
    storyPoint = "";
    assigner = "";  // value yoxdur
    List();
    console.log(task);

}

function List() {

    todoContainer.innerHTML = '',

        tasks.forEach(task,index=> {
            switch (task.stage) {
                case "TODO":
                    todoContainer.innerHTML += `<div  class="element" data-id-${index} draggable="true">${task.name}</div>`
                    break;
                case "IN_PROGRESS":
                    inprogressContainer.innerHTML += `<div  class="element" data-id-${index} draggable="true">${task.name}</div>`
                    break;
                case "REVIEW":
                    review.innerHTML += `<div  class="element" data-id-${index} draggable="true">${task.name}</div>`
                    break;
                case "DONE":
                    doneContainer.innerHTML += `<div  class="element" data-id-${index} draggable="true">${task.name}</div>`
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

            [inprogressContainer, doneContainer, todoContainer, review].forEach(container => {

                container.addEventListener('dragover', function (e) {
                    e.preventDefault();
                });

                container.addEventListener('drop', function (e) {
                    e.preventDefault();
                    if (element) {
                        container.appendChild(element);

                    }
                    element = null;
                });
            });

        })
    }

}