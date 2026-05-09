const hambutton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

hambutton.addEventListener("click", () => {
    hambutton.classList.toggle("open");
    navigation.classList.toggle("open")
})