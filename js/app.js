const inputName = document.querySelector('#inputName');
const searchResultParent = document.querySelector('#search-result');
const detailsResult = document.querySelector('.details');

const search = () => {
    const searchText = inputName.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => display(data.data))
}
const display = phones => {
    for (let phone of phones) {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
              <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h4 class="card-title">${phone.phone_name}</h4>
                  <p class="card-text">Release Date</p>
                 <h4>Brand: ${phone.brand}</h4>
                  <button onclick = "showDetails('${phone.slug}')">See details</button>
                </div>
              </div>
            </div>
        `;
        searchResultParent.appendChild(newDiv)
        console.log(phone)
    }
}

const showDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(details => {
            // console.log(details);
            displayDetails(details);
        })
    console.log(phoneId)
}

const displayDetails = details => {
    const detailsDisplay = document.createElement('div');
    const feature = details.data.mainFeatures;
    detailsDisplay.innerHTML=`
            <p>cheaprset: ${feature.chipSet}</p>
              <p>Memory : ${feature.memory}</p>
              <p>Storage:${feature.storage}</p>
              <p>Display Size:${feature.displaySize}</p>
              <p>Sensors<ion-icon name="caret-down-outline"></ion-icon></p>
              <p>Others<ion-icon name="caret-down-outline"></ion-icon></p>
    `
    detailsResult.appendChild(detailsDisplay);
}