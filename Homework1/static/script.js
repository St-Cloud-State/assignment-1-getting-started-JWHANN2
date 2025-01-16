// Function to submit a new application
// This function collects the user's name and ZIP code and sends them to the server
function submitApplication() {
    const name = document.getElementById('name').value; // Retrieve name from input field
    const zipcode = document.getElementById('zipcode').value; // Retrieve ZIP code from input field

    fetch('/api/accept_application', {
        method: 'POST', // Specifies the HTTP method to use
        headers: {
            'Content-Type': 'application/json' // Indicates the request body format
        },
        body: JSON.stringify({ name, zipcode }) // Converts the input data into JSON format
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
        document.getElementById('applicationResponse').textContent = `Application ID: ${data.application_id}`; // Display the application ID returned by the server
    })
    .catch(error => {
        console.error('Error:', error); // Log errors to the console
        document.getElementById('applicationResponse').textContent = 'Error submitting application.'; // Display an error message
    });
}

// Function to check the status of an application
// Takes an application ID from the user and queries the server for its status
function checkApplicationStatus() {
    const applicationId = document.getElementById('statusId').value; // Get application ID from input field

    fetch(`/api/check_status?application_id=${applicationId}`) // Send GET request with application ID as query param
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            if (data.status) {
                document.getElementById('statusResponse').textContent = `Status: ${data.status}, Name: ${data.name}, ZIP Code: ${data.zipcode}`; // Show the application's status, name, and ZIP code
            } else {
                document.getElementById('statusResponse').textContent = 'Application not found.'; // Handle case where application is not found
            }
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors gracefully
            document.getElementById('statusResponse').textContent = 'Error checking status.'; // Display a fallback message
        });
}

// Function to update the status of an application
// Sends a POST request with the application ID and new status
function updateApplicationStatus() {
    const applicationId = document.getElementById('updateId').value; // Get the ID of the application to update
    const newStatus = document.getElementById('newStatus').value; // Get the new status value

    fetch('/api/change_status', {
        method: 'POST', // POST method for updating server data
        headers: {
            'Content-Type': 'application/json' // Specify JSON format for the request body
        },
        body: JSON.stringify({ application_id: applicationId, new_status: newStatus }) // Include application ID and new status in request
    })
    .then(response => response.json()) // Parse server's JSON response
    .then(data => {
        document.getElementById('updateResponse').textContent = data.message; // Show confirmation or error message
    })
    .catch(error => {
        console.error('Error:', error); // Output errors to the console
        document.getElementById('updateResponse').textContent = 'Error updating status.'; // Display fallback error message
    });
}
