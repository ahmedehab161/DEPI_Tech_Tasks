let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const tasksEl = document.getElementById("tasks");
const emptyEl = document.getElementById("empty");
const input = document.getElementById("taskInput");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  tasksEl.innerHTML = "";

  const filtered = tasks.filter(
    (t) =>
      filter === "all" ||
      (filter === "active" && !t.done) ||
      (filter === "done" && t.done),
  );

  emptyEl.style.display = filtered.length ? "none" : "block";

  filtered.forEach((task, i) => {
    const div = document.createElement("div");
    div.className = "task" + (task.done ? " done" : "");

    div.innerHTML = `
      <div class="left">
        <input type="checkbox" ${task.done ? "checked" : ""}>
        <span>${task.text}</span>
      </div>
      <div>
        <i class='bx bx-edit'></i>
        <i class='bx bx-trash'></i>
      </div>
    `;

    div.querySelector("input").onclick = () => {
      task.done = !task.done;
      save();
      render();
    };

    div.querySelector(".bx-trash").onclick = () => {
      tasks.splice(i, 1);
      save();
      render();
    };

    div.querySelector(".bx-edit").onclick = () => {
      const text = prompt("Edit task", task.text);
      if (text) task.text = text;
      save();
      render();
    };

    tasksEl.appendChild(div);
  });
}

document.getElementById("addBtn").onclick = () => {
  if (!input.value.trim()) return;
  tasks.push({ text: input.value, done: false });
  input.value = "";
  save();
  render();
};

document.querySelectorAll(".filters span").forEach((span) => {
  span.onclick = () => {
    document.querySelector(".filters .active").classList.remove("active");
    span.classList.add("active");
    filter = span.dataset.filter;
    render();
  };
});

document.querySelector(".theme-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

render();
