const form = document.querySelector("form");
const taskInput = document.getElementById("task")
const dueDateInput = document.getElementById("due-date");
const priorityInput = document.getElementById("priority");
const savedTasks = localStorage.getItem('tasks');
const tasks = savedTasks ? JSON.parse(savedTasks) : [];

// Render Tasks
function renderTask(task){
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = task.title

    const dueDate = document.createElement("span");
    dueDate.textContent = task.dueDate

    const priority = document.createElement("span");
    priority.textContent = task.priority ? "★" : "";

    li.appendChild(span)
    li.appendChild(dueDate);
    li.appendChild(priority);

    li.addEventListener("click",function(){
        task.completed = !task.completed;
        li.classList.toggle("done")

        localStorage.setItem("tasks", JSON.stringify(tasks))   
    });

    if(task.completed) {
        li.classList.add("done")
    };

    // Add Delete Button
    const removeButton = document.createElement("button")
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        li.remove();
    });


    //Create edit button
    const editButton = document.createElement("button")
    editButton.textContent = "Edit";
    editButton.addEventListener("click",function(event){
        event.stopPropagation()
        const editInput = document.createElement("input");
        editInput.value = span.textContent
        li.replaceChild(editInput,span)
        editInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                span.textContent = editInput.value
                li.replaceChild(span, editInput)
            }
        });

    });

        li.appendChild(removeButton);
        li.appendChild(editButton);

    document.querySelector("ul").appendChild(li);
}


//Submit Handler
form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(taskInput.value);
    
    const task = {
        title: taskInput.value,
        dueDate: dueDateInput.value,
        priority: priorityInput.checked,
        completed: false
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log(tasks);
    renderTask(task)
})

    
//Render

tasks.forEach(task => {
    renderTask(task);
});
