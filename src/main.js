import selector from "./component/selector.js";
import cube from "./component/cube.js";
import cursor from "./component/cursor.js";
import table from "./component/table.js";
import inventory from "./component/inventory.js";
// backup
import equipData from "./data/equip.js";
import useData from "./data/use.js";
import cashData from "./data/cash.js";

const cubeInterface = document.querySelector('.cube_interface');
const itembag = document.querySelector('.itembag');
cubeInterface.style.backgroundImage = "url('./doc/images/cube/animus_cube/interface.png')";
itembag.style.backgroundImage = "url('./doc/images/Item.productionBackgrnd3.png')";

window.onload = () => {
    cursor();
    selector();
    table(document.querySelectorAll('.equip_col img'));
    cube();
    inventory();
}

async function getData(){
    try{
        const result = [...equipData, ...cashData, ...useData];
        // console.log(result);
        // console.log('Load backup data.');
        return result;
    }catch(err){
        console.log('/main.js : getData failed!' + err);
    }
}

export default getData;