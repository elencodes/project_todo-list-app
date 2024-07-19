const section = document.querySelector(`.container`);
const input = document.querySelector(`input`);
const inputPlaceholder = input.placeholder;
const addButton = document.querySelector(`.add__button`);
const todosHTML = document.querySelector(`.todos`);
const emptyText = document.querySelector(`.text`);
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

showTodos();

function getTodoHTML(todo, index) {
	if (filter && filter != todo.status) {
		return '';
	}
	let checked = todo.status == "completed" ? "checked" : "";
	return /*html*/ `
		<li class="todo">
			<label for="${index}">
				<input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
				<span class="${checked}">${todo.name}</span>
			</label>
			<button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class='bx bx-trash'></i></button>
		</li>`;
}

function showTodos() {
	if (todosJson.length == 0) {
		todosHTML.innerHTML = '';
		emptyText.style.display = 'block';
	} else {
		todosHTML.innerHTML = todosJson.map(getTodoHTML).join('');
		emptyText.style.display = 'none';
	}
}

function addTodo(todo) {
	input.value = "";
	todosJson.unshift({
		name: todo,
		status: "pending"
	});
	localStorage.setItem("todos", JSON.stringify(todosJson));
	showTodos();
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

function updateStatus(todo) {
	let todoName = todo.parentElement.lastElementChild;
	if (todo.checked) {
		todoName.classList.add("checked");
		todosJson[todo.id].status = "completed";
	} else {
		todoName.classList.remove("checked");
		todosJson[todo.id].status = "pending";
	}
	localStorage.setItem("todos", stringify(todosJson));
}

function remove(todo) {
	const index = todo.dataset.index;
	todosJson.splice(index, 1);
	showTodos();
	localStorage.setItem("todos", stringify(todosJson));
}

filters.forEach(function (el) {
	el.addEventListener("click", (e) => {
		if (el.classList.contains('active')) {
			el.classList.remove('active');
			filter = '';
		} else {
			filters.forEach(tag => tag.classList.remove('active'));
			el.classList.add('active');
			filter = e.target.dataset.filter;
		}
		showTodos();
	});
});

input.addEventListener(`focus`, function (event) {
	input.placeholder = "";
	input.classList.add('focus');
});

input.addEventListener(`blur`, function (event) {
	input.placeholder = inputPlaceholder;
	input.classList.remove('focus');
});

section.addEventListener(`change`, function (event) {
	//добавление стилей для кнопки (кнопка станет активной, есть хотя бы одна задачв)
	if (todosHTML !== "") {
		deleteAllButton.disabled = false;
		deleteAllButton.style.backgroundColor = "#828dff";
		deleteAllButton.style.color = "#FFFFFF";
	} else {
		//возврат стилей к исходному состоянию (кнопка станет неактивной, если задач нет)
		deleteAllButton.disabled = true;
		deleteAllButton.style.color = "#ffffff55";
	}
});

deleteAllButton.addEventListener("click", () => {
	deleteAllButton.disabled = true;
	deleteAllButton.style.backgroundColor = "transparent";
	deleteAllButton.style.color = "#ffffff55";
	todosJson = [];
	localStorage.setItem("todos", JSON.stringify(todosJson));
	showTodos();
});