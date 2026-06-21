/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if(loader){
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    }

});


/* ==========================
   DARK MODE
========================== */

const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

if(themeBtn){

    updateThemeButton();

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme","dark");
        }
        else{
            localStorage.setItem("theme","light");
        }

        updateThemeButton();

    });

}

function updateThemeButton(){

    if(!themeBtn) return;

    if(document.body.classList.contains("dark")){
        themeBtn.textContent = "☀ Light Mode";
    }
    else{
        themeBtn.textContent = "🌙 Dark Mode";
    }

}


/* ==========================
   SEARCH NOTES
========================== */

const searchBox = document.getElementById("searchBox");

if(searchBox){

    searchBox.addEventListener("keyup", () => {

        let value = searchBox.value.toLowerCase();

        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            let title =
            card.querySelector("h2")
            .textContent
            .toLowerCase();

            if(title.includes(value)){
                card.style.display = "block";
            }
            else{
                card.style.display = "none";
            }

        });

    });

}


/* ==========================
   SUBJECT FILTERS
========================== */

function filterNotes(category){

    const cards =
    document.querySelectorAll(".note-card");

    cards.forEach(card => {

        if(category === "all"){
            card.style.display = "block";
        }
        else{

            if(card.dataset.subject === category){
                card.style.display = "block";
            }
            else{
                card.style.display = "none";
            }

        }

    });

}


/* ==========================
   UPLOAD NOTES
========================== */

function saveNote(){

    const title =
    document.getElementById("noteTitle").value;

    const subject =
    document.getElementById("noteSubject").value;

    const link =
    document.getElementById("noteLink").value;

    if(
        title === "" ||
        subject === "" ||
        link === ""
    ){
        alert("Fill all fields");
        return;
    }

    let notes =
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];

    notes.push({

        title:title,
        subject:subject,
        link:link

    });

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    alert("Note Uploaded Successfully");

    document.getElementById("noteTitle").value="";
    document.getElementById("noteLink").value="";

}


/* ==========================
   RECENT UPLOADS
========================== */

function displayRecentNotes(){

    const container =
    document.getElementById("recentUploads");

    if(!container) return;

    let notes =
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];

    container.innerHTML = "";

    notes.reverse().slice(0,5).forEach(note => {

        container.innerHTML += `

        <div class="card">

            <h3>${note.title}</h3>

            <p>${note.subject}</p>

            <a href="${note.link}"
            class="download-btn">
            Open PDF
            </a>

        </div>

        `;

    });

}

displayRecentNotes();


/* ==========================
   LOGIN SYSTEM
========================== */

function loginStudent(){

    const name =
    document.getElementById("studentName").value;

    const roll =
    document.getElementById("rollNo").value;

    if(name === "" || roll === ""){
        alert("Fill all fields");
        return;
    }

    localStorage.setItem(
        "studentName",
        name
    );

    localStorage.setItem(
        "rollNo",
        roll
    );

    window.location.href =
    "dashboard.html";

}


/* ==========================
   DASHBOARD
========================== */

function loadDashboard(){

    const welcome =
    document.getElementById("welcomeUser");

    if(welcome){

        const name =
        localStorage.getItem("studentName");

        welcome.innerHTML =
        "Welcome, " + name + " 👋";

    }

}

loadDashboard();


/* ==========================
   PROFILE
========================== */

function loadProfile(){

    const name =
    localStorage.getItem("studentName");

    const roll =
    localStorage.getItem("rollNo");

    const profileName =
    document.getElementById("profileName");

    const profileRoll =
    document.getElementById("profileRoll");

    if(profileName){

        profileName.textContent =
        name || "Student";

    }

    if(profileRoll){

        profileRoll.textContent =
        roll || "N/A";

    }

}

loadProfile();


/* ==========================
   DOWNLOAD COUNTER
========================== */

function increaseDownload(note){

    let downloads =
    JSON.parse(
        localStorage.getItem("downloads")
    ) || {};

    if(!downloads[note]){
        downloads[note] = 0;
    }

    downloads[note]++;

    localStorage.setItem(
        "downloads",
        JSON.stringify(downloads)
    );

}


function showDownloadCount(id,note){

    let downloads =
    JSON.parse(
        localStorage.getItem("downloads")
    ) || {};

    let count =
    downloads[note] || 0;

    const element =
    document.getElementById(id);

    if(element){

        element.textContent =
        "Downloads: " + count;

    }

}


/* ==========================
   STAR RATING
========================== */

function rateNote(note,rating){

    localStorage.setItem(
        "rating_"+note,
        rating
    );

    alert(
        "Rated " +
        rating +
        " stars ⭐"
    );

}


/* ==========================
   CONTACT FORM
========================== */

function sendMessage(){

    const name =
    document.getElementById("contactName").value;

    const message =
    document.getElementById("contactMessage").value;

    if(name === "" || message === ""){

        alert("Fill all fields");

        return;

    }

    alert(
        "Message Sent Successfully"
    );

}


/* ==========================
   LOGOUT
========================== */

function logout(){

    localStorage.removeItem(
        "studentName"
    );

    localStorage.removeItem(
        "rollNo"
    );

    window.location.href =
    "login.html";

}