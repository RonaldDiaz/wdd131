const courses = [
  "CSE 110",
  "CSE 111",
  "WDD 130",
  "WDD 131",
  "WDD 231",
  "CSE 210"
];

// 1️⃣ map() courses to subject list
const mapAnswer = document.querySelector("#subjects");
const subjects = courses.map(course => course.split(" ")[0]);
mapAnswer.innerHTML = subjects.map(subject => `<li>${subject}</li>`).join("");

// *************************************************************************************
const countries = [
  "Uganda",
  "United States",
  "Uruguay",
  "Brazil",
  "Canada",
  "Germany",
  "Japan",
  "Mexico",
  "Spain",
  "Turkey"
];

// 2️⃣ filter() countries to those starting with "U"
const filterAnswer = document.querySelector("#u");
const filteredCountries = countries.filter(country => country.startsWith("U"));
filterAnswer.innerHTML = filteredCountries.map(country => `<li>${country}</li>`).join("");

const fruits = [
  { name: "apple", price: 1 },
  { name: "banana", price: 0.5 },
  { name: "orange", price: 1.2 },
  { name: "grape", price: 0.1 }
];

// 3️⃣ reduce() array of objects to total cost.
const reduceAnswer = document.querySelector("#total");
reduceAnswer.textContent = fruits.reduce((totalCost, fruit) => totalCost + fruit.price, 0).toFixed(2);

// *************************************************************************************
const students = [
  { fullName: "Alice Johnson", state: "California, USA", class: "Mathematics" },
  {
    fullName: "Benjamin Lee",
    state: "Ontario, Canada",
    class: "Computer Science"
  },
  { fullName: "Chloe Smith", state: "London, UK", class: "Physics" },
  { fullName: "David Kim", state: "Seoul, South Korea", class: "Engineering" },
  { fullName: "Elena Rodriguez", state: "Madrid, Spain", class: "Biology" },
  { fullName: "Felix Müller", state: "Berlin, Germany", class: "History" }
];
// 4️⃣ loop through the array
const foreachAnswer = document.querySelector("#studentList");
const studentsNames = [];
students.forEach(student => studentsNames.push(student.fullName));
foreachAnswer.innerHTML = studentsNames.map(name => `<li>${name}</li>`).join("");

// *************************************************************************************
const products = [
  {
    name: "Widget A",
    partNumber: "WA-123",
    quantity: 50,
    price: 12.5
  },
  {
    name: "Gear B",
    partNumber: "GB-456",
    quantity: 100,
    price: 3.75
  },
  {
    name: "Lever C",
    partNumber: "LC-789",
    quantity: 25,
    price: 25.0
  },
  {
    name: "Bolt D",
    partNumber: "BD-012",
    quantity: 200,
    price: 0.5
  },
  {
    name: "Panel E",
    partNumber: "PE-345",
    quantity: 10,
    price: 50.0
  },
  {
    name: "Wire F",
    partNumber: "WF-678",
    quantity: 150,
    price: 1.25
  },
  {
    name: "Tube G",
    partNumber: "TG-901",
    quantity: 30,
    price: 18.0
  }
];
// 5️⃣ find first 'expensive' product
const findAnswer = document.querySelector("#product");
const findValue = products.find(product => product.price > 20);
findAnswer.innerHTML =`<li>${findValue.name}</li>`;

// *************************************************************************************
// 6️⃣ determine if Canada is contained within the array countries (see line 18)
const indexAnswer = document.querySelector("#output");
const index = countries.indexOf("Canada")
indexAnswer.textContent = index > -1 ? index : "Not Found";
