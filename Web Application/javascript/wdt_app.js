class Employee{
    constructor(name, surname){
        this.name = name;
        this.surname = surname;
    }
}

class staffMember extends Employee{
    constructor(
        name,
        surname,
        picture,
        email,
        status = "In",
        outTime,
        duration,
        expectedReturnTime
    ) {
        super(name, surname);
        this.picture = picture;
        this.email = email;
        this.status = status;
        this.outTime = outTime;
        this.duration = duration;
        this.expectedReturnTime = expectedReturnTime;
    }

    staffMemberIsLate() {
        //checks if toast has allready been shown.
        if(!this.toastShown) {
            const now = new Date();
            const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});

            if (this.status === "Out" && time > this.expectedReturnTime) {
                //prevents same toast from reappering.
                this.toastShown = true;
                document.querySelector('#lateToast .toast-body').innerHTML = `<img src="${this.picture}" alt="&{staffName} &{staffSurname}" width="50" height="50"> \n${this.name} ${this.surname}\nhas been out of office for ${this.duration}`;
                $('#lateToast').toast('show');  
            }
        }
    }
}


class deliveryDriver extends Employee{
    constructor(
        name,
        surname,
        vehicle,
        telephone,
        deliverAddress,
        returnTime
    ) {
        super(name, surname);
        this.vehicle = vehicle;
        this.telephone = telephone;
        this.deliverAddress = deliverAddress,
        this.returnTime = returnTime
    }
    deliveryDriverIsLate() {
        //checks if toast has allready been shown.
        if(!this.toastShown) {
            const now = new Date();
            const time = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});

            if (time > this.returnTime) {
                //Prevents same toast from reappering.
                this.toastShown = true;
                document.querySelector('#lateToast .toast-body').innerHTML = `${this.name} ${this.surname} was supposed to return at ${this.returnTime}.
                 Their telephonenumber is: ${this.telephone}. They are supposed to be at this address: ${this.deliverAddress}`
                $('#lateToast').toast('show');  
            }
        }
    }
}

let staff = [];

async function staffUserGet() {
    const response = await fetch("https://randomuser.me/api/?results=5")
    const data = await response.json();  
    //Pushes the API into staffMember class.
    for (var i=0; i< data.results.length; i++) {
        Member = new staffMember(
            data.results[i].name.first,
            data.results[i].name.last,
            data.results[i].picture.thumbnail,
            data.results[i].email
        );
        staff.push(Member);
    };
        return staff;
}

const staffDashboard = document.getElementById('staffDashboard');


staffUserGet().then(staff => {
    function loadTableData(staff) {
        for (let i = 0; i < staff.length; i++) {
            let row = staffDashboard.insertRow();
            
            //Makes it so we can select specific target from table.
            row.onclick = function(event) {
                let target = event.target;
                let parent = target.parentElement;
                let removeSelected = Array.from(document.getElementsByClassName('selected'));
                removeSelected.forEach(function(element) {
                    element.classList.remove('selected');
                });
                    parent.classList.add('selected');
            }

            // Fills the staffDahboard with class object data for demo.
            let picture = row.insertCell(0);
            picture.innerHTML = `<img src="${staff[i].picture}" alt="picture">`;
            let name = row.insertCell(1);
            name.innerHTML = staff[i].name;
            let surname = row.insertCell(2);
            surname.innerHTML = staff[i].surname;
            let email = row.insertCell(3);
            email.innerHTML = staff[i].email;
            let status = row.insertCell(4);
            status.innerHTML = staff[i].status;
            let outTime = row.insertCell(5);
            outTime.innerHTML = '';
            let duration = row.insertCell(6);
            duration.innerHTML = '';
            let expectedReturn = row.insertCell(7);
            expectedReturn.innerHTML = '';
    
            // set the id of each row to the index of the corresponding staff member
            row.id = i;
        }
    }
    
    loadTableData(staff);
});

