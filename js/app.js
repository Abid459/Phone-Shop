const inputName = document.querySelector('#inputName');
const searchResultParent = document.querySelector('#search-result');

const search =()=>{
    const searchText = inputName.value;
    const url= `https://openapi.programming-hero.com/api/phones?search=${searchText}`
     fetch(url)
    .then(res => res.json())
    .then(data => display(data.data))
}
const display = phones =>{
    for(let phone of phones ){
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
              <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
              </div>
            </div>
        `;
        searchResultParent.appendChild(newDiv)
        console.log(phone)
    }
}