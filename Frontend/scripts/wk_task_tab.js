document.getElementById('add').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Fetch form data
  const board = document.getElementById('board').value.trim();
  const task = document.getElementById('task').value.trim();
  const person_allocated = document.getElementById('person_allocated').value.trim();
  const p_email = document.getElementById('p_email').value.trim();
  const status = document.getElementById('status').value.trim();
  const start_date = document.getElementById('start_date').value.trim();
  const end_date = document.getElementById('end_date').value.trim();
  const extra = document.getElementById('extra').value.trim();

  // Validate form fields
  if (!board || !task || !person_allocated || !p_email || !status || !start_date || !end_date) {
    alert('All form fields are required'); // Show an alert message if any field is empty
    return; // Exit the function
  }

  // Prepare form data
  const formData = {
    board,
    task,
    person_allocated,
    p_email,
    status,
    start_date,
    end_date,
    extra
  };

  // Send POST request to backend
  fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Include JWT token
    },
    body: JSON.stringify(formData) // Convert form data to JSON
  })
    .then(response => {

      console.log("res", response)
      if (!response.ok) {
        throw new Error('Error creating task');
      }
      return response.json();
    })
    .then(data => {
      console.log('Task created successfully:', data);
      alert(data.message); // Show a success message
      document.getElementById('add').reset(); // Reset the form after successful submission
      fetchTasks()
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
});

let container = document.getElementById("maincontainer");

//  get get get get
let arr;
function fetchTasks() {
  fetch('http://localhost:5000/api/tasks', {
    method:'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    }
  })
    .then(response => response.json())
    .then(data => {
      // Call function to display tasks
      arr = data.tasks;
      // console.log("gii")
      console.log(arr)
      // let disp = displayTasks(arr);
      displayTasks(arr);
      // container.innerHTML = disp

      // arr.forEach(task => {
      //   console.log("Board:", task.board);
      //   console.log("Task:", task.task);
      //   console.log("Person Allocated:", task.person_allocated);
      //   console.log("Email:", task.p_email);
      //   console.log("Status:", task.status);
      //   console.log("Start Date:", task.start_date);
      //   console.log("End Date:", task.end_date);
      //   console.log("Extra:", task.extra);
      //   console.log("_id:", task._id);
      //   console.log("--------------------");
      // });
      
    })
    .catch(error => {
      console.error('Error:', error.message);
    });

    // Assuming tasksArray is the array you received as a response

}
fetchTasks();

function displayTasks(data) {
  let tableRows = data.map((el, i) => {
    let startDate = new Date(el.start_date).toLocaleDateString();
    let endDate = new Date(el.end_date).toLocaleDateString();
    let statusClass = "";
    switch (el.status) {
      case "completed":
        statusClass = "tgreen";
        break;
      case "stuck":
        statusClass = "tred";
        break;
      case "in_progress":
        statusClass = "tyellow";
        break;
    }
    return `<tr>
                <td>${el.board}</td>
                <td>${el.task}</td>
                <td>${el.person_allocated}</td>
                <td>${el.p_email}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
                <td class="${statusClass}">${el.status}</td>
                <td>${el.extra}</td>
                <td>
                <button class="markcomplete" data-task-id="${el._id}">Complete</button>
                <button class="deletetask" data-task-id="${el._id}">Delete</button>
                <button class="updatetask" data-task-id="${el._id}">Update</button>
                </td>
              </tr>`;
  });

  let tableHTML = `<table>
                    <thead>
                      <tr>
                        <th>Board</th>
                        <th>Task</th>
                        <th>Person</th>
                        <th>P Email</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Status</th>
                        <th>Comments</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${tableRows.join("")}
                    </tbody>
                  </table>`;

  // Select the main container element and append the table HTML
  container.innerHTML = tableHTML;
  setupEventListeners()
}


function setupEventListeners() {
  document.querySelectorAll('.markcomplete').forEach(button => {
    button.removeEventListener('click', markCompleteHandler); // Remove any existing event listeners to prevent duplicates
    button.addEventListener('click', markCompleteHandler);
  });

  document.querySelectorAll('.deletetask').forEach(button => {
    button.removeEventListener('click', deleteTaskHandler); // Remove any existing event listeners to prevent duplicates
    button.addEventListener('click', deleteTaskHandler);
  });

  document.querySelectorAll('.updatetask').forEach(button => {
    button.removeEventListener('click', updateTaskHandler); // Remove any existing event listeners to prevent duplicates
    button.addEventListener('click', updateTaskHandler);
  });
}

function markCompleteHandler() {
  const taskId = this.getAttribute('data-task-id');
  markTaskAsCompleted(taskId)
    .then(() => fetchTasks())
    .catch(error => console.error('An error occurred:', error));
}

