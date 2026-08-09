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



