const apiKey = "iZZX470TC2VRz9U6raZxP17kLZzMcYwWzFIoa8U3";

// API URL
const apiUrl = "https://api.nasa.gov/planetary/apod";

// Get HTML elements
const dateInput = document.getElementById("date");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const title = document.getElementById("title");
const dateDisplay = document.getElementById("dateDisplay");

const apodImage = document.getElementById("apodImage");
const apodVideo = document.getElementById("apodVideo");

const explanation = document.getElementById("explanation");

// Get Today's Date
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDate = `${year}-${month}-${day}`;

// Set today's date as the default date
dateInput.value = todayDate;

// Prevent selecting a future date
dateInput.max = todayDate;

// Function to Get NASA APOD
async function getAPOD() {

    // Get selected date
    const selectedDate = dateInput.value;

    // Check if user selected a date
    if (!selectedDate) {
        showError("Please select a date.");
        return;
    }

    // Show loading message
    loading.classList.remove("hidden");

    // Hide previous error
    error.classList.add("hidden");


    try {
        // Create API URL
        const url = `${apiUrl}?api_key=${apiKey}&date=${selectedDate}`;

        // Send request to NASA API
        const response = await fetch(url);

        // Check if API request was successful
        if (!response.ok) {

            throw new Error("Unable to get data from NASA API.");
        }

        // Convert response into JavaScript object
        const data = await response.json();

        // Display the data
        displayAPOD(data);
    }
    catch (err) {
        // Show error message
        showError("Something went wrong. Please try again.");

        console.log(err);
    }
    finally {
        // Hide loading message
        loading.classList.add("hidden");
    }
}

// Display APOD Data
function displayAPOD(data) {

    // Display title
    title.textContent = data.title;

    // Display date
    dateDisplay.textContent = `Date: ${data.date}`;

    // Display explanation
    explanation.textContent = data.explanation;

    // Check if the media is an image
    if (data.media_type === "image") {

        // Show image
        apodImage.style.display = "block";

        // Hide video
        apodVideo.style.display = "none";

        // Set image URL
        apodImage.src = data.url;

        // Set image description
        apodImage.alt = data.title;
    }


    // Check if the media is a video
    else if (data.media_type === "video") {

        // Hide image
        apodImage.style.display = "none";

        // Show video
        apodVideo.style.display = "block";

        // Set video URL
        apodVideo.src = data.url;
    }
}

// Show Error Message
function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

// Button Click Event
searchBtn.addEventListener("click", getAPOD);

// Load Today's APOD Automatically
getAPOD();