function deleteTaskHandler() {
  const taskId = this.getAttribute('data-task-id');
  deleteTask(taskId)
    .then(() => fetchTasks())
    .catch(error => console.error('An error occurred:', error));
}

let update_form = document.getElementById("update")
update_form.style.display = "none"


function updateTaskHandler(event) {
  event.preventDefault();

  console.log("butoon click")
  update_form.style.display = "block"

  const taskId = this.getAttribute('data-task-id');
  console.log("xx", taskId)// Get the task ID from the button's dataset

  document.getElementById("update").addEventListener('submit', async function (event) {
    event.preventDefault()
    const updatedTaskData = {
      board: document.getElementById('up_board').value,
      task: document.getElementById('up_task').value,
      person_allocated: document.getElementById('up_person_allocated').value,
      p_email: document.getElementById('up_p_email').value,
      status: document.getElementById('up_status').value,
      start_date: document.getElementById('up_start_date').value,
      end_date: document.getElementById('up_end_date').value,
      extra: document.getElementById('up_extra').value
    };
    if (!updatedTaskData.board || !updatedTaskData.task || !updatedTaskData.person_allocated || !updatedTaskData.p_email || !updatedTaskData.status || !updatedTaskData.start_date || !updatedTaskData.end_date || !updatedTaskData.extra) {
      alert("All fills are required to fill")
      return;
    }

    // console.log("data get after sum",updatedTaskData)
    try {
      const updatedTask = await updateTask(taskId, updatedTaskData);
      console.log('Task updated successfully:', updatedTask);
      fetchTasks()
    } catch (error) {
      console.error('Failed to update task:', error);
    }

  })




}







async function markTaskAsCompleted(taskId) {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // You can handle success message here
    } else {
      throw new Error('Failed to mark task as completed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE'
    });

    // console.log("del", taskId)
    if (response.ok) {
      const data = await response.json();
      console.log("res", data)

      fetchTasks()

    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

// Function to update a task
async function updateTask(taskId, updatedData) {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const result = await response.json();
    return result.task; // Return the updated task object
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw error;
  }
}

setupEventListeners();


// Assuming tasksArray is the array you received as a response

// document.getElementById('sortBystatus').addEventListener('change', function() {
//   const sortBy = this.value;
//   console.log(sortBy);

//   let sortedTasks = arr.slice(); // Copy the original array to sortedTasks

//   if (sortBy === 'lowToHigh') {
//       sortedTasks.sort((a, b) => {
//           // Sort tasks from "Stuck" to "Completed"
//           const order = ["stuck", "in_progress", "completed"];
//           return order.indexOf(a.status) - order.indexOf(b.status);
//       });
//   } else if (sortBy === 'HighToLow') {
//       sortedTasks.sort((a, b) => {
//           // Sort tasks from "Completed" to "Stuck"
//           const order = ["stuck", "in_progress", "completed"];
//           return order.indexOf(b.status) - order.indexOf(a.status);
//       });
//   }

//   // Call a function to display the sorted tasks
//   displayTasks(sortedTasks);
//   console.log("sortedTasks", sortedTasks);
// });








// Function to sort tasks by start date

document.getElementById('sortByStartdate').addEventListener('change', function() {
  const sortOption = this.value; // Get the selected value from the dropdown
  console.log("sort", sortOption)
  sortTasksByStartDate(sortOption); // Call the sorting function with the selected option
});

function sortTasksByStartDate(sortOption) {
  console.log("hi")
  console.log(sortOption)

  let headers = {
      'Content-Type': 'application/json'
  };

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
      headers['Authorization'] = 'Bearer ' + accessToken;
  }

  fetch(`http://localhost:5000/api/tasks/sort?sortByStartdate=${sortOption}`, {
      method: 'GET',
      headers: headers
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch tasks');
      }
      return response.json();
  })
  .then(data => {
      console.log("data", data)
      // Check if tasks data is available in the response
      if (data && data.tasks && data.tasks.length > 0) {
          console.log("Data found in response");
          // Call a function to display the sorted tasks on the frontend
          displayTasks(data.tasks);
      } else {
          console.error('No tasks data found in response');
          // Handle case where no tasks data is found
      }
  })
  .catch(error => {
      console.error('Error sorting tasks:', error);
      // Handle error
  });
}


document.getElementById('filterByStatus').addEventListener('change', function() {
  const selectedStatus = this.value;
  filterTasksByStatus(selectedStatus);
});


