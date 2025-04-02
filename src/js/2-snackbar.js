
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
let delay = null;

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
   event.preventDefault();
   const promState = event.target.elements.state.value;
   const delay = event.target.elements.delay.value;
   const promis = new Promise((resolve,reject)=> {
    setTimeout( () => {
    if(promState === "fulfilled"){
        resolve(delay);
    }
    reject(delay);

    promis
    .then((value) => iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight"
    }))
    .catch((error) => iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
    }))
    
    
    





    }, delay);
 
    
   })
   
         
   }
