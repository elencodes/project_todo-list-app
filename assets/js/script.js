const taskInput = document.querySelector(`#task`);
const taskList = document.querySelector(`#taskList`);

function createTask() {
	const taskInputValue = taskInput.value;
	const taskListElement = document.createElement(`li`);
	taskListElement.style.paddingTop = "1rem";
	taskListElement.textContent = taskInputValue;
	taskList.append(taskListElement);
	taskInput.value = ``;
}

const button = document.querySelector(`#addTask`);
button.addEventListener(`click`, createTask);

taskList.addEventListener(`click`, function (event) {
	if (event.target.tagName === `LI`) {
		event.target.classList.toggle(`completed`);
	}
});