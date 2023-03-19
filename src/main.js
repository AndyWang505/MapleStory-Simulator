import selector from "./component/selector.js";
import cube from "./component/cube.js";
import cursor from "./component/cursor.js";
import table from "./component/table.js";
import inventory from "./component/inventory.js";
// backup
import equipData from "./data/equip.js";

const cubeInterface = document.querySelector('.cube_interface');
const itembag = document.querySelector('.itembag');
cubeInterface.style.backgroundImage = "url('./doc/images/cube/animus_cube/interface.png')";
itembag.style.backgroundImage = "url('./doc/images/itembag.png')";

window.onload = () => {
    cursor();
    selector();
    table();
    cube();
    inventory();
}

async function getData(){
    try{
        const res = await fetch('https://equip-qtmj.onrender.com/');
        let data = res.json();
        if(!data){
            data = equipData;
            console.log('Load backup data.');
        }
        return data;
    }catch(err){
        console.log('/main.js : getData failed!' + err);
    }
}

export default getData;