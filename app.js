const form = document.querySelector("form");
const taskInput = document.getElementById("task")
const dueDateInput = document.getElementById("due-date");
const priorityInput = document.getElementById("priority");
const tasks = [];
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

    const li = document.createElement("li")
    const span = document.createElement("span")
    span.textContent = taskInput.value
    const dueDate = document.createElement("span");
    dueDate.textContent = dueDateInput.value;
    const priority = document.createElement("span");
    priority.textContent = priorityInput.checked ? "★" : "";
    li.appendChild(span)
    li.appendChild(dueDate);
    li.appendChild(priority);
    
    li.addEventListener("click",function(){
        task.completed = !task.completed;
        li.classList.toggle("done")   
    })
    // Add Delete Button
    const removeButton = document.createElement("button")
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        li.remove();
    });
    li.appendChild(removeButton)
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
    li.appendChild(editButton)
    document.querySelector("ul").appendChild(li)
})

