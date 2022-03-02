const inputName = document.querySelector('#inputName');
const searchResultParent = document.querySelector('#search-result');
const detailsResult = document.querySelector('.details');
const showMore = document.querySelector('.show-more');
const spinner = document.querySelector('#spinner');
const layer = document.querySelector('.layer');

let fetchData = '';
let range = 0;
let count = 0;
inputName.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    search();
  }
})
const search = () => {
  range = 20;//Set the number of items to display
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
      display(fetchData)
    })
}
const display = phones => {
  if (phones.length == 0) {
    detailsResult.style.display = "block";
    detailsResult.innerHTML = `<h4>No phone Found.Try different name</h4>`;
    layer.style.display = "none"
    spinner.style.display = "none";
    return;
  }
  count = 0;//Reset count value
  for (let phone of phones) {
    if (count >= range) {
      const showMoreBtn = document.createElement('button')
      showMoreBtn.innerText = 'Show More';
      showMore.appendChild(showMoreBtn);
      showMore.addEventListener('click', () => {
        range = 99999;//set the heighest range of items to display for Show more button
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
                  <h4>Brand: ${phone.brand}</h4>
                  <h5 class="card-title">Model: ${phone.phone_name}</h5>
                  <button onclick = "showDetails('${phone.slug}')">See details</button>
                </div>
              </div>
            </div>
        `;
    searchResultParent.appendChild(newDiv)
    spinner.style.display = "none";
    layer.style.display = "none";
  }
}

const showDetails = phoneId => {
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(details => {
      displayDetails(details);
    })
}

const displayDetails = details => {
  detailsResult.textContent = '';
  detailsResult.style.display = "block";
  const detailsDisplay = document.createElement('div');
  const feature = details.data.mainFeatures;
  const sensors = feature.sensors;
  console.log(feature)

  const releaseDate = details.data?.releaseDate ? details.data.releaseDate : `<span style = "color:#C77149">No release date found</span>`;// Release date opitonal chaining
  detailsDisplay.innerHTML = `
            <img src = "${details.data.image}">
            <p><b>Brand:</b> ${details.data.brand}</p>
            <p><b>Model:</b> ${details.data.name}</p>
            <p><b>Release Date:</b> ${releaseDate}</p>
            
            <!-- Main feature------- -->

            <p><b>Chip Set:</b> ${feature.chipSet}</p>
            <p><b>Memory:</b> ${feature.memory}</p>
            <p><b>Storage:</b> ${feature.storage}</p>
            <p><b>Display Size:</b> ${feature.displaySize}</p>
            
            <!-- sensors------- -->
            <p class = "sensors"><b>Sensors: </b>${sensors}</p>

            <!-- other feature------- -->
            <div class="other-feature"></div>
    `;
  detailsResult.appendChild(detailsDisplay);
  // Other feature conditional append
if(details.data?.others){
  const otherFeaturesParent = document.querySelector('.other-feature');
  const otherFeatures = details.data?.others;
  for(let otherFeature in otherFeatures){
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <P><b>${otherFeature}:</b> ${otherFeatures[otherFeature]} </p> 
    `;
    otherFeaturesParent.appendChild(newDiv);
  }
}
}