function filterTasksByStatus(status) {
  // Prepare headers
  let headers = {
    'Content-Type': 'application/json'
  };

  // Add authorization header if access token is available
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    headers['Authorization'] = 'Bearer ' + accessToken;
  }

  // Make a fetch request to the filter endpoint
  fetch(`http://localhost:5000/api/tasks/filter?status=${status}`, {
    method: 'GET',
    headers: headers
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  })
  .then(data => {
    // Check if tasks data is available in the response
    if (data && data.tasks) {
      // Call a function to display the filtered tasks on the frontend
      displayTasks(data.tasks);
    } else {
      console.error('No tasks data found in response');
    }
  })
  .catch(error => {
    console.error('Error filtering tasks:', error);
    // Handle error
  });
}


document.getElementById('searchany').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const searchInput = document.getElementById('search').value; // Get the value from the search input
  filterTasksByTaskName(searchInput);
  document.getElementById('search').value = ''; // Call the filtering function with the search input
});

// Function to handle filter by name form submission
document.getElementById('filterByName').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const personName = document.getElementById('filtername').value; // Get the person's name from the input field
  filterTasksByPersonName(personName); 
  document.getElementById('filtername').value = '';// Call the function to filter tasks by person's name
});

// Function to handle search form submission
document.getElementById('filterByBoard').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  
  const boardName = document.getElementById('filterBoard').value.trim();
  console.log(boardName)
  if (boardName !== '') {
      filterTasksByBoard(boardName);
      document.getElementById('filterBoard').value = '';
      
  } else {
    alert("OOPs fill the form")  // Display an error message or handle empty input as needed
  }
});


// Function to filter tasks by board name
function filterTasksByBoard(boardName) {
  // Make an API request to filter tasks by board name
  fetch(`http://localhost:5000/api/tasks/filter-by-board?boardName=${boardName}`, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to filter tasks by board');
      }
      return response.json();
  })
  .then(data => {
      displayTasks(data.tasks); // Call a function to display the filtered tasks
  })
  .catch(error => {
      console.error('Error filtering tasks by board:', error);
      // Handle error
  });
}

// Function to filter tasks by person's name/
function filterTasksByPersonName(personName) {
  console.log(personName)
  fetch(`http://localhost:5000/api/tasks/filter-by-name?personName=${personName}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to filter tasks by person name');
    }
    return response.json();
  })
  .then(data => {
    displayTasks(data.tasks); // Call a function to display the filtered tasks
  })
  .catch(error => {
    console.error('Error filtering tasks by person name:', error);
    // Handle error
  });
}


function filterTasksByTaskName(taskName) {
  // Make an API request to filter tasks by task name
  fetch(`http://localhost:5000/api/tasks/search?taskName=${taskName}`, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to filter tasks by task name');
      }
      return response.json();
  })
  .then(data => {
      displayTasks(data.tasks); // Call a function to display the filtered tasks
  })
  .catch(error => {
      console.error('Error filtering tasks by task name:', error);
      // Handle error
  });
}




// // sort by status----------------------------//

// let sortByStatus = document.getElementById("sortBystatus");

// sortByStatus.addEventListener("change", () => {
//   let sortByStatusValue = sortByStatus.value;
//   if (sortByStatusValue == "") {
//     getData();
//   } else if (sortByStatusValue == "lowToHigh") {
//     let containersortSts = document.getElementById("maincontainer");

//     fetch("https://zany-lime-swordfish-cuff.cyclic.app/tasks", {
//       headers: {
//         Authorization: localStorage.getItem("token"),
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         let arr = res.tasks;
//         arr.sort((a, b) => {
//           const order = ["stuck", "in_progress", "completed"];
//           return order.indexOf(a.status) - order.indexOf(b.status);
//         });
//         let disp = displayData(arr);
//         containersortSts.innerHTML = disp;
//       })
//       .catch((err) => console.log(err));
//   } else if (sortByStatusValue == "HighToLow") {
//     let containersortSts = document.getElementById("maincontainer");

//     fetch("https://zany-lime-swordfish-cuff.cyclic.app/tasks", {
//       headers: {
//         Authorization: localStorage.getItem("token"),
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res);
//         let arr = res.tasks;
//         arr.sort((a, b) => {
//           const order = ["completed", "in_progress", "stuck"];
//           return order.indexOf(a.status) - order.indexOf(b.status);
//         });
//         let disp = displayData(arr);
//         containersortSts.innerHTML = disp;
//       })
//       .catch((err) => console.log(err));
//   }
// });



// // all functionalities done---------------------------------------//

// redirect to chart page-----------//

let Gantt = document.getElementById("Gantt");

Gantt.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_chart.html";
});

// redirect to pie page-----------//

let Pie = document.getElementById("pie");

Pie.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_pie.html";
});

let hmpgredirect = document.getElementById("hmpgredirect");

hmpgredirect.addEventListener("click", () => {
  window.location.href = "../index.html";
});

let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("mapiuser");
  alert("Logout Successful");
  window.location.href = "../index.html";
});
