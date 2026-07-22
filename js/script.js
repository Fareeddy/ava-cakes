const menuToggle =document.getElementById("menuToggle");

const navLinks =document.getElementById("navLinks");
 
const navActions = document.querySelector(".nav-actions");

menuToggle.addEventListener("click",function (){
    navLinks.classList.toggle("show");
    navActions.classList.toggle("show");
})

const fadeElements =document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

fadeElements.forEach(element =>{
    observer.observe(element);
});