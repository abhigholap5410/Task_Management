document.addEventListener("DOMContentLoaded", function () {
    const parentTaskForm = document.getElementById("parentTaskForm");
    const subTaskForm = document.getElementById("subTaskForm");
    const parentTaskIdInput = document.getElementById("parentTaskId");
    const parentTaskNameInput = document.getElementById("parentTaskName");
    const parentTaskStartDateInput = document.getElementById("parentTaskStartDate");
    const parentTaskEndDateInput = document.getElementById("parentTaskEndDate");
    const parentTaskStatusSelect = document.getElementById("parentTaskStatus");
    let subTaskNameInput = document.getElementById("subTaskName");
    let subTaskStartDateInput = document.getElementById("subTaskStartDate");
    let subTaskEndDateInput = document.getElementById("subTaskEndDate");
   let subTaskStatusSelect = document.getElementById("subTaskStatus");
    let taskTableBody = document.getElementById("taskTableBody");
    let subTaskIdCounter = 1;



    parentTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();
      
        addParentTaskToTable(parentTaskIdInput, parentTaskNameInput, parentTaskStartDateInput, parentTaskEndDateInput, parentTaskStatusSelect);
        
       
        parentTaskForm.style.display = "none";
       subTaskForm.style.display = "block";
        subTaskIdInput = document.getElementById("subTaskId");
        subTaskIdCounter = generateSubTaskId(parentTaskIdInput.value);
        subTaskIdInput.value = subTaskIdCounter; 
        
    });

     

     

    subTaskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addSubTaskToTable(subTaskIdInput, subTaskNameInput, subTaskStartDateInput, subTaskEndDateInput, subTaskStatusSelect);
        subTaskForm.reset();
       subTaskForm.style.display = "none";
       parentTaskForm.style.display = "block";
       subTaskIdCounter++;
        parentTaskForm.reset();
    });


   // let subTaskIdInput = document.getElementById("subTaskId");
    function generateSubTaskId(parentId) {
        return parseInt(parentId)  * 1000 + subTaskIdCounter;
    }
    function updateTaskStatus(startDate, endDate) {
        const currentDate = new Date();
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (endDate < currentDate) {
            return "Due-Passed";
        } else if (startDate <= currentDate && endDate >= currentDate) {
            return "In-Progress";
        } else if (startDate > currentDate) {
            return "Not Started";
        } else {
            return "Completed";
        }
    }





      function addParentTaskToTable(taskIdInput, nameInput, startDateInput, endDateInput, statusSelect) {
        const taskData = {
            id: parseInt(taskIdInput.value),
            name: nameInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
           status: statusSelect.value,
           // status:updateTaskStatus(startDateInput.value, endDateInput.value),
        };

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${taskData.id}</td>
            <td>${taskData.name}</td>
            <td>${taskData.startDate}</td>
            <td>${taskData.endDate}</td>
            <td>${taskData.status}</td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="delete-button">Delete</button</td>
        `;

        taskTableBody.appendChild(newRow);
    }

    function addSubTaskToTable(subTaskIdInput, nameInput, startDateInput, endDateInput, statusSelect) {
        const taskData = {
            id: parseInt(subTaskIdInput.value),
            name: nameInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            status: statusSelect.value,
        };  

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${taskData.id}</td>
            <td>${taskData.name}</td>
            <td>${taskData.startDate}</td>
            <td>${taskData.endDate}</td>
            <td>${taskData.status}</td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="delete-button">Delete</button</td>
        `;

        taskTableBody.appendChild(newRow);
    }
    taskTableBody.addEventListener("click", function (event) {
        const target = event.target;
        if (target.tagName === "BUTTON" && target.classList.contains("edit-button")) {
            const row = target.closest("tr");
            editTask(row);
        }
    });

    function editTask(row) {
        const id = row.querySelector("td:nth-child(1)").textContent;
        const name = row.querySelector("td:nth-child(2)").textContent;
        const startDate = row.querySelector("td:nth-child(3)").textContent;
        const endDate = row.querySelector("td:nth-child(4)").textContent;
        const status = row.querySelector("td:nth-child(5)").textContent;

        if (parentTaskForm.style.display === "none") {
            parentTaskForm.style.display = "block";
            subTaskForm.style.display = "none";
        } else {
            parentTaskForm.style.display = "none";
            subTaskForm.style.display = "block";
        }

        parentTaskIdInput.value = id;
        parentTaskNameInput.value = name;
        parentTaskStartDateInput.value = startDate;
        parentTaskEndDateInput.value = endDate;
        parentTaskStatusSelect.value = status;
        subTaskIdInput.value = id;
        subTaskNameInput.value = name;
        subTaskStartDateInput.value = startDate;
        subTaskEndDateInput.value = endDate;
        subTaskStatusSelect.value = status;
    }

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const row = button.closest("tr");
            taskTableBody.removeChild(row);
        });
    });

 


 
});