$(document).ready(function() {
    $('#staffOut').click(function staffOut() {
        const selectedRow = staffDashboard.querySelector('.selected');
        const staffIndex = selectedRow.id;
    
        staff[staffIndex].status = "Out";
    
        selectedRow.querySelector('td:nth-child(5)').innerHTML = "Out";
    
        //Prompts for time out to calculate the other rows, rounds down to whole number.
        let hours = 0;
        let outTime = 0;
        while (true) {
            outTime = parseInt(prompt('Enter the length of the outing in minutes'));
            if (!isNaN(parseInt(outTime))) {
                break;
            }
            alert('Please enter a number');
        }
        if (outTime >= 60) {
        hours = Math.floor(outTime / 60);
        minutes = Math.abs(outTime - (hours * 60));
        } else {
        minutes = outTime;
        }
        let formatedTime = `${hours}h ${minutes}mins`;
        
        staff[staffIndex].outTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
        staff[staffIndex].duration = formatedTime;
        staff[staffIndex].expectedReturnTime = new Date(new Date().setMinutes(new Date().getMinutes() + parseInt(outTime))).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
    
        staffDashboard.querySelector('.selected td:nth-child(6)').innerHTML = staff[staffIndex].outTime;
        staffDashboard.querySelector('.selected td:nth-child(7)').innerHTML = staff[staffIndex].duration;
        staffDashboard.querySelector('.selected td:nth-child(8)').innerHTML = staff[staffIndex].expectedReturnTime;
    });
});

$(document).ready(function(){
    $('#staffIn').click(function staffIn(){
        const selectedRow = staffDashboard.querySelector('.selected');
        const staffIndex = selectedRow.id;
        // This resets the class objects constructors when no longer out, toastshown set to false so we can trigger toast again later if needed.
        staff[staffIndex].status = "In";
        staff[staffIndex].outTime = undefined
        staff[staffIndex].duration = undefined
        staff[staffIndex].expectedReturnTime = undefined
        staff[staffIndex].toastShown = false
        selectedRow.querySelector('.selected td:nth-child(5)').innerHTML = staff[staffIndex].status; 
        selectedRow.querySelector('.selected td:nth-child(6)').innerHTML = ""
        selectedRow.querySelector('.selected td:nth-child(7)').innerHTML = ""
        selectedRow.querySelector('.selected td:nth-child(8)').innerHTML = ""
    });
});

// Validation of inputs
const vehicleInput = document.getElementById('vehicleInput');
const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const telephoneInput = document.getElementById('telephoneInput');
const addressInput = document.getElementById('addressInput');
const returnTimeInput = document.getElementById('returnTimeInput');

