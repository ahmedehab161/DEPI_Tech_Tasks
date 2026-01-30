/* ---------- Dark / Light ---------- */
const modeBtn = document.getElementById("modeBtn");
modeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};

/* ---------- Pomodoro ---------- */
let time = 25 * 60;
let timer;
const timeEl = document.getElementById("time");

function update() {
  const m = Math.floor(time / 60);
  const s = time % 60;
  timeEl.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}

document.getElementById("start").onclick = () => {
  if (timer) return;
  timer = setInterval(() => {
    time--;
    update();
    if (time <= 0) clearInterval(timer);
  }, 1000);
};

document.getElementById("reset").onclick = () => {
  clearInterval(timer);
  timer = null;
  time = 25 * 60;
  update();
};

update();

/* ---------- Todo ---------- */
const todo = document.getElementById("todo");
const list = document.getElementById("todoList");

document.getElementById("openTodo").onclick = () =>
  todo.classList.add("active");

document.getElementById("closeTodo").onclick = () =>
  todo.classList.remove("active");

document.getElementById("addTodo").onclick = () => {
  const input = document.getElementById("todoInput");
  if (!input.value) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${input.value}</span>
    <button onclick="this.parentElement.remove()">✔</button>
  `;
  list.appendChild(li);
  input.value = "";
};
