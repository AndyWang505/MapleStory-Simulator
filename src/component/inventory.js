// import getData from "../main.js";

export default function inventory(){
    const draggableElement = document.querySelector('[draggable=true]');
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let dragging = false;
    
    draggableElement.addEventListener("mousedown", dragStart);
    draggableElement.addEventListener("mouseup", dragEnd);
    draggableElement.addEventListener("mousemove", drag);
    
    function dragStart(e) {
        draggableElement.style.zIndex = 100;
        document.querySelector('.cube_interface').style.zIndex = 10;
        const elementRect = draggableElement.getBoundingClientRect();
        if (e.target === draggableElement && e.clientY < elementRect.top + 20) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            dragging = true;
        }
    }
    
    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      dragging = false;
    }
    
    function drag(e) {
      if (dragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, draggableElement);
      }
    }
    
    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}