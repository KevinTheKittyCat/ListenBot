var container = document.querySelector("#body");
    var activeItem = null;

    var active = false;

    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd);
    container.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      console.log("new input")

      if (e.target !== e.currentTarget) {
        active = true;

        // this is the item we are interacting with
        activeItem = e.target;

        if (activeItem !== null) {
          if (!activeItem.xOffset) {
            activeItem.xOffset = 0;
          }

          if (!activeItem.yOffset) {
            activeItem.yOffset = 0;
          }

          if (e.type === "touchstart") {
            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
            activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
          } else {
            console.log("doing something!");
            activeItem.initialX = e.clientX - activeItem.xOffset;
            activeItem.initialY = e.clientY - activeItem.yOffset;
          }
        }
      }
    }

    function dragEnd(e) {
      console.log("released")
      console.log(e)
      if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
      }

      //Write Json saving Image positions
      for (let i = 0; i < container.children.length; i++) {
        let ImagePosition = container.children[i].style.transform
        /*
        console.log(ImagePosition)
        if (ImagePosition != 0 ) {
        let afterSplit = ImagePosition
        let split1 = afterSplit.split("(")
        console.log(split1)
        let split2 = split1[1].split(")")
        console.log(split2)
        let split3 = split2[0].split(",")
        
        let imageX = split3[0]
        let imageY = split3[1]
        console.log(imageX)
        console.log(imageY)
        setCookie(container.children[i].className + "X", imageX, 365);
        setCookie(container.children[i].className + "Y", imageY, 365);
        
        setCookie(container.children[i].className, ImagePosition, 365)

        //x first, then Y
        }
        */
        localStorage.setItem(container.children[i].className, ImagePosition);
        //setCookie(container.children[i].className, ImagePosition, 365)
      }

      
    

      active = false;
      activeItem = null;
    }

    function drag(e) {
      console.log(e)
      if (active) {
        if (e.type === "touchmove") {
          e.preventDefault();

          activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
          activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
          
          activeItem.currentX = e.clientX - activeItem.initialX //e.clientX - (activeItem.initialX/2);
          activeItem.currentY = e.clientY - activeItem.initialY //e.clientY - activeItem.initialY;
        }
        
        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;
        
        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

async function createJsonFile() {
  //container.children.forEach(element => console.log(element))
  //$("#peopleContainer").children(element => console.log(element))
/*
  for (let i = 0; i < container.children.length; i++) {
    console.log(container.children[i].style.x);
  }

var rect = container.children[2].getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
*/
let ImagePosition = container.children[2].style.transform
document.cookie = `${ImagePosition}; expires=Thu, 18 Dec 2013 12:00:00 UTC`;


  /*
      await fs.writeFile('UserPosition.json', JSON.stringify(json), function (err) {
        if (err) throw err;

        console.log('Replaced!');
      });
      */
}
/*
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
*/