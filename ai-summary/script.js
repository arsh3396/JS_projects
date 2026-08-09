const textInput = document.getElementById("textInput");
const summarizeBtn = document.getElementById("summarizeBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const summary = document.getElementById("summary");


async function summarizeText() {

    const text = textInput.value.trim();

    if (!text) {
        showError("Please enter some text.");
        return;
    }

    loading.classList.remove("hidden");
    error.classList.add("hidden");

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/interactions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },

                body: JSON.stringify({
                    model: "gemini-3.6-flash",

                    input: `Summarize the following text in simple and clear language:

${text}`
                })
            }
        );


        if (!response.ok) {
            throw new Error("API request failed");
        }


        const data = await response.json();

        console.log(data);


        const result = data.steps
            .find(step => step.type === "model_output")
            .content
            .find(item => item.type === "text")
            .text;


        summary.textContent = result;

    }

    catch (err) {

        console.log(err);

        showError("Something went wrong. Please try again.");

    }

    finally {

        loading.classList.add("hidden");

    }
}


function showError(message) {

    error.textContent = message;

    error.classList.remove("hidden");
}


summarizeBtn.addEventListener("click", summarizeText);