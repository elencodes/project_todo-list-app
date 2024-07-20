const section = document.querySelector(`.container`);
const input = document.querySelector(`input`);
const inputPlaceholder = input.placeholder;
const addButton = document.querySelector(`.add__button`);
const todosHTML = document.querySelector(`.todos`);
const emptyText = document.querySelector(`.text`);
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';
//Забираем данные из localStorage в виде массива данных либо получаем пустой массив
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();

//Функция фильтрации и корректировки HTML кода для создания новой задачи
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

//Функция отображения списка задач
function showTodos() {
	//проверка: если в localStorage нет массива данных
	//то обнуляем HTML код списка задач и выводим сообщение, что список пуст
	if (todosJson.length == 0) {
		todosHTML.innerHTML = '';
		emptyText.style.display = 'block';
	} else {
		//если в localStorage есть данные, то создаем HTML код списка задач
		//и скрываем сообщение, что список пуст
		todosHTML.innerHTML = todosJson.map(getTodoHTML).join('');
		emptyText.style.display = 'none';
	}
}

//Функция добавления данных задачи в localStorage
function addTodo(todo) {
	//очищаем поле ввода после отправки задачи в список
	input.value = "";
	//добавляем новую задачу в начало массива / в начало списка localStorage
	todosJson.unshift({
		name: todo,
		status: "pending"
	});
	//преобразовываем объект в строку и отправляем данные в localStorage
	localStorage.setItem("todos", JSON.stringify(todosJson));
	//функция отображения списка задач
	showTodos();
}

//Добавление новой задачи при клике на Enter на клавиатуре
input.addEventListener("keyup", event => {
	let todo = input.value.trim();
	if (!todo || event.key != "Enter") {
		return;
	}
	addTodo(todo);
});

//Добавление новой задачи при клике на кнопку "добавить"
addButton.addEventListener("click", () => {
	let todo = input.value.trim();
	if (!todo) {
		return;
	}
	addTodo(todo);
});

//Функция обновления статуса задачи
function updateStatus(todo) {
	let todoName = todo.parentElement.lastElementChild;
	if (todo.checked) {
		todoName.classList.add("checked");
		todosJson[todo.id].status = "completed";
	} else {
		todoName.classList.remove("checked");
		todosJson[todo.id].status = "pending";
	}
	//сохранение обновленного массива задач в localStorage
	localStorage.setItem("todos", JSON.stringify(todosJson));
}

//Функция удаления данных задачи из localStorage
function remove(todo) {
	const index = todo.dataset.index;
	//удаляем задачу из массива с задачами
	todosJson.splice(index, 1);
	//функция отображения списка задач
	showTodos();
	//преобразовываем объект в строку и отправляем данные в localStorage
	localStorage.setItem("todos", stringify(todosJson));
}

//Обработка фильтров
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
		//функция отображения списка задач
		showTodos();
	});
});

//Событие focus активируется, когда поле ввода получает фокус
//очищаем placeholder и добавляем класс focus для поля ввода
input.addEventListener('focus', function (event) {
	input.placeholder = "";
	input.classList.add('focus');
});
//Событие blur срабатывает, когда поле ввода теряет фокус
//возврат стилей к исходному состоянию
input.addEventListener('blur', function (event) {
	input.placeholder = inputPlaceholder;
	input.classList.remove('focus');
});


//Событие change срабатывает при изменении значения элемента (поля ввода) на странице
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

//Событие для кнопки очистки
deleteAllButton.addEventListener("click", () => {
	deleteAllButton.disabled = true;
	deleteAllButton.style.backgroundColor = "transparent";
	deleteAllButton.style.color = "#ffffff55";
	//Очищаем массив данных
	todosJson = [];
	//преобразовываем объект в строку и отправляем данные в localStorage
	localStorage.setItem("todos", JSON.stringify(todosJson));
	//функция отображения списка задач
	showTodos();
});