
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


const partnerForm = document.getElementById("partner-form");


partnerForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const submitButton = partnerForm.querySelector(".form-button");

    submitButton.textContent = "SUBMITTING...";
    submitButton.disabled = true;


    const partnerData = {

        companyName: document.getElementById("company-name").value,

        contactPerson: document.getElementById("contact-person").value,

        position: document.getElementById("position").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        website: document.getElementById("website").value,

        partnershipType: document.getElementById("support").value,

        programArea: document.getElementById("programArea").value,

        proposal: document.getElementById("proposal").value,

        contactMethod: document.getElementById("contactMethod").value,

        createdAt: serverTimestamp()

    };


    try {

    await addDoc(collection(db, "partners"), partnerData);


    alert("Partnership application submitted successfully!");


    partnerForm.reset();


}
catch(error){

    console.error(error);

    alert("Submission failed!");

}
finally{

    submitButton.textContent = "SUBMIT";

    submitButton.disabled = false;

}


});