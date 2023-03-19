export default function cursor(){
    const elementToChange = document.getElementsByTagName("body")[0];
    elementToChange.addEventListener('mousedown', () => {
        elementToChange.style.cursor = "url('./doc/images/cursor/Cursor.12.0.png') 3 0, auto";
    })
    elementToChange.addEventListener('mouseup', () => {
        elementToChange.style.cursor = "url('./doc/images/cursor/cursor.png') -3 3, auto";
    });
} 
