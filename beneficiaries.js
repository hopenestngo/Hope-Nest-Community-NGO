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




const beneficiaryForm = document.getElementById("beneficiary-form");

if (beneficiaryForm) {

    beneficiaryForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const button = beneficiaryForm.querySelector("button");

        button.disabled = true;
        button.textContent = "Submitting...";

        const beneficiaryData = {

            fullName: document.querySelector('[name="full_name"]').value.trim(),

            phone: document.querySelector('[name="phone"]').value.trim(),

            email: document.querySelector('[name="email"]').value.trim(),

            age: document.querySelector('[name="age"]').value,

            gender: document.querySelector('[name="gender"]').value,

            location: document.querySelector('[name="location"]').value.trim(),

            category: document.querySelector('[name="category"]').value,

            supportNeeded: document.querySelector('[name="support"]').value,

            description: document.querySelector('[name="description"]').value.trim(),

            existingSupport: document.querySelector('[name="existing_support"]').value,

            supportDetails: document.querySelector('[name="support_details"]').value.trim(),

            urgency: document.querySelector('[name="urgency"]').value,

            createdAt: serverTimestamp()

        };

        try {

            await addDoc(
                collection(db, "beneficiaries"),
                beneficiaryData
            );

            alert("Your support request has been submitted successfully.");

            beneficiaryForm.reset();

        } catch (error) {

            console.error("Firestore Error:", error);

            alert("Submission failed. Please try again.");

        } finally {

            button.disabled = false;
            button.textContent = "Submit Request";

        }

    });

}
