var myDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]


// gets data for the header date
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// saves data to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// loads header date
getHeaderDate();

// creates the visuals for the scheduler body
myDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // data for scheduler
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates button to save text
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads localstorage data after components created
init();


// saves data for localStorage use
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})



$(document).ready(function(){
    //Getting current date and displaying it onto the webpage
    var momentDate = moment().format('ddd, hA');
    $('.date-display').html('');
    $('.date-display').html(momentDate)
    
    //getting local storage items using the 'for' loop and checking the values
    for(var i = 1; i < 14; i++){
        
        //diplaying the local storage items onto the text area HTML tag
        var storedValue = localStorage.getItem(i);
        var textArea = document.getElementById(i);
        textArea.value = storedValue;

        //checking if there is a valid input in the text area tag and if there is change the grandparents, i guess, color to either red if there is or green if there is not 
        if(storedValue != null && ' '){
            $(textArea).parent().parent().css('background-color', 'red')
        } else {
            $(textArea).parent().parent().css('background-color', 'green');
        }
    }
    
    //coloring the current hour row using 'moment().hour()' and passing that as a class name to get the target element back
    function colorCurrentHour(){
        
        var currentHour = moment().hour();  
        var tableRow = document.getElementsByClassName(currentHour);
        //checking if there is a table row for the current hour
        if(tableRow != null){
            $(tableRow).css('background-color', 'blue');
        }
    
    }
    
    colorCurrentHour();

    $('.btn').on('click', function(){
        
        //Getting the value of the button that was clicked
        var buttonVal = $(this).val();
        //Using that button value to remove the local storage item with the same number 
        localStorage.removeItem(buttonVal);
        //Setting the text in inside the text area to nothing
        var textArea = document.getElementById(buttonVal);
        textArea.value = '';
    })

    $('textarea').on('keyup', function(){

        var userInput = $(this).val();
        var textId = this.id;
        //Getting the value of the users input and the id of the text area and setting those into local storage
        function rememberValue(){
            localStorage.setItem(textId, userInput);
        }
        
        rememberValue();
        //checking if the users input is valid and if it is change the background color to yellow
        if(userInput != ' '){
            $(this).parent().parent().css('background-color', 'yellow');
        }
    })
})  