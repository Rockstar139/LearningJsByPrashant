let bagItems=[];
onLoad();
function onLoad(){
    retrieveBagItemsFromLocalStorage();
    initializeItems();
    displayBagIcon();
}

function retrieveBagItemsFromLocalStorage(){
   let bagItemsStr = localStorage.getItem('bagItems');
   bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];  
}

function displayBagIcon(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if(bagItems.length>0){
        bagItemCountElement.style.display = "block";
        bagItemCountElement.innerHTML = bagItems.length;
    }
    else{
        bagItemCountElement.style.display = 'none';
    }
}

function addToBag(itemId){
    alert(itemId);
    alert(JSON.stringify(items));
    items.forEach(item =>{
        if(item.id === itemId)
        {
            bagItems.push(structuredClone(item));
            bagItems[bagItems.length-1].id = bagItems.length;

            alert(JSON.stringify(bagItems));
            localStorage.removeItem('bagItems');
            localStorage.setItem('bagItems',JSON.stringify(bagItems));
        }
    });
    displayBagIcon();
}

function initializeItems(){
    
    let itemsContainer = document.querySelector('.items-container');
    let innerHTML ="";
    items.forEach(item =>{
        innerHTML+=`
        <div class="item-container" id="${item.id}">
            <img class="item-image" src="${item.image}" alt="item image">
            <div class="rating">
                ${item.rating.stars} ⭐️ | ${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}s</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% off)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag('${item.id}')">Add to Bag</button>
        </div>`
    })
    itemsContainer.innerHTML = innerHTML;
}

