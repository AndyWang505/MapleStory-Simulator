export default function cube() {
    const draggableElement = document.querySelector('.cube_interface');
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let dragging = false;
    // the above is the drag-and-drop feature
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
  
    ctx.beginPath();
    ctx.moveTo(50,50);
    canvas.width = 196;
    canvas.height = 355;
  
    const spriteSheet = new Image();
    spriteSheet.src = "./doc/images/cube/animus_cube/Normal.png";
  
    let cols = 11;
    let rows = 1;
    let spriteWidth = 2156 / cols; //width
    let spriteHeight = 355 / rows; //hight
    // init
    let srcX = 0;
    let srcY = 0;
    // speed
    let totalFrames = 11;
    let currentFrame = 0;
    let frameDrawn = 0;
  
    function animate(){
        // clear table
        ctx.clearRect(0,0,canvas.width, canvas.height);

        currentFrame = currentFrame % totalFrames;
        srcX = currentFrame * spriteWidth;
        
        ctx.drawImage(spriteSheet, srcX, srcY,spriteWidth, spriteHeight,
        0,0 ,spriteWidth, spriteHeight);
        
        frameDrawn++;
        if(frameDrawn>=11){
        currentFrame++;
        frameDrawn = 0;
        }
        requestAnimationFrame(animate);
    }
    animate();
  
    draggableElement.addEventListener("mousedown", dragStart);
    draggableElement.addEventListener("mouseup", dragEnd);
    draggableElement.addEventListener("mousemove", drag);
  
    function dragStart(e) {
        draggableElement.style.zIndex = 100;
        document.querySelector('.itembag').style.zIndex = 10;
        const elementRect = draggableElement.getBoundingClientRect();
        if (e.clientY < elementRect.top + 20) {
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