const input = document.querySelector("#favchap"); // Need to use # because we are referring to its id
const button = document.querySelector("button"); // We are taking the button by its tag, # is not necessary
const list = document.querySelector(".list"); // Here, we are using the class to select the element, and we need the "."
let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener("click", function() {
    const newChapter = input.value.trim()
    if (newChapter !== "") {
        displayList(newChapter);
        chaptersArray.push(newChapter);
        setChapterList();
        input.value = "";
        input.focus();
    }
});

function displayList(item) {
    const delButton = document.createElement("button");
    const li = document.createElement("li");
    li.textContent = item;
    delButton.textContent = "❌";
    delButton.classList.add("delete");
    li.append(delButton);
    list.append(li);
    delButton.addEventListener("click", () => {
        list.removeChild(li);
        deleteChapter(item);
        input.focus();
    })
}

function setChapterList() {
    localStorage.setItem("BOMList", JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem("BOMList"));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length -1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}