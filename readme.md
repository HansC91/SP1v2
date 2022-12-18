Employee Management System: 

This code defines an Employee Management System, where the focus is for a receptionist or another person in the company
to keep track off their employees when they are out of office. It also keeps track on current deliveries and drivers. 

How to run:
To run this app, simply double click the index.html file where you saved it, or copy its path and paste it into a broswer window.

Classes: 

Project is built around one superclass Employee and two subclasses staffMember and deliveryDriver, which represents employees in a company. 

 
Employee: 
Defines an employee with two constructors, name, and surname. 

 

staffMember: 

staffMember is a subclass of the employee class, it gets these constructors from its superclass Employee: 
 

    Name 

    Surname 

It further defines itself with these constructors: 

    Picture 

    Email 

    Status 

    Out time 

    Duration 

    Expected return time 

It also sports a staffMembersIsLate() method, which checks current time up against expected return time and displays a toast 
notification with picture, name, and duration if late. 


deliveryDriver: 

DeliveryDriver works the same as staffMember with the constructors from the superclass Employee. 

Whilst itself has these constructors: 

    Vehicle 

    Telephone 

    Delivery address 

    Return time 

And lastly it has a deliveryDriverIsLate function which compares current time to return time and shows a toast with name, surname,
supposed return time, telephone number, and deliver address if they are late to return. 

 

Tables and buttons: 

Table population is a big part of this project. The Staff dashboard is populated with a staffUserGet() function which uses fetch API to get
data for 5 unique people from randomuser.me, the API is loaded onto the staffMember class before being pushed with a loadTableData(staff) function. 
 
The Staff dashboard has several rows empty when the staffMember is at location, and pressing the out putting triggers the staffOut function
which prompts the user for outing time in minutes(always rounded down if not a whole number) before updating the rest of the table for that specific member. Pressing the In button triggers
staffIn function which sets the member status back to “in” and clears the previously empty fields. 
 
There are also two other tables to consider, one with a manual input field where the receptionist manually inputs relevant information about
drivers/deliveries, when the input is filled and the add button is pressed the addDelivery function is triggered which first calls the validateDelivery
function that checks if all inputs are valid and if it is adds that driver to the deliveryDriver class before populating the Delivery Board table. 
Once the delivery board is populated you have the option to select a driver/row and clicking the clear button, this clears the selected row and removes 
the driver object from the deliveryDriver class. 

 

Misc: 

There are also some small functions worth noting. 
digitalClock(): displays the date and time in day/month/year hour:minute:seconds format at the bottom right hand of the page. 
 

buttonHover: increases the size of the button you are hovering so you can easily see when you are on it. 

 
lateStaff/lateDriver: paired with setInterval to trigger the subclass functions if a staff or driver is late. 

Final thoughts:
The web application has four main uses all connected to individual buttons:
Out button: Sets the selected staffs status to out with correct, outtime, duration and expected return time all calculated from one single prompt entry.
In button: clocks the selected staff back in, and clears the objects Status/outtime/duration/expected returntime.
Add button: validates the manual input and moves it to the delivery board.
Clear: Clears the selected driver from the deliveryboard, and removes it from the deliveryDriver class.

