import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate;

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

btn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = new Date(selectedDates[0]);
        let dateNow = new Date();

        if(selectedDate.getTime() <= dateNow.getTime()){
            window.alert("Please choose a date in the future");
            return;
        }

        btn.disabled = false;
    },

};

flatpickr (input, options)

let intervalId;
btn.addEventListener('click', () => {
    btn.disabled = true;

    intervalId = setInterval(() => {
        const currentDate = new Date();
        const difference = selectedDate.getTime() - currentDate.getTime();

        const diffData = convertMs(difference);

        if (difference <= 0) {
            clearInterval(intervalId);
            btn.disabled = false;
            return;
        }

        daysEl.textContent = addLeadingZero(diffData.days);
        hoursEl.textContent = addLeadingZero(diffData.hours);
        minutesEl.textContent = addLeadingZero(diffData.minutes);
        secondsEl.textContent = addLeadingZero(diffData.seconds);
    }, 1000);
});
