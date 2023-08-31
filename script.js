const addbtn = document.querySelector("#add_btn");
const newTaskInput = document.querySelector("#input-text");
const taskListContainer = document.querySelector("#task-list");
const error = document.getElementById("error-msg");
const countValue = document.querySelector("#counting");
let taskCount = 0;

const updateTaskCount = () => {
  countValue.textContent = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";

  if (!taskName) {
    error.style.display = "block";
    return;
  }

  const task = `
          <div class="task">
            <input type="checkbox" class="task-check" />
            <span class="task-name">${taskName}</span>
            <button class="edits">
              <i class="fas fa-user-edit"></i>
            </button>
            <button class="deletes">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;

  taskListContainer.insertAdjacentHTML("beforeend", task);
  newTaskInput.value = "";
  taskCount++;
  updateTaskCount();

  deleteTask();
  editTask();
  checkTask();
};

const deleteTask = () => {
  const deleteButtons = document.querySelectorAll(".deletes");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.remove();
      taskCount--;
      updateTaskCount();
      return;
    });
  });
};

const editTask = () => {
  const editButtons = document.querySelectorAll(".edits");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskSpan = button.previousElementSibling;
      const taskName = taskSpan.textContent;
      const updatedTaskName = prompt("Edit task:", taskName);

      if (updatedTaskName !== null) {
        taskSpan.textContent = updatedTaskName.trim();
      }
    });
  });
};

const checkTask = () => {
  const checkButtons = document.querySelectorAll(".task-check");
  checkButtons.forEach((button) => {
    button.addEventListener("change", () => {
      const taskSpan = button.nextElementSibling;
      taskSpan.classList.toggle("completed");
      if (button.checked) {
        taskCount--;
      } else {
        taskCount++;
      }
      updateTaskCount();
    });
  });
};

addbtn.addEventListener("click", addTask);
