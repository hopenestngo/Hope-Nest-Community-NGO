// Firebase imports
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



const donationForm = document.getElementById("donation-form");



if (donationForm) {



donationForm.addEventListener("submit", async (e)=>{


    e.preventDefault();



    const button = donationForm.querySelector(".submit-btn");



    button.textContent = "Submitting...";

    button.disabled = true;





    const donationData = {



        name: document.getElementById("name").value,


        phone: document.getElementById("phone").value,


        email: document.getElementById("email").value,


        amount: document.getElementById("amount").value,


        paymentMethod: document.getElementById("paymentMethod").value,


        reference: document.getElementById("reference").value,


        message: document.getElementById("message").value,


        createdAt: serverTimestamp()



    };



    try {



        await addDoc(

            collection(db,"donations"),

            donationData

        );




        alert("Donation confirmation submitted successfully!");



        donationForm.reset();



    }



    catch(error){



        console.error("Firebase Error:", error);



        alert("Failed to submit donation confirmation!");



    }



    finally {



        button.textContent = "Submit Confirmation";


        button.disabled = false;

    }

});



}