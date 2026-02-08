
onLoad();
function onLoad(){
    retrieveBagItemsFromLocalStorage();
    initializeBag();
    displayBagIcon();
}

function removeItemFromBag(itemId){
    bagItems = bagItems.filter(item => item.id == itemId ? false : true
    );
     localStorage.removeItem('bagItems');
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    onLoad();
}

function initializeBag(){
    let bagItemsTotal = document.querySelector('.bag-details-container');
    let bagItemsContainer = document.querySelector('.bag-items-container');
    let itemsInnerHTML = "";
    let detailsInnerHTML = "";
    let totalMrp = 0;
    let totalDiscount = 0;
    let totalAmt = 0;
    let convenienceFee = 0;
    bagItems.forEach(item =>{
    totalMrp+= item.original_price;
    totalAmt+= item.current_price;
    itemsInnerHTML += `
    <div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
        </div>
        <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
            <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
        </div>

        <div class="remove-from-cart" onclick="removeItemFromBag('${item.id}')">X</div>
        </div>`
    });

    if(bagItems.length>0){
        totalDiscount = totalMrp - totalAmt;
        convenienceFee = 99;
        totalAmt += convenienceFee;
    }

    detailsInnerHTML = `<div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs ${totalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convenienceFee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${totalAmt}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`

    if(bagItems.length == 0){
        itemsInnerHTML = "<h2>Your Cart is empty. Plz continue shopping.</h2>"
    }
    bagItemsContainer.innerHTML = itemsInnerHTML;
    bagItemsTotal.innerHTML = detailsInnerHTML;
}
