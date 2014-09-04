(function() {
  var addButton, addInput, completedTasks, completedTasksChildren, createNewTaskElement, funAddTask, funBindTaskEvents, funDeleteTask, funEditTask, funTaskCompleted, funTaskIncomplete, incompleteTasks, incompleteTasksChildren, listItem, _i, _j, _len, _len1;

  addInput = document.getElementById("new-task");

  addButton = document.getElementsByTagName("button")[0];

  incompleteTasks = document.getElementById("incomplete-tasks");

  completedTasks = document.getElementById("completed-tasks");

  createNewTaskElement = function(inputString) {
    var checkBox, deleteButton, editButton, inputText, label, listItem;
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    inputText = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");
    checkBox.type = "checkbox";
    inputText.type = "text";
    editButton.innerHTML = "Edit";
    editButton.className = "edit";
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";
    label.innerText = inputString;
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(inputText);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
  };

  funAddTask = function() {
    var listItem;
    listItem = createNewTaskElement(addInput.value);
    incompleteTasks.appendChild(listItem);
    funBindTaskEvents(listItem, funTaskCompleted);
    return addInput.value = "";
  };

  funEditTask = function() {
    var editInput, label, listItem;
    listItem = this.parentNode;
    editInput = listItem.querySelector("input[type=\"text\"]");
    label = listItem.querySelector("label");
    if (listItem.classList.contains("editMode")) {
      label.innerText = editInput.value;
    } else {
      editInput.value = label.innerText;
    }
    return listItem.classList.toggle("editMode");
  };

  funDeleteTask = function() {
    var listItem, ul;
    listItem = this.parentNode;
    ul = listItem.parentNode;
    return ul.removeChild(listItem);
  };

  funTaskCompleted = function() {
    var listItem;
    listItem = this.parentNode;
    completedTasks.appendChild(listItem);
    return funBindTaskEvents(listItem, funTaskIncomplete);
  };

  funTaskIncomplete = function() {
    var listItem;
    listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    return funBindTaskEvents(listItem, funTaskCompleted);
  };

  funBindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox, deleteButton, editButton;
    checkBox = taskListItem.querySelector("input[type=\"checkbox\"]");
    editButton = taskListItem.querySelector(".edit");
    deleteButton = taskListItem.querySelector(".delete");
    editButton.onclick = funEditTask;
    deleteButton.onclick = funDeleteTask;
    return checkBox.onchange = checkBoxEventHandler;
  };

  addButton.addEventListener("click", funAddTask);

  incompleteTasksChildren = incompleteTasks.children;

  for (_i = 0, _len = incompleteTasksChildren.length; _i < _len; _i++) {
    listItem = incompleteTasksChildren[_i];
    funBindTaskEvents(listItem, funTaskCompleted);
  }

  completedTasksChildren = completedTasks.children;

  for (_j = 0, _len1 = completedTasksChildren.length; _j < _len1; _j++) {
    listItem = completedTasksChildren[_j];
    funBindTaskEvents(listItem, funTaskIncomplete);
  }

}).call(this);

 //# sourceMappingURL=app.js.map