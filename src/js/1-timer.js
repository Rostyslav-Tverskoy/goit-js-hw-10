import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
const startBtn = document.querySelector("button[data-start]");
const days = document.querySelector("span[data-days]");
const hour = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");
const input = document.querySelector("#datetime-picker");

startBtn.addEventListener("click", handleClick);
let userSelectedDates = null;
startBtn.disabled = true;
updateButtonState();

function updateButtonState() {
  if (startBtn.disabled) {
    startBtn.classList.add("disabled-btn");
    startBtn.classList.remove("active-btn");
  } else {
    startBtn.classList.remove("disabled-btn");
    startBtn.classList.add("active-btn");
  }
}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      let currentTime = new Date();
      userSelectedDates = selectedDates[0];
      if(currentTime < userSelectedDates){
        startBtn.disabled = false;
        updateButtonState();

        return userSelectedDates;
      }
      iziToast.error({
        message: 'Please choose a date in the future',
        position: "topRight"
    });
        startBtn.disabled = true;
        updateButtonState();

    },
  };

  flatpickr("#datetime-picker", options);

  function handleClick () {
    startBtn.disabled = true;
    updateButtonState();
    input.disabled = true;

    
    const timeID = setInterval (() => {
      const totalTime = new Date();
      const deltaTime = userSelectedDates - totalTime;
      const time = convertMs(deltaTime);
      days.textContent = String(time.days).padStart(2,"0");
      hour.textContent = String(time.hours).padStart(2,"0");
      minutes.textContent = String(time.minutes).padStart(2,"0");
      seconds.textContent = String(time.seconds).padStart(2,"0");
      
     
      
      
      

      if(deltaTime < 1000) {
        clearInterval(timeID);
        input.disabled = false;
        return;
      }

      
    }, 1000);
    
    
  }



  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms/day);
    const hours = Math.floor( (ms%day) / hour);
    const minutes = Math.floor( ( (ms%day) % hour ) / minute);
    const seconds = Math.floor( ( (( ms%day ) % hour )% minute ) / second);
    return { days, hours, minutes, seconds };
  }


  
 
  
