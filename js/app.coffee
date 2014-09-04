#############################  Variables  ##############################


# DOM elements

addInput = document.getElementById("new-task")
addButton = document.getElementsByTagName("button")[0]
incompleteTasks = document.getElementById("incomplete-tasks")
completedTasks = document.getElementById("completed-tasks")


#############################  Functions  ###############################

# Helper - create new task element

createNewTaskElement = (inputString) ->
  # Create
  listItem = document.createElement "li"
  checkBox = document.createElement "input"
  label = document.createElement "label"
  inputText = document.createElement "input"
  editButton = document.createElement "button"
  deleteButton = document.createElement "button"
  # Modify
  checkBox.type = "checkbox"
  inputText.type = "text"
  editButton.innerHTML = "Edit"
  editButton.className = "edit"
  deleteButton.innerHTML = "Delete"
  deleteButton.className = "delete"
  label.innerText = inputString
  # Append
  listItem.appendChild checkBox
  listItem.appendChild label
  listItem.appendChild inputText
  listItem.appendChild editButton
  listItem.appendChild deleteButton

  return listItem

# Event handlers

funAddTask = ->
  listItem = createNewTaskElement(addInput.value)
  incompleteTasks.appendChild(listItem)
  funBindTaskEvents(listItem, funTaskCompleted)
  addInput.value = ""

funEditTask = ->
  listItem = this.parentNode
  editInput = listItem.querySelector("input[type=\"text\"]")
  label = listItem.querySelector("label")
  if listItem.classList.contains("editMode")
    label.innerText = editInput.value
  else
    editInput.value = label.innerText
  listItem.classList.toggle("editMode")

funDeleteTask = ->
  listItem = this.parentNode
  ul = listItem.parentNode
  ul.removeChild(listItem)

funTaskCompleted = ->
  listItem = this.parentNode
  completedTasks.appendChild(listItem)
  funBindTaskEvents(listItem, funTaskIncomplete)

funTaskIncomplete = ->
  listItem = this.parentNode
  incompleteTasks.appendChild(listItem)
  funBindTaskEvents(listItem, funTaskCompleted)

# Helper - Bind task events

funBindTaskEvents = (taskListItem, checkBoxEventHandler) ->
  # select li children
  checkBox = taskListItem.querySelector "input[type=\"checkbox\"]"
  editButton = taskListItem.querySelector ".edit"
  deleteButton = taskListItem.querySelector ".delete"
  # bind event handlers to children elements
  editButton.onclick = funEditTask
  deleteButton.onclick = funDeleteTask
  checkBox.onchange = checkBoxEventHandler


#############################  Main Program  #############################

# Bind event handler on add button
addButton.addEventListener("click", funAddTask)

# Iterate over children of incompleteTasks and bind functions
incompleteTasksChildren = incompleteTasks.children
for listItem in incompleteTasksChildren
  funBindTaskEvents(listItem, funTaskCompleted)

# Iterate over children of completedTasks and bind functions
completedTasksChildren = completedTasks.children
for listItem in completedTasksChildren
  funBindTaskEvents(listItem, funTaskIncomplete)