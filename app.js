
// function register() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     auth.createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         document.getElementById('error').innerText = "Registered successfully! Please login.";
//       })
//       .catch((error) => {
//         document.getElementById('error').innerText = error.message;
//       });
// }

// // Login
// function login() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     auth.signInWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         document.getElementById('error').innerText = "";
//       })
//       .catch((error) => {
//         document.getElementById('error').innerText = error.message;
//       });
// }

// // Logout
// function logout() {
//     auth.signOut();
// }

// // Listen for Auth changes
// auth.onAuthStateChanged(user => {
//     if (user) {
//         document.getElementById('auth').style.display = 'none';
//         document.getElementById('task-board').style.display = 'block';
//         loadTasks();
//     } else {
//         document.getElementById('auth').style.display = 'block';
//         document.getElementById('task-board').style.display = 'none';
//     }
// });

// // Create Task
// function createTask() {
//     const title = document.getElementById('task-title').value;
//     const assignedTo = document.getElementById('assigned-to').value;
//     const description = document.getElementById('task-desc').value;
//     const dueDate = document.getElementById('due-date').value;
//     const priority = document.getElementById('priority').value;

//     db.collection('tasks').add({
//         title,
//         description,
//         assignedTo,
//         status: 'To Do',
//         dueDate,
//         priority,
//         createdAt: new Date()
//     }).then(() => {
//         document.getElementById('task-title').value = '';
//         document.getElementById('assigned-to').value = '';
//         document.getElementById('task-desc').value = '';
//         document.getElementById('due-date').value = '';
//         document.getElementById('priority').value = 'Low';
//     });
// }

// // Load and Render Tasks
// function loadTasks() {
//     db.collection('tasks').orderBy('createdAt').onSnapshot(snapshot => {
//         let tasks = [];
//         snapshot.forEach(doc => {
//             tasks.push({ id: doc.id, ...doc.data() });
//         });
//         renderTasks(tasks);
//     });
// }

// // Move Task
// function moveTask(id, status) {
//     db.collection('tasks').doc(id).update({ status });
// }

// // Delete Task
// function deleteTask(id) {
//     db.collection('tasks').doc(id).delete();
// }
// // Update the task div creation in renderTasks function
// function renderTasks(tasks) {
//     // Clear columns
//     ['todo', 'inprogress', 'done'].forEach(col => {
//       document.getElementById(col).innerHTML = `
//         <div class="column-header">
//           <h3>${col.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
//         </div>`;
//     });
  
//     tasks.forEach(task => {
//       const div = document.createElement('div');
//       div.className = 'task';
//       div.setAttribute('data-priority', task.priority);
//       div.innerHTML = `
//         <div class="task-header">
//           <div class="task-title">${task.title}</div>
//           <div class="badge">${task.priority}</div>
//         </div>
//         <p>${task.description}</p>
//         <div class="task-meta">
//           <div>👤 ${task.assignedTo}</div>
//           <div>📅 ${task.dueDate || "No due date"}</div>
//         </div>
//         <div class="task-actions">
//           <button class="btn btn-primary" onclick="moveTask('${task.id}', '${getNextStatus(task.status)}')">
//             ${getStatusButtonText(task.status)}
//           </button>
//           <button class="btn btn-danger" onclick="deleteTask('${task.id}')">
//             Delete
//           </button>
//         </div>`;
      
//       document.getElementById(task.status.toLowerCase().replace(' ', '')).appendChild(div);
//     });
//   }
  
//   // Helper functions
//   function getNextStatus(currentStatus) {
//     const statusFlow = ['todo', 'inprogress', 'done'];
//     const currentIndex = statusFlow.indexOf(currentStatus.toLowerCase());
//     return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : statusFlow[0];
//   }
  
//   function getStatusButtonText(status) {
//     return {
//       todo: 'Start Progress →',
//       inprogress: 'Mark Done ✓',
//       done: 'Re-open ↺'
//     }[status.toLowerCase()] || 'Move';
 
// function register() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     auth.createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         document.getElementById('error').innerText = "Registered successfully! Please login.";
//       })
//       .catch((error) => {
//         document.getElementById('error').innerText = error.message;
//       });
// }

