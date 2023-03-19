import getData from "../main.js";
import table from "./table.js";

export default function selector() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownOpen = document.querySelector('.dropdown_open');
    const options = document.querySelectorAll('.option');
    const equipList = document.querySelector('.equip_col');
    let dataList = [];

    // Dropdown Open
    dropdown.addEventListener('click', () => { dropdownOpen.style.display == "none" ? dropdownOpen.style.display = "block" : dropdownOpen.style.display = "none"; });
    // Dropdown Close
    dropdownOpen.addEventListener('click' , (e) => {
        if(e.target.value !== undefined){
            document.querySelector('.selected').textContent = e.target.value;
        }else{
            document.querySelector('.selected').textContent = '整體';
        }
        if (dropdownOpen.style.display == "block") dropdownOpen.style.display = "none"; 
    });

    getData().then(async data => {
        dataList = data;
        // defualt
        const renderedData = await renderData(dataList, 'All');
        equipList.innerHTML = renderedData;
        table();
        // console.log(dataList);
    }).catch(err => {
        console.log('/selector.js : getData failed!' + err);
    });
    // filter and rendering all equip
    function renderData(dataList, value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const renderedData = filterData(dataList, value).map(value => `<div class="equip_item"><img src="https://maplestory.io/api/TWMS/249/item/${value.id}/icon" alt=""></img></div>`).join('');
                resolve(renderedData);
            }, 150);
        });
    }
    
    options.forEach((item) => {
        item.addEventListener('click', async () => {
            const value = item.getAttribute('data-value');
            equipList.innerHTML = '';
            const renderedData = await renderData(dataList, value);
            equipList.innerHTML = renderedData;
            table();
        })
    });

    function filterData(data, value){
        if(value === 'All'){
            return data.filter(item => item.typeInfo.overallCategory === 'Equip' || item.equipGroup === 'Accessory');
        }else if(value === 'Armor'){
            return data.filter(item => item.typeInfo.category === value);
        }else if(value === 'Weapon'){
            return data.filter(item => item.equipGroup === value && item.typeInfo.overallCategory === 'Equip' || item.equipGroup === 'Android');
        }else{
            console.log(data.filter(item => item.typeInfo.category === value));
            return data.filter(item => item.typeInfo.category === value);
        }
    }
}

