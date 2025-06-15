let taskUnsubscribe = null; 

window.addEventListener("DOMContentLoaded", () => {
  const loginHeading = document.getElementById("login-heading");
  const authSection = document.getElementById("auth");

  if (authSection.style.display === "none") {
    loginHeading.style.display = "none";
  }
});
function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorElement = document.getElementById("error");

  if (!email || !password) {
    errorElement.innerText = "Please enter email and password.";
    errorElement.style.color = "red";
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      errorElement.style.color = "green";
      errorElement.innerText = "Registered successfully!";
      document.getElementById("auth").style.display = "none";
      document.getElementById("task-board").style.display = "block";
      document.getElementById("login-heading").style.display = "none";
    })
    .catch((error) => {
      errorElement.style.color = "red";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorElement.innerText = "This email is already registered. Try logging in.";
          break;
        case "auth/invalid-email":
          errorElement.innerText = "Invalid email format.";
          break;
        case "auth/weak-password":
          errorElement.innerText = "Password should be at least 6 characters.";
          break;
        default:
          errorElement.innerText = error.message; // fallback
      }
    });
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorElement = document.getElementById("error");

  if (!email || !password) {
    errorElement.innerText = "Please enter email and password.";
    errorElement.style.display = "block";
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // Clear error
      errorElement.innerText = "";
      errorElement.style.display = "none";

      document.getElementById("auth").style.display = "none";
      document.getElementById("task-board").style.display = "block";

      document.getElementById("login-heading").style.display = "none";
    })
    .catch((error) => {
      errorElement.style.color = "red";
      if (error.code === "auth/user-not-found") {
        errorElement.innerText = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorElement.innerText = "Incorrect password. Please try again.";
      } else {
        errorElement.innerText = error.message;
      }
      errorElement.style.display = "block";
    });
}

// Logout
// function logout() {
//   auth.signOut();
// }
function logout() {
  auth.signOut().then(() => {
    if (taskUnsubscribe) {
      taskUnsubscribe(); // Stop listening to old user's tasks
      taskUnsubscribe = null;
    }
  });
}

auth.onAuthStateChanged((user) => {
  const loginHeading = document.getElementById("login-heading");
  const authSection = document.getElementById("auth");
  const taskBoard = document.getElementById("task-board");

  if (user) {
    authSection.style.display = "none";
    taskBoard.style.display = "block";
    loginHeading.style.display = "none"; // Hide heading when logged in
    document.body.classList.remove("no-scroll");
    loadTasks();
  } else {
    authSection.style.display = "block";
    taskBoard.style.display = "none";

    loginHeading.style.display = "block";
    document.body.classList.add("no-scroll");
  }
});

//Create Task
function createTask() {
  const title = document.getElementById("task-title").value;
  const assignedTo = document.getElementById("assigned-to").value;
  const description = document.getElementById("task-desc").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;
  
  if (!title || !assignedTo || !description) {
    alert("Please fill in title, assigned person, and description.");
    return;
  }

const user = auth.currentUser;
db.collection("tasks")
  .add({
    title,
    description,
    assignedTo,
    status: "To Do",
    dueDate,
    priority,
    createdAt: firebase.firestore.Timestamp.now(),
    userId: user.uid,
  })
  .then((docRef) => {
    console.log("✅ Task created with ID: ", docRef.id);
    alert("Task created successfully");

    // clear form
    document.getElementById("task-title").value = "";
    document.getElementById("assigned-to").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("priority").value = "Low";
  })
  .catch((error) => {
    console.error("❌ Error creating task:", error);
    alert("Error creating task: " + error.message);
  });

}
function loadTasks() {
  if (taskUnsubscribe) {
    taskUnsubscribe();
  }

  const user = auth.currentUser;

  taskUnsubscribe = db
    .collection("tasks")
    .where("userId", "==", user.uid) s
    .onSnapshot((snapshot) => {
      let tasks = [];
      snapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      renderTasks(tasks);
    });
}



// Render Tasks into Columns
function renderTasks(tasks) {
  ["todo", "inprogress", "done"].forEach((col) => {
    const colorMap = {
      todo: "red",
      inprogress: "orange",
      done: "green",
    };

    document.getElementById(col).innerHTML = `
    <div class="column-header" style="border-bottom: 3px solid ${
      colorMap[col]
    }; padding-bottom: 5px;">
      <h3>${col.replace(/([A-Z])/g, " $1").toUpperCase()}</h3>
    </div>`;
  });

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-priority", task.priority);

    // Dragging functionality
    div.setAttribute("draggable", "true");
    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("taskId", task.id);
    });

    div.innerHTML = `
        <div class="task-header">
          <div class="task-title">${task.title}</div>
          <div class="badge">${task.priority}</div>
        </div>
        <p>${task.description}</p>
        <div class="task-meta">
          <div>👤 ${task.assignedTo}</div>
          <div>📅 ${task.dueDate || "No due date"}</div>
        </div>
        <div class="task-actions">
          <button class="btn btn-primary" onclick="moveTask('${
            task.id
          }', '${getNextStatus(task.status)}')">
            ${getStatusButtonText(task.status)}
          </button>
          <button class="btn btn-danger" onclick="deleteTask('${task.id}')">
            Delete
          </button>
        </div>
      `;
    const columnId = task.status?.toLowerCase().replace(" ", "");
const column = document.getElementById(columnId);

if (column) {
  column.appendChild(div);
} else {
  console.warn("⚠️ Column not found for task status:", task.status);
}

  });

  // Enable dropping into columns
  ["todo", "inprogress", "done"].forEach((columnId) => {
    const column = document.getElementById(columnId);

    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    column.addEventListener("drop", async (e) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("taskId");
      let newStatus = "";

      if (columnId === "todo") newStatus = "To Do";
      else if (columnId === "inprogress") newStatus = "In Progress";
      else if (columnId === "done") newStatus = "Done";

      await db.collection("tasks").doc(taskId).update({
        status: newStatus,
      });
    });
  });
}

// Move Task
function moveTask(id, status) {
  db.collection("tasks").doc(id).update({ status });
}
function getNextStatus(currentStatus) {
  if (!currentStatus || typeof currentStatus !== "string") {
    console.warn("⚠️ getNextStatus called with invalid status:", currentStatus);
    return "inprogress"; // default next status
  }

  const statusFlow = ["todo", "inprogress", "done"];
  const currentIndex = statusFlow.indexOf(currentStatus.toLowerCase());
  return currentIndex < statusFlow.length - 1
    ? statusFlow[currentIndex + 1]
    : statusFlow[0];
}
function getStatusButtonText(status) {
  if (!status || typeof status !== "string") {
    console.warn("⚠️ getStatusButtonText called with invalid status:", status);
    return "Move";
  }

  return (
    {
      todo: "Start Progress →",
      inprogress: "Mark Done ✓",
      done: "Re-open ↺",
    }[status.toLowerCase()] || "Move"
  );
}


function searchTasks() {
  let input = document.getElementById("search").value.toLowerCase();
  let tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    let taskTitle = task.querySelector(".task-title").textContent.toLowerCase();
    if (taskTitle.includes(input)) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  });
}
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    db.collection("tasks").doc(id).delete();
  }
}

