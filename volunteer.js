
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { 
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.querySelector(".navbar-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    
    if (toggleBtn && mobileMenu) {

        toggleBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("show");
        });

    }



    const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");

    dropdownToggles.forEach(function(toggle){

        toggle.addEventListener("click", function(e){

            e.preventDefault();

            const dropdownMenu = this.nextElementSibling;

            dropdownMenu.classList.toggle("show");

        });

    });


    
    document.addEventListener("click", function(e){

        if(
            !mobileMenu.contains(e.target) &&
            !toggleBtn.contains(e.target)
        ){

            mobileMenu.classList.remove("show");

        }

    });

});



const firebaseConfig = {
  apiKey: "AIzaSyAVCrJNn0VnNGw6MCWK0cXhexrzjNiTbXM",
  authDomain: "hope-nest-community-ngo.firebaseapp.com",
  projectId: "hope-nest-community-ngo",
  storageBucket: "hope-nest-community-ngo.firebasestorage.app",
  messagingSenderId: "641918315234",
  appId: "1:641918315234:web:5e8455d0a2db3eec494cbb"
};



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



const volunteerForm = document.getElementById("volunteer-form");


volunteerForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const volunteerData = {
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        support: document.getElementById("support").value,
        availability: document.getElementById("programArea").value,
        message: document.getElementById("message").value,
        contactMethod: document.getElementById("contactMethod").value,
        createdAt: serverTimestamp()
    };

    const submitButton = volunteerForm.querySelector(".form-button");

   submitButton.textContent = "Submiting...";
   submitButton.disabled = true;


   try {

    await addDoc(collection(db, "volunteers"), volunteerData);

    alert("Volunteer Application Submitted Successfully!");

    volunteerForm.reset();

    submitButton.textContent = "Submit";
    submitButton.disabled = false;

} catch (error) {

    console.error("Error:", error);

    alert("Submission failed!");

    submitButton.textContent = "Submit";
    submitButton.disabled = false;

}

});