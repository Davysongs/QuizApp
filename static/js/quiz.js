
const url = window.location.href
const quizform = document.getElementById("quiz-form")
const csrf = document.getElementsByName("csrfmiddlewaretoken")
const quizBox = document.getElementById('quiz-box')
const timerBox = document.getElementById('timer-box')
const load = document.getElementById('loader')
let quizID;
let timer;
//loading animation
setTimeout(() => {
    load.style.display= "none"
}, 1000);

//Quiz Countdown Timer
const Activatetimer = (time) =>{
    if (time.toString().length <2){
        timerBox.innerHTML =` <b>0${time}:00</b>`
    }else{
        timerBox.innerHTML=`<b>${time}</b>`
    }
    let minutes = time - 1
    let seconds = 60 
    let displaySeconds
    let displayMinutes    
    timer = setInterval(() => {
        seconds --
        if (seconds< 0){
            seconds = 59
            minutes --
        }  
        if (minutes.toString().length < 2 ){
            displayMinutes = "0" + minutes
        }else{
            displayMinutes = minutes
        }
        if (seconds.toString().length < 2){
            displaySeconds = "0" + seconds
        }else{
            displaySeconds = seconds
        }
        if (minutes<1 && seconds < 31){
            timerBox.style.color = 'red';
            timerBox.style.fontSize = '30px';
        }
        if (minutes ===0 && seconds === 0){
            timerBox.innerHTML = "<b>00:00</b>"
            setTimeout(()=>{
                clearInterval(timer)
                load.style.display = "initial"
                sendData()
            }, 500)
        }
        timerBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}</b>`
    }, 1000);
}

// Function to clear the timer interval
const clearTimerInterval = () => {
    clearInterval(timer);
};

$.ajax({
    type: 'GET',
    url: `${url}/data`,
    success: function(response){
        const data= response.data
        quizID = response.qid
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)){
               quizBox.innerHTML += `
                    <hr>
                    <div class="mb-2">
                        <b>${question}</b>
                    </div>
                `
                
                answers.forEach(answer=>{
                    quizBox.innerHTML += `
                        <div>
                            <input type="radio" class = "ans" id = "${question}-${answer}" name ="${question}" value="${answer}">
                            <label for="${question}">${answer}</label>
                        </div>
                    `
                })
            }
        });
        Activatetimer(response.time)
    },
    error: function (error){
        console.log(error)
    }
})
quizform.addEventListener('submit', function (event) {
        // Prevent the form from submitting the traditional way
        event.preventDefault();
        load.style.display = "initial"
        clearTimerInterval()
        sendData()
});  


function sendData(){
       // Show the loading overlay
       const elements = [...document.getElementsByClassName("ans")]
       const data = {}
       data['csrfmiddlewaretoken'] = csrf[0].value
       elements.forEach(el=>{
           if (el.checked) {
               data[el.name] = el.value
           }
           else{
               if (!data[el.name]){
                   data[el.name] = null
               }
           }
       })
       $.ajax({
           type: 'POST',
           url: `${url}/save/?content=${quizID}`,
           data: data,
           success: function(response){
                setTimeout(function () {
                    load.style.display = "none"
                    quizform.style.opacity = "0%"
                    window.location.href =(`/results/${quizID}`)
                }, 2000);     
           },
           error: function(error){
            console.log(error)                     
           }
       })
}
window.addEventListener('load', function() {
    // Check if the browser is offline when the page loads
    if (!navigator.onLine) {
        showOfflineImage();
    }
});

window.addEventListener('offline', function() {
    // When the browser goes offline, show the offline image
    showOfflineImage();
});

window.addEventListener('online', function() {
    // When the browser goes back online, hide the offline image
    hideOfflineImage();
});

function showOfflineImage() {
    document.getElementById('offline-image').style.display = 'inline'; // Show the image
}

function hideOfflineImage() {
    document.getElementById('offline-image').style.display = 'none'; // Hide the image
}