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



const memberForm = document.getElementById("member-form");


memberForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const submitButton = memberForm.querySelector(".form-button");


    submitButton.textContent = "SUBMITTING...";
    submitButton.disabled = true;



    const memberData = {

        fullName: document.getElementById("full-name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        city: document.getElementById("city").value,

        state: document.getElementById("state").value,

        interest: document.getElementById("support").value,

        reason: document.getElementById("proposal").value,

        contactMethod: document.getElementById("contactMethod").value,

        privacyPolicy: document.querySelector('input[name="privacy_policy"]').checked,

        dataConsent: document.querySelector('input[name="data_consent"]').checked,

        contactConsent: document.querySelector('input[name="contact_consent"]').checked,

        policyAgreement: document.querySelector('input[name="policy_agreement"]').checked,

        createdAt: serverTimestamp()

    };



    try {

        await addDoc(collection(db, "members"), memberData);


        alert("Membership application submitted successfully!");


        memberForm.reset();


    }

    catch(error) {

        console.error("Error:", error);

        alert("Submission failed!");

    }


    finally {

        submitButton.textContent = "SUBMIT";

        submitButton.disabled = false;

    }


});