// // Login
// function login() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     auth.signInWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         document.getElementById('error').innerText = "";
//       })
//       .catch((error) => {
//         document.getElementById('error').innerText = error.message;
//       });
// }

// // Logout
// function logout() {
//     auth.signOut();
// }

// // Listen for Auth changes
// auth.onAuthStateChanged(user => {
//     if (user) {
//         document.getElementById('auth').style.display = 'none';
//         document.getElementById('task-board').style.display = 'block';
//         loadTasks();
//     } else {
//         document.getElementById('auth').style.display = 'block';
//         document.getElementById('task-board').style.display = 'none';
//     }
// });

// // Create Task
// function createTask() {
//     const title = document.getElementById('task-title').value;
//     const assignedTo = document.getElementById('assigned-to').value;
//     const description = document.getElementById('task-desc').value;
//     const dueDate = document.getElementById('due-date').value;
//     const priority = document.getElementById('priority').value;

//     db.collection('tasks').add({
//         title,
//         description,
//         assignedTo,
//         status: 'To Do',
//         dueDate,
//         priority,
//         createdAt: new Date()
//     }).then(() => {
//         document.getElementById('task-title').value = '';
//         document.getElementById('assigned-to').value = '';
//         document.getElementById('task-desc').value = '';
//         document.getElementById('due-date').value = '';
//         document.getElementById('priority').value = 'Low';
//     });
// }

// // Load and Render Tasks
// function loadTasks() {
//     db.collection('tasks').orderBy('createdAt').onSnapshot(snapshot => {
//         let tasks = [];
//         snapshot.forEach(doc => {
//             tasks.push({ id: doc.id, ...doc.data() });
//         });
//         renderTasks(tasks);
//     });
// }

// // Render Tasks into Columns
// function renderTasks(tasks) {
//     ['todo', 'inprogress', 'done'].forEach(col => {
//       document.getElementById(col).innerHTML = `
//         <div class="column-header">
//           <h3>${col.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
//         </div>`;
//     });

//     tasks.forEach(task => {
//       const div = document.createElement('div');
//       div.className = 'task';
//       div.setAttribute('data-priority', task.priority);

//       // Dragging functionality
//       div.setAttribute('draggable', 'true');
//       div.addEventListener('dragstart', (e) => {
//         e.dataTransfer.setData('taskId', task.id);
//       });

//       div.innerHTML = `
//         <div class="task-header">
//           <div class="task-title">${task.title}</div>
//           <div class="badge">${task.priority}</div>
//         </div>
//         <p>${task.description}</p>
//         <div class="task-meta">
//           <div>👤 ${task.assignedTo}</div>
//           <div>📅 ${task.dueDate || "No due date"}</div>
//         </div>
//         <div class="task-actions">
//           <button class="btn btn-primary" onclick="moveTask('${task.id}', '${getNextStatus(task.status)}')">
//             ${getStatusButtonText(task.status)}
//           </button>
//           <button class="btn btn-danger" onclick="deleteTask('${task.id}')">
//             Delete
//           </button>
//         </div>
//       `;

//       document.getElementById(task.status.toLowerCase().replace(' ', '')).appendChild(div);
//     });

//     // Enable dropping into columns
//     ['todo', 'inprogress', 'done'].forEach(columnId => {
//         const column = document.getElementById(columnId);

//         column.addEventListener('dragover', (e) => {
//             e.preventDefault();
//         });

//         column.addEventListener('drop', async (e) => {
//             e.preventDefault();
//             const taskId = e.dataTransfer.getData('taskId');
//             let newStatus = '';

//             if (columnId === 'todo') newStatus = 'To Do';
//             else if (columnId === 'inprogress') newStatus = 'In Progress';
//             else if (columnId === 'done') newStatus = 'Done';

//             await db.collection('tasks').doc(taskId).update({
//               status: newStatus
//             });
//         });
//     });
// }

// // Move Task
// function moveTask(id, status) {
//     db.collection('tasks').doc(id).update({ status });
// }

// // Delete Task
// function deleteTask(id) {
//     db.collection('tasks').doc(id).delete();
// }

