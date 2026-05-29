const hambutton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

const homeButton = document.querySelector("#home");
const oldButton = document.querySelector("#old");
const newButton = document.querySelector("#new");
const largeButton = document.querySelector("#large");
const smallButton = document.querySelector("#small");

const filterName = document.querySelector("#filter-name");
const filterDescription = document.querySelector("#filter-description");

hambutton.addEventListener("click", () => {
    hambutton.classList.toggle("open");
    navigation.classList.toggle("open");
    // Add an appropiate aria label for both states
    const isOpen = hambutton.classList.contains("open");
    hambutton.setAttribute("aria-expanded", isOpen ? "true" : "false");
})

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
  {
    templeName: "Caracas Venezuela",
    location: "Caracas, Venezuela",
    dedicated: "2000, August, 20",
    area: 15332,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/_temp/096-Caracas-Venezuela-Temple.jpg"
  },
  {
    templeName: "Bogotá Colombia",
    location: "Bogotá, Colombia",
    dedicated: "1999, April, 24",
    area: 53500,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/bogota-colombia-temple/bogota-colombia-temple-7733-main.jpg"
  },
  {
    templeName: "Sao Paulo Brazil",
    location: "Sao Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
  }
];

const pictureContainer = document.querySelector(".picture-container");

// Alternative: We can do it with template literals
// pictureContainer.innerHTML = temples.map(temple => `
//     <div class="card">
//         <div>
//             <h2>${temple.templeName}</h2>
//             <p><span class="label">Location:</span> ${temple.location}</p>
//             <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
//             <p><span class="label">Size:</span> ${temple.area} sq ft</p>
//         </div>
//         <img
//             src=${temple.imageUrl} alt="Image of ${temple.templeName}"
//             loading="lazy" width="400" height="250">
//     </div>
// `).join("");

createCard(temples);

homeButton.addEventListener("click", () => {
    filterName.textContent = "All Temples";
    filterDescription.textContent = "Complete List of Temples"
    createCard(temples);
});

oldButton.addEventListener("click", () => {
    filterName.textContent = "Old Temples";
    filterDescription.textContent = "Temples built before 1900"
    createCard(temples.filter(temple => Number(temple.dedicated.split(",")[0]) < 1900));
});

newButton.addEventListener("click", () => {
    filterName.textContent = "New Temples";
    filterDescription.textContent = "Temples built after 2000"
    createCard(temples.filter(temple => Number(temple.dedicated.split(",")[0]) > 2000));
});

largeButton.addEventListener("click", () => {
    filterName.textContent = "Large Temples";
    filterDescription.textContent = "Temples with more than 90000 sq ft"
    createCard(temples.filter(temple => temple.area > 90000));
});

smallButton.addEventListener("click", () => {
    filterName.textContent = "Small Temples";
    filterDescription.textContent = "Temples with less than 10000 sq ft"
    createCard(temples.filter(temple => temple.area < 10000));
})


function createCard(temples) {
    const fragment = document.createDocumentFragment();
    pictureContainer.innerHTML = "";
    temples.forEach(temple => {
      
        let card = document.createElement("div");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedicated = document.createElement("p");
        let size = document.createElement("p");
        let img = document.createElement("img");
        
        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        size.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;
        
        size.setAttribute("class", "size");
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `Image of ${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "400");
        img.setAttribute("height", "200");

        card.setAttribute("class", "card");
        
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(size);
        card.appendChild(img);
        
        fragment.appendChild(card);
    });
    pictureContainer.appendChild(fragment);
}