import { db, ref, onValue } from "./firebase-config.js";

const container =
document.getElementById("responses");

function createHeart(){

    const heart=document.createElement("div");

    heart.classList.add("floating-heart");

    heart.innerHTML="❤️";

    heart.style.left=
        Math.random()*window.innerWidth+"px";

    heart.style.fontSize=
        (15+Math.random()*25)+"px";

    heart.style.animationDuration=
        (6+Math.random()*8)+"s";

    document
    .getElementById("hearts-container")
    .appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },15000);

}

setInterval(createHeart,500);

onValue(ref(db,"responses"),(snapshot)=>{

    container.innerHTML="";

    const data=snapshot.val();

    if(!data){

        container.innerHTML=
        "<h2>No responses yet.</h2>";

        return;

    }

    const entries=
    Object.entries(data).reverse();

    entries.forEach(([id,response])=>{

        const card=
        document.createElement("div");

        card.className=
        "response-card";

        card.innerHTML=`

        <h2>❤️ Date Response</h2>

        <div class="response-item">
        <span class="label">Activity:</span>
        ${response.activity || "-"}
        </div>

        <div class="response-item">
        <span class="label">Activity Other:</span>
        ${response.activityOther || "-"}
        </div>

        <div class="response-item">
        <span class="label">Restaurant:</span>
        ${response.restaurant || "-"}
        </div>

        <div class="response-item">
        <span class="label">Restaurant Other:</span>
        ${response.restaurantOther || "-"}
        </div>

        <div class="response-item">
        <span class="label">Afternoon:</span>
        ${response.afternoon || "-"}
        </div>

        <div class="response-item">
        <span class="label">Afternoon Other:</span>
        ${response.afternoonOther || "-"}
        </div>

        <div class="response-item">
        <span class="label">Missed Most:</span>
        ${response.missedMost || "-"}
        </div>

        <div class="response-item">
        <span class="label">Risk Level:</span>
        ${response.riskLevel || "-"}
        </div>

        <div class="response-item">
        <span class="label">Affection Level:</span>
        ${response.affectionLevel || "-"}
        </div>

        <div class="response-item">
        <span class="label">Timestamp:</span>
        ${response.timestamp || "-"}
        </div>

        <div class="message-box">
            ${response.message || "No message"}
        </div>

        `;

        container.appendChild(card);

    });

});