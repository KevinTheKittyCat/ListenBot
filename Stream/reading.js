var container = document.querySelector("#peopleContainer");


setInterval(check, 100)

// Check if the JSON has changed, reading all the information and applying the information onto
// each User/Image. If there is a new element, it'll check the cache if the element has a position
// and place it accordingly.
function check() {
    // Get the JSON with all the users.
    $.getJSON("./Stream/Users.json", function (json) {
        json.forEach(user => {
            // Check if the User exists
            let doesUserExist = document.querySelector(`#k${user.identity}`);
            
            if (!doesUserExist) {
                console.log(doesUserExist + " did not exist")
                addElement(user)
            }

            let userIsSpeaking = user.speaking

            const userImage = document.querySelector(`.k${user.identity}`);

            // Get the Image List from the JSON file.
            let onlyImages = user.images.filter(image => image !== 'default.png');
            // Randomly Toggle Between Images
            let randomNumberForImages = Math.floor(Math.random() * onlyImages.length) + 1
            console.log(onlyImages[1])
            if (userIsSpeaking) {

                if (onlyImages[0] === "NotSelected.png") {
                    userImage.setAttribute("src", `./Stream/img/NotSelected.png`)
                } else {

                // Set the Image in the HTML from The Random Image selected
                userImage.setAttribute("src", `./UserImages/${user.name}/${onlyImages[randomNumberForImages - 1]}`)
                }
                userImage.classList.add('active');

            } else if (!userIsSpeaking && userImage.classList[2] == "active") {
                if (onlyImages[1] === "NotSelectedDF.png") {
                    userImage.setAttribute("src", `./Stream/img/NotSelectedDF.png`)
                } else {
                    
                // If the User isn't speaking, return to default Image.
                userImage.setAttribute("src", `./UserImages/${user.name}/default.png`)
                userImage.classList.remove('active');
                }

            } else {

            }
        })
    });
}

function addElement(user) {
    // Create a new img User Element
    const newUser = document.createElement("img");
    newUser.className = `player k${user.identity}`;
    newUser.src = `./UserImages/${user.name}/default.png` //|| `./Stream/img/NotSelectedDF.png`
    newUser.id = `k${user.identity}`

    // Make it under the People-Container. All users needs to be under it to be moved.
    container.appendChild(newUser)

    let localpos = localStorage.getItem(newUser.className)
    // If the User/Image has a position Saved, return to that position.
    if (localpos) {
        // The Local Position is 2 numbers, split by a ",".
        // Example: 400,231
        // Example: X,Y
        let posSplitX = localpos.split(",")

        // Get the previous X and Y, add px for CSS.
        let imageX = posSplitX[0] + "px"
        let imageY = posSplitX[1] + "px"

        // Set the X and Y for the HTML Element.
        container.children[newUser.id].style.left = imageX
        container.children[newUser.id].style.top = imageY

    }

}