const input = document.querySelector("#favchap"); // Need to use # because we are referring to its id
const button = document.querySelector("button"); // We are taking the button by its tag, # is not necessary
const list = document.querySelector(".list"); // Here, we are using the class to select the element, and we need the "."

button.addEventListener("click", function() {
    if (input.value.trim() !== "") {
        const delButton = document.createElement("button");
        const li = document.createElement("li");
        li.textContent = input.value;
        delButton.textContent = "❌";
        li.append(delButton);
        list.append(li);
        input.value = "";
        delButton.addEventListener("click", () => {
            list.removeChild(li);
            input.focus();
        })
    }
    input.focus();
});