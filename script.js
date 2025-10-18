import { getData, setData, getUserIds } from "./storage.js";

////DOM references
let userDropdown;

//data
const userIds = getUserIds()



//populate the dropdown
function populateUserDropdown (){
 userIds.forEach((user)=> {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = `User ${user}`;
    userDropdown.appendChild(option)

})

}


// Initialize application
function setUp() {
    userDropdown = document.getElementById("user");
    populateUserDropdown()
}

window.onload = setUp