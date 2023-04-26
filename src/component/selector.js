import getData from "../main.js";
import table from "./table.js";

export default function selector() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownOpen = document.querySelector('.dropdown_open');
    const options = document.querySelectorAll('.option');
    const equipList = document.querySelector('.equip_col');
    const sidebarTabs = document.querySelectorAll('.tab');
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
        const renderedData2 = await renderData(dataList, 'Use');
        const renderedData3 = await renderData(dataList, 'Cash');
        document.querySelector('.tab_content1').querySelector('.equip_col').innerHTML = renderedData;
        document.querySelector('.tab_content2').querySelector('.equip_col').innerHTML = renderedData2;
        document.querySelector('.tab_content3').querySelector('.equip_col').innerHTML = renderedData3;
        table(document.querySelectorAll('.equip_col img'))
        // console.log(dataList);
    }).catch(err => {
        console.log('/selector.js : getData failed!' + err);
    });
    sidebarTabs.forEach((item) => {
        item.addEventListener('click', async (e) => {
            sidebarTabs.forEach((tab) => {
                tab.classList.remove('tab_active');
            });
            e.target.classList.add('tab_active');
            // console.log(e.target.parentNode.nextElementSibling);
            switch(e.target.textContent){
                case '裝備':
                    document.querySelector('.tab_content1').style.display = 'block';
                    document.querySelector('.tab_content2').style.display = 'none';
                    document.querySelector('.tab_content3').style.display = 'none';
                    break;
                case '消耗':
                    document.querySelector('.tab_content2').style.display = 'block';
                    document.querySelector('.tab_content1').style.display = 'none';
                    document.querySelector('.tab_content3').style.display = 'none';
                    break;
                case '特殊':
                    document.querySelector('.tab_content3').style.display = 'block';
                    document.querySelector('.tab_content1').style.display = 'none';
                    document.querySelector('.tab_content2').style.display = 'none';
                    break;
                default:
                    console.log('selected tab error!');
            }
        });
    })

    // filter and rendering equipList
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
            table(document.querySelectorAll('.equip_col img'))
        })
    });

    function filterData(data, value){
        switch(value){
            case 'All':
                return data.filter(item => item.typeInfo.overallCategory === 'Equip' || item.equipGroup === 'Accessory');
                break;
            case 'Armor':
                return data.filter(item => item.typeInfo.category === value);
                break;
            case 'Weapon':
                return data.filter(item => item.equipGroup === value && item.typeInfo.overallCategory === 'Equip' || item.equipGroup === 'Android');
                break;
            case 'Use':
                console.log('Use');
                return data.filter(item => item.typeInfo.overallCategory === value || item.description.name === "追加1星強化券100%");
                break;
            case 'Cash':
                console.log('Cash');
                return data.filter(item => item.typeInfo.overallCategory === value && item.typeInfo.subCategory === 'Miracle Cube');
                break;
            default:
                return data.filter(item => item.typeInfo.category === value);
        };
    }
}

