import getData from "../main.js";

export default function table(){
    const touch = document.querySelector('.touch');
    const items = document.querySelectorAll('.equip_item img');
    let name = '', subCategory = '', description = '';
    // binary        0       1       2       4      8     16
    let reqJob = ['初心者','劍士','法師','弓箭手','盜賊','海盜'];
    let checkAtt = ['incSTR', 'incDEX', 'incINT', 'incLUK', 'incMHP', 'incMMP', 'incPAD', 'incMAD', 'incPDD', 'incMDD', 'incSpeed', 'incJump', 'bdR', 'imdR'];
    let transferAtt = ['力量', '敏捷', '智力', '幸運', 'MaxHP', 'MaxMP', '攻擊力', '魔法攻擊力', '防禦力', '魔法防禦力', '移動速度', '跳躍力', 'BOSS攻擊時傷害', '無視怪物防禦力'];

    let checkCategory = ['Face Accessory', 'Eye Decoration', 'Earrings', 'Pendant', 'Belt', 'Shoulder Accessory', 'Badge', 'Unknown', 'Mechanical Heart', 'Hat',
                            'Cape', 'Glove', 'Overall', 'Ring', 'Shoes', 'Shining Rod', 'Bladecaster', 'Breath Shooter', 'Soul Shooter', 'Desperado', 'Whip Blade', 
                            'Scepter', 'Psy-limiter', 'Chain', 'Gauntlet', 'Ritual Fan', 'One-Handed Sword', 'One-Handed Axe', 'One-Handed Blunt Weapon', 'Dagger',
                            'Katara', 'Cane', 'Wand', 'Staff', 'Two-Handed Sword', 'Two-Handed Sword', 'Two-Handed Axe', 'Two-Handed Blunt', 'Spear', 'Pole Arm',
                            'Bow', 'Crossbow', 'Claw', 'Knuckle', 'Gun', 'Dual Bowgun', 'Hand Cannon', 'Katana', 'Fan', 'Lapis', 'Lazuli', 'Arm Cannon', 'Ancient Bow'];
    // 武拳index重複
    let transferCategory = ['臉飾', '眼飾', '耳環', '墜飾', '腰帶', '肩膀', '胸章', '能源', '機器心臟', '帽子', '披風', '手套', '套服', '戒指', '鞋子', '閃亮克魯 (單手武器)',
                            '調節器 (單手武器)', '龍息射手 (單手武器)', '靈魂射手 (單手武器)', '魔劍 (單手武器)', '能量劍 (單手武器)', '幻獸棒 (單手武器)', 'ESP限制器 (單手武器)', 
                            '鎖鏈 (單手武器)', '魔力護腕 (單手武器)', '仙扇 (單手武器)', '單手劍 (單手武器)', '單手斧 (單手武器)', '單手棍 (單手武器)', '短劍 (單手武器)', '雙刀 (單手武器)',
                            '手杖 (單手武器)', '短杖 (單手武器)', '長杖 (單手武器)', '雙手劍 (雙手武器)', '武拳', '雙手斧 (雙手武器)', '雙手棍 (雙手武器)', '槍 (雙手武器)', '矛 (雙手武器)',
                            '弓 (雙手武器)', '弩 (雙手武器)', '拳套 (雙手武器)', '指虎 (雙手武器)', '火槍 (雙手武器)', '雙弩槍 (雙手武器)', '加農砲 (雙手武器)', '太刀', '扇子', '琉 (雙手武器)',
                            '璃 (雙手武器)', '重拳槍 (雙手武器)', '古代之弓 (雙手武器)'];

    let dataList = [];
    getData().then(data => {
        dataList = data;
        // console.log(dataList);
    }).catch(err => {
        console.log('/table.js : getData failed!' + err);
    });

    function renderLine(count){
        for(let i=0; i<count; i++){
            document.querySelector('.touch_content').innerHTML += `<div class="line"></div>`;
        }
    }

    items.forEach(item => {
        item.addEventListener('mouseout',() => {
            if (touch) {
                touch.style.display = 'none';
            }
        });

        item.addEventListener('mousemove', (e) => {
            if (touch) {
                // item table position
                touch.style.display = 'block';  
                const touchWidth = touch.offsetWidth;
                const touchHeight = touch.offsetHeight;

                let leftPosition = e.pageX + 10;
                let topPosition = e.pageY - window.scrollY + 10;

                if ((leftPosition + touchWidth + 5) > window.innerWidth) {
                    leftPosition = window.innerWidth - touchWidth - 5;
                }

                if ((topPosition + touchHeight + 5) > window.innerHeight) {
                    topPosition = topPosition - touchHeight - 5;
                }

                leftPosition = Math.max(leftPosition, 0);
                topPosition = Math.max(topPosition, 0);
                touch.style.left = leftPosition + "px";
                touch.style.top = topPosition + "px";

                // split url to get item id
                let parts = e.target.getAttribute('src').split('/');
                let itemId = parts[parts.length - 2];
                
                let itemText = [];
                let result = dataList.find(item => item.id == itemId);

                // asynchronous
                if(result){
                    for(let item of checkAtt){
                        if(item in result.metaInfo){
                            if(result.metaInfo[item] !== 0){
                                itemText.push( { [item]: result.metaInfo[item] } );
                            }
                        }
                    }

                    // rendering equip blocks and attributes
                    document.querySelector('.touch_content').innerHTML = '';
                    document.querySelector('.table_text').innerHTML = '';
                    const catIndex = checkCategory.findIndex( (item) => item === result.typeInfo.subCategory );
                    document.querySelector(".table_text").innerHTML += `<div class="att_category">裝備分類： ${transferCategory[catIndex]}</div>`;
                    document.querySelector(".title_text").textContent = result.description.name;
                    document.querySelector(".lev").textContent = result.metaInfo.reqLevel;
                    document.querySelector(".table_img").style.backgroundImage = `url(https://maplestory.io/api/TWMS/249/item/${result.id}/icon)`;

                    // if a line is added before , then it will return
                    if(document.querySelectorAll('.line').length === itemText.length){
                        return;
                    }else{
                        document.querySelector('.touch_content').innerHTML += `<div class="line"></div>`;
                        for(let i=0; i<itemText.length; i++){
                            document.querySelector('.touch_content').innerHTML += `<div class="line"></div>`;
                            const itemId = itemText[i]
                            for(let key in itemId){
                                const keyIndex = checkAtt.findIndex( (item) => item === key );
                                if(key === 'bdR'){
                                    document.querySelector('.table_text').innerHTML += `<div class="attributes">${transferAtt[keyIndex]}　+${itemId[key]}%</div>`;
                                }else if(key === 'imdR'){
                                    document.querySelector('.table_text').innerHTML += `<div class="attributes">${transferAtt[keyIndex]} ${itemId[key]}%</div>`;
                                }else{
                                    document.querySelector('.table_text').innerHTML += `<div class="attributes">${transferAtt[keyIndex]} ： +${itemId[key]}</div>`;
                                }
                            }
                        }
                        if(result.metaInfo.tuc && result.metaInfo.tuc !== 0){
                            renderLine(3);
                            document.querySelector(".table_text").innerHTML += 
                            `
                            <div class="attributes">可使用捲軸次數 ： ${result.metaInfo.tuc}</div>
                            <div class="bottom_center">
                                <div class="attributes">黃金鐵鎚強化次數： 0</div>
                                <div class="attributes">白金鐵鎚強化次數： 0</div>
                            </div>
                            `;
                        }
                    }
                }
                //console.log(result);
            }
        }, false);
    });

    
}