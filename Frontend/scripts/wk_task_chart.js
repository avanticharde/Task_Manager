let Table = document.getElementById("Table");

Table.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_tab.html";
});

let Kanban = document.getElementById("kanban");

Kanban.addEventListener("click", () => {
  window.location.href = "../pages/wk_task.html";
});

let Gantt = document.getElementById("Gantt");

Gantt.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_chart.html";
});

let Pie = document.getElementById("pie");

Pie.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_pie.html";
});

// start-----------------------------------

function generateTaskStatusBarChart() {
  // Make a fetch request to backend to get task status counts
  fetch('http://localhost:5000/api/tasks/pie-chart', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
  })
  .then(response => response.json())
  .then(data => {
      // Extract task status counts from response
      const statusCounts = data;

      // Prepare data for the bar chart
      const taskStatusData = {
          labels: Object.keys(statusCounts),
          datasets: [{
              label: 'Task Status',
              data: Object.values(statusCounts),
              backgroundColor: [
                'rgb(14,210,159)',
                'rgb(226,68,91)',
                'rgb(253,171,61)',
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
          }]
      };

      // Get canvas element to render the bar chart
      const ctx = document.getElementById('myChart').getContext('2d');

      // Create the bar chart
      const taskStatusBarChart = new Chart(ctx, {
          type: 'bar',
          data: taskStatusData,
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
  })
  .catch(error => {
      console.error('Error fetching task status counts:', error);
      // Handle error
  });
}

// Call the function to generate the bar chart when the page loads
 window.onload =  generateTaskStatusBarChart(); 

//  end--------------------------

let hmpgredirect = document.getElementById("hmpgredirect");

hmpgredirect.addEventListener("click", () => {
  window.location.href = "../index.html";
});

let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("email");
  alert("Logout Successful");
  window.location.href = "../index.html";
});
