const inputName = document.querySelector('#inputName');
const searchResultParent = document.querySelector('#search-result');
const detailsResult = document.querySelector('.details');
const showMore = document.querySelector('.show-more');

let fetchData = '';
let range = 20;
let count = 0;

const search = () => {

    const searchText = inputName.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    inputName.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            fetchData = data.data;
            display(fetchData)
        })
}
const display = phones => {
    for (let phone of phones) {
        if (count >= range) {
            const showMoreBtn = document.createElement('button')
            showMoreBtn.innerText = 'Show More';
            showMore.appendChild(showMoreBtn);
            showMore.addEventListener('click', () => {
                range = 10000;
                display(fetchData);
                showMore.removeChild(showMoreBtn);

            })

            return;
        }
        count++;
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
              <div class="card p-3 text-center">
                <img src="${phone.image}" class="card-img-top w-75  p-5 mx-auto" alt="...">
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
        // console.log(phone)
    }
}

const showDetails = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(details => {
            // console.log(details.data);
            displayDetails(details);
        })
    // console.log(phoneId)
}

const displayDetails = details => {
    const detailsDisplay = document.createElement('div');
    const feature = details.data.mainFeatures;
    const sensors = feature.sensors;
    const otherFeature = Object.entries(details.data.others);
    console.log(otherFeature);
    detailsDisplay.innerHTML = `
            <p><b>cheaprset:</b> ${feature.chipSet}</p>
              <p><b>Memory:</b> ${feature.memory}</p>
              <p><b>Storage:</b> ${feature.storage}</p>
              <p><b>Display Size:</b> ${feature.displaySize}</p>

              <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Sensors
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    ${sensors}
                  </div>
                </div>
              </div>
            

            <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Others
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body">
              ${otherFeature}
              </div>
            </div>
          </div>
          </div>
    `
    detailsResult.appendChild(detailsDisplay);
}
const showSensors = sensors => {

}