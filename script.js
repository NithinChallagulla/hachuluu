import { db, ref, push, set } from "./firebase-config.js";

const landingScreen = document.getElementById("landing-screen");
const questionnaireScreen = document.getElementById("questionnaire-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultScreen = document.getElementById("result-screen");

const startMissionBtn = document.getElementById("startMissionBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progressBar = document.getElementById("progressBar");
const steps = document.querySelectorAll(".step");

let currentStep = 0;

function createHeart() {
    const heart = document.createElement("div");

    heart.className = "floating-heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animationDuration = (6 + Math.random() * 8) + "s";

    document
        .getElementById("hearts-container")
        .appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}

setInterval(createHeart, 500);

startMissionBtn.addEventListener("click", () => {

    landingScreen.classList.remove("active");
    questionnaireScreen.classList.add("active");

});

function showStep(index) {

    steps.forEach(step => {
        step.classList.remove("active-step");
    });

    steps[index].classList.add("active-step");

    progressBar.style.width =
        (((index + 1) / steps.length) * 100) + "%";

    prevBtn.style.visibility =
        index === 0 ? "hidden" : "visible";

    nextBtn.textContent =
        index === steps.length - 1
            ? "Approve Date ❤️"
            : "Next ❤️";
}

showStep(currentStep);

prevBtn.addEventListener("click", () => {

    if (currentStep > 0) {

        currentStep--;

        showStep(currentStep);

    }

});

nextBtn.addEventListener("click", async () => {

    if (currentStep < steps.length - 1) {

        currentStep++;

        showStep(currentStep);

        return;
    }

    await submitResponses();

});

async function submitResponses() {

    try {

        const payload = {
dateRequest:
document.querySelector(
'input[name="dateRequest"]:checked'
)?.value || "",
            timestamp: new Date().toISOString(),

            activity:
                document.querySelector(
                    'input[name="activity"]:checked'
                )?.value || "",

            activityOther:
                document.getElementById("activityOther").value,

            restaurant:
                document.querySelector(
                    'input[name="restaurant"]:checked'
                )?.value || "",

            restaurantOther:
                document.getElementById("restaurantOther").value,

            afternoon:
                document.querySelector(
                    'input[name="afternoon"]:checked'
                )?.value || "",

            afternoonOther:
                document.getElementById("afternoonOther").value,

            missedMost:
                document.getElementById("missedMost").value,

            riskLevel:
                document.getElementById("riskLevel").value,

            affectionLevel:
                document.getElementById("affectionLevel").value,

            message:
                document.getElementById("message").value

        };

        const responseRef =
            push(ref(db, "responses"));

        await set(responseRef, payload);

        questionnaireScreen.classList.remove("active");
        loadingScreen.classList.add("active");

        setTimeout(() => {

            loadingScreen.classList.remove("active");
            resultScreen.classList.add("active");

        }, 5000);

    }
    catch (err) {

        console.error(err);

        alert("Failed to save response.");

    }

}
