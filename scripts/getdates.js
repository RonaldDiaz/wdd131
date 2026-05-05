const year = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
year.innerHTML = currentYear;
document.getElementById("lastModified").innerHTML = document.lastModified;