function validateDelivery() {
    // So only valid info can be put into fields.
    const phoneCheck = /^\(?([0-9]{8})$/;
    const addressCheck = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const vehicleCheck = /^(car|motorcycle)$/i;
    const nameCheck = /^[a-zA-Z]{2,}$/;
    const returnTimeCheck = /^(0[0-9]|1[0-9]|2[0-4]):(0[0-9]|[1-5][0-9])$/;

    if (!vehicleCheck.test(vehicleInput.value)) {
        alert('Please enter a valid vehicle type (Car or Motorcycle)');
        return true;
    }

    if (!nameCheck.test(nameInput.value)) {
        alert('Please enter a valid name (at least two letters, no special characters or digits)');
        return true;
    }

    if (!nameCheck.test(surnameInput.value)) {
        alert('Please enter a valid surname (at least two letters, no special characters or digits)');
        return true;
    }

    if (!phoneCheck.test(telephoneInput.value)) {
        alert('Please enter a norwegian telephone number (8 digits)');
        return true;
    }

    if (!addressCheck.test(addressInput.value)) {
        alert('Please enter a address containing atleast 1 letter and 1 digit');
        return true;
    }

    if (!returnTimeCheck.test(returnTimeInput.value)) {
        alert('Please enter returntime in HH:MM format (max 23:59)');
        return true;
    }
    return false;
}

let drivers = []
let driverTable = document.getElementById('deliveryDashboard');
$('#addDelivery').click(function addDelivery() {
    //Checks if input is correct before pushing to class object.
    if (!validateDelivery()) {
        let driver = new deliveryDriver(
            nameInput.value,
            surnameInput.value,
            vehicleInput.value,
            telephoneInput.value,
            addressInput.value,
            returnTimeInput.value
        );
            //unshift so we can target and clear it later.
            drivers.unshift(driver);
            
            //Puts newest driver at top, this is done so we can clear and delete objects in the future.
            let row = driverTable.insertRow(1);

            //Makes it so we can select specific target from table.
            row.onclick = function(event) {
            let target = event.target;
            let parent = target.parentElement;
            let removeSelected = Array.from(document.getElementsByClassName('selected'));
            removeSelected.forEach(function(element) {
                element.classList.remove('selected');
            });
                parent.classList.add('selected');
            };
            
            let driverVehicle = row.insertCell(0);
            if (drivers[0].vehicle.toLowerCase() === "car") {
                driverVehicle.innerHTML = '<i class="bi bi-car-front-fill"></i>';
              } else if (drivers[0].vehicle.toLowerCase() === "motorcycle") {
                //Bootstrap has no motorcycle icon, used bike as a placeholder.
                driverVehicle.innerHTML = '<i class="bi bi-bicycle"></i>';
              }
            let driverName = row.insertCell(1);
            driverName.innerHTML = drivers[0].name;
            let driverSurname = row.insertCell(2);
            driverSurname.innerHTML = drivers[0].surname;
            let driverTelephone = row.insertCell(3);
            driverTelephone.innerHTML = drivers[0].telephone;
            let driverAddress = row.insertCell(4);
            driverAddress.innerHTML = drivers[0].deliverAddress;
            let driverReturnTime = row.insertCell(5);
            driverReturnTime.innerHTML = drivers[0].returnTime;
            
            // Clears input fields so its easier to add the next driver
            $('#scheduleDashboard input').val('');
               
        }  
});

// To clear drivers no longer who are no longer activly working.
$("#clearDelivery").click(function clearDriver() {
    if (confirm('Are you sure you want to remove the selected driver?')) {
      let selectedRow = $('.selected');
      let index = selectedRow.index();
      selectedRow.remove();
      //Combined with unshifting new driver objects, and putting them at the top of table this deletes the correct object.
      drivers.splice(index-1, 1);
    }
  });

// button hover increase size to increase visability.
$(document).ready(function(){
    $('.btn').hover(function buttonHover(){
        $(this).css('font-size', '1.5em');
        }, function() {
        $(this).css('font-size', '1em');
    });
})

// Clock
function digitalClock () {
    let today = new Date()
    // getMonth appears to be starting with 0, +1 to give the correct month.
    let date = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+ ' '+time;
	document.getElementById("date-time").innerHTML = dateTime;
}
// Updates time function every 1000ms.
let timeInterval = setInterval(digitalClock, 1000);

//If more than one staff was supposed to return at the same time, the toasts are slightly staggered.
function lateStaff () {
    staff.forEach(function(member,index) {
        setTimeout(function() {
            member.staffMemberIsLate();
        }, 5000* (index+1));
    });
}
//checks if any staff is late every 10 secs
let staffInterval = setInterval(lateStaff, 10000)

//If more than one driver was supposed to return at the same time, the toasts are slightly staggered.
function lateDriver () {
    drivers.forEach(function(driver, index) {
        setTimeout(function() {
            driver.deliveryDriverIsLate();
        }, 5000 * (index + 1));
    });
}

//checks if any staff is late every 10 secs
let driverInterval = setInterval(lateDriver, 10000)


$(document).ready(function navbarfunctions() {
    //To prevent any action on inventory/orders + sub menus in navbar till functionality is added.
    $('#inventoryDropdown').click(function(event) {
      event.preventDefault();
    });
    $('#ordersDropdown').click(function(event) {
      event.preventDefault();
    });
    $('.dropdown-item').click(function(event) {
      event.preventDefault();
    });
  
    // When the dashboardButton is clicked, navigate to the main page
    $('#dashboardButton').click(function() {
      window.location.href = '#';
    });
  });
