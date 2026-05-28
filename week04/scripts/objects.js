let aCourse = {
  code: "WDD131",
  title: "Dynamic Web Fundamentals",
  credits: 2,
  sections: [
    {
      section: "01",
      enrolled: 150,
      instructor: "Jane Doe"
    },
    {
      section: "02",
      enrolled: 99,
      instructor: "Pancho Villa"
    }
   ]
};

function setCourseInformation(course) {
  const courseNameField = document.querySelector("#courseName");
  courseNameField.textContent = `${course.code} - ${course.title}`
}

function renderSections(sections) {
  const tbody = document.querySelector("#sections tbody");
  let rows = "";
  for (const section of sections) {
    rows += `<tr>
                <td>${section.section}</td>
                <td>${section.enrolled}</td>
                <td>${section.instructor}</td>
              </tr>`
  }
  tbody.innerHTML = rows;
  
}

setCourseInformation(aCourse);
renderSections(aCourse.sections);