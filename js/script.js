const input = document.querySelector(`input`);
const addButton = document.querySelector(`.add__button`);
const todosHTML = document.querySelector(`.todos`);
const emptyText = document.querySelector(`.text`);
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();

function getTodoHTML(todo, index) {
	let checked = todo.status == "completed" ? "checked" : "";
	return /*html*/ `
		<li class="todo">
			<label for="${index}"
				<input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
				<span class="${checked}>">${todo.name}></span>
			</label>
			<button class="delete-btn" data-index="${index}" onclick="remove(this)">
				<i class='bx bx-trash'></i>
			</button>
		</li>
	`;
}

function showTodos() {
	if (todosJson.length === 0) {
		todosHTML.innerHTML = "";
		emptyText.style.display = "block";
	} else {
		todosHTML.innerHTML = todosJson.map(getTodoHTML).join('');
		emptyText.style.display = "none";
	}
}

function addTodo(todo) {
	input.value = "";
	todosJson.unshift({
		name: todo,
		status: "pending"
	});
	localStorage.setItem("todos", JSON.stringify(todosJson));
}

input.addEventListener("keyup", event => {
	let todo = input.value.trim();
	if (!todo || event.key != "Enter") {
		return;
	}
	addTodo(todo);
});

addButton.addEventListener("click", () => {
	let todo = input.value.trim();
	if (!todo) {
		return;
	}
	addTodo(todo);
});