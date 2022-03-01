const inputName = document.querySelector('#inputName');
const searchResultParent = document.querySelector('#search-result');
const detailsResult = document.querySelector('.details');
const showMore = document.querySelector('.show-more');
const spinner = document.querySelector('#spinner');
const layer = document.querySelector('.layer');

let fetchData = '';
let range = 0;
let count = 0;
// let releaseDate = '';

const search = () => {
    range = 20;
    layer.style.display = "block";
    spinner.style.display = "block";
    showMore.textContent = '';
    searchResultParent.innerHTML = '';
    detailsResult.textContent = '';
    detailsResult.style.display = "none";

    const searchText = inputName.value.toLowerCase();
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    inputName.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            fetchData = data.data;
            console.log(data);
            display(fetchData)
        })
        


}
const display = phones => {
    if (phones.length == 0) {
        detailsResult.style.display = "block";
        detailsResult.innerHTML = `<h4>No phone Found.Try different name</h4>`;
        layer.style.display = "none"
        spinner.style.display = "none";
        // 
        return;
    }
    count = 0;
    for (let phone of phones) {
        // debugger;
        // let releaseDateTemp = releaseDatefn(phone.slug);
        // console.log(releaseDateTemp);
        if (count >= range) {
            const showMoreBtn = document.createElement('button')
            showMoreBtn.innerText = 'Show More';
            showMore.appendChild(showMoreBtn);
            showMore.addEventListener('click', () => {
                range = 10000;
                display(fetchData);
                showMore.removeChild(showMoreBtn);

            })
            // spinner.style.display = "none";
            return;
        }
        count++;
        console.log(phone);

        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
              <div class="card p-3 text-center">
                <img src="${phone.image}" class="card-img-top w-75  p-5 mx-auto" alt="...">
                <div class="card-body">
                  <h4 class="card-title">${phone.phone_name}</h4>
                  <p class="card-text" id= "dateUpdate" onload = "add()">Release Date:"${add(phone.slug)}"</p>
                 <h4>Brand: ${phone.brand}</h4>
                  <button onclick = "showDetails('${phone.slug}')">See details</button>
                </div>
              </div>
            </div>
        `;
        // setTimeout(() => {
        // }, 2000);

        searchResultParent.appendChild(newDiv)
        spinner.style.display = "none";
        layer.style.display = "none"
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
    detailsResult.textContent = '';
    detailsResult.style.display = "block";
    const detailsDisplay = document.createElement('div');
    const feature = details.data.mainFeatures;
    const sensors = feature.sensors;
    const otherFeature = Object.entries(details.data.others);
    console.log(details.data.releaseDate);
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

const upadteDate = data => {
    return data.data.releaseDate;
}
let releaseDate = ''
function add (){
    fetch(`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // const datePera = document.querySelector('#dateUpdate')
                console.log(data)
                // var releaseDate = data.data.releaseDate;
                // datePera.innerText = releaseDate;
                console.log(releaseDate)
            })
            return releaseDate;
            // return date2;
}
const a = add();
console.log(a);