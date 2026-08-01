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