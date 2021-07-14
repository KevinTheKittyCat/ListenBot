var container = document.querySelector("#peopleContainer");


setInterval(check, 100)


function check() {
    //console.log(container.children[2])
    $.getJSON("./Users.json", function (json) {
        json.forEach(element => {
            //console.log(container.children)
            //document.body.onload = addElement;

            let doesUserExist = document.querySelector(`#k${element.identity}`);
            if (!doesUserExist) {

                console.log(doesUserExist + " did not exist")
                addElement()
                function addElement() {
                    // create a new div element
                    const newUser = document.createElement("img");
                    newUser.className = `player k${element.identity}`;
                    newUser.src = `${element.identity}/default.png`
                    newUser.id = `k${element.identity}`
                    // and give it some content
                    //const newContent = document.createTextNode("Hi there and greetings!");

                    // add the text node to the newly created div
                    //newDiv.appendChild(newContent);

                    // add the newly created element and its content into the DOM
                    //const currentDiv = document.getElementById("peopleContainer");
                    //document.body.insertBefore(newDiv, currentDiv);
                    container.appendChild(newUser)
                    let localpos = localStorage.getItem(newUser.className)
                    // Retrieve
                    console.log(localpos)
                    console.log(container.children)
                    container.children[newUser.id].style.transform = localpos
                }
            }
            //let userDivNew = document.querySelector(`#k${element.identity}`);

            //console.log(userDivNew)
            /*if (document.getElementsByClassName(`${element.identity}`)) {
                console.log
            }
            
            if ($('#poh').length > 0) {
                // Exists.

              }
              */
            /*
          if (document.body.contains(element.identity)) {
              console.log("Found person")
          }
          */
            //console.log()
            //console.log(json["150705291497963521"]); // this will show the info it in firebug console
            //console.log(element)
            let isSpeaking = element.speaking
            //console.log(element.speaking)
            //console.log(element)
            const slider = document.querySelector(`.k${element.identity}`);
            //console.log(slider)
            //console.log($('.active'))
            //console.log(json["150705291497963521"]); // this will show the info it in firebug console
            //console.log(slider)
            //console.log(slider.classList)

            if (isSpeaking) {
                was = true
                //console.log("turning on") ${element.images[]}
                /*
                if (slider.attributes.src.nodeValue == `${element.identity}2.png`) {
                    slider.setAttribute("src", `${element.identity}3.png`)
                } else {
                    slider.setAttribute("src", `${element.identity}2.png`)
                }
                */
                let onlyImages = element.images.filter(image => image !== 'default.png');
                let randomNumberForImages = Math.floor(Math.random() * onlyImages.length) + 1
                console.log(onlyImages)
                console.log(randomNumberForImages)
                console.log(onlyImages[randomNumberForImages - 1])

                slider.setAttribute("src", `./${element.identity}/${onlyImages[randomNumberForImages - 1]}`)

                slider.classList.add('active');
                //document.getElementsByClassName(container.children[i].className + " active")

            } else if (!isSpeaking && slider.classList[2] == "active") {
                slider.setAttribute("src", `./${element.identity}/default.png`)
                was = false
                //console.log("turning off")
                slider.classList.remove('active');
            } else {
                //console.log("This user does not exist")
            }
        })
    });
}