// // Helper functions
// function getNextStatus(currentStatus) {
//     const statusFlow = ['todo', 'inprogress', 'done'];
//     const currentIndex = statusFlow.indexOf(currentStatus.toLowerCase());
//     return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : statusFlow[0];
// }

// function getStatusButtonText(status) {
//     return {
//       todo: 'Start Progress →',
//       inprogress: 'Mark Done ✓',
//       done: 'Re-open ↺'
//     }[status.toLowerCase()] || 'Move';
// }

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        document.getElementById('error').innerText = "Registered successfully! Please login.";
      })
      .catch((error) => {
        document.getElementById('error').innerText = error.message;
      });
}

// Login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        document.getElementById('error').innerText = "";
      })
      .catch((error) => {
        document.getElementById('error').innerText = error.message;
      });
}

// Logout
function logout() {
    auth.signOut();
}

// Listen for Auth changes
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('task-board').style.display = 'block';
        loadTasks();
    } else {
        document.getElementById('auth').style.display = 'block';
        document.getElementById('task-board').style.display = 'none';
    }
});

// Create Task
function createTask() {
    const title = document.getElementById('task-title').value;
    const assignedTo = document.getElementById('assigned-to').value;
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    db.collection('tasks').add({
        title,
        description,
        assignedTo,
        status: 'To Do',
        dueDate,
        priority,
        createdAt: new Date()
    }).then(() => {
        document.getElementById('task-title').value = '';
        document.getElementById('assigned-to').value = '';
        document.getElementById('task-desc').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = 'Low';
    });
}

// Load and Render Tasks
function loadTasks() {
    db.collection('tasks').orderBy('createdAt').onSnapshot(snapshot => {
        let tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        renderTasks(tasks);
    });
}

// Render Tasks into Columns
function renderTasks(tasks) {
    ['todo', 'inprogress', 'done'].forEach(col => {
      document.getElementById(col).innerHTML = `
        <div class="column-header">
          <h3>${col.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
        </div>`;
    });

    tasks.forEach(task => {
      const div = document.createElement('div');
      div.className = 'task';
      div.setAttribute('data-priority', task.priority);

      // Dragging functionality
      div.setAttribute('draggable', 'true');
      div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('taskId', task.id);
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
          <button class="btn btn-primary" onclick="moveTask('${task.id}', '${getNextStatus(task.status)}')">
            ${getStatusButtonText(task.status)}
          </button>
          <button class="btn btn-danger" onclick="deleteTask('${task.id}')">
            Delete
          </button>
        </div>
      `;

      document.getElementById(task.status.toLowerCase().replace(' ', '')).appendChild(div);
    });

    // Enable dropping into columns
    ['todo', 'inprogress', 'done'].forEach(columnId => {
        const column = document.getElementById(columnId);

        column.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        column.addEventListener('drop', async (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('taskId');
            let newStatus = '';

            if (columnId === 'todo') newStatus = 'To Do';
            else if (columnId === 'inprogress') newStatus = 'In Progress';
            else if (columnId === 'done') newStatus = 'Done';

            await db.collection('tasks').doc(taskId).update({
              status: newStatus
            });
        });
    });
}

// Move Task
function moveTask(id, status) {
    db.collection('tasks').doc(id).update({ status });
}

// Delete Task
function deleteTask(id) {
    db.collection('tasks').doc(id).delete();
}

// Helper functions
function getNextStatus(currentStatus) {
    const statusFlow = ['todo', 'inprogress', 'done'];
    const currentIndex = statusFlow.indexOf(currentStatus.toLowerCase());
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : statusFlow[0];
}

function getStatusButtonText(status) {88888
    return {
      todo: 'Start Progress →',
      inprogress: 'Mark Done ✓',
      done: 'Re-open ↺'
    }[status.toLowerCase()] || 'Move';
}


function searchTasks() {
    let input = document.getElementById('search').value.toLowerCase();
    let tasks = document.querySelectorAll('.task');
    
    tasks.forEach(task => {
        let taskTitle = task.querySelector('.task-title').textContent.toLowerCase();
        if (taskTitle.includes(input)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

