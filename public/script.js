let students = JSON.parse(localStorage.getItem("students")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentForm");
  const studentsTable = document
    .getElementById("studentsTable")
    .querySelector("tbody");
  const searchField = document.getElementById("searchField");
  const editModal = document.getElementById("editModal");

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const student = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      age: parseInt(document.getElementById("age").value),
      course: parseInt(document.getElementById("course").value),
      faculty: document.getElementById("faculty").value,
      subjects: document.getElementById("subjects").value.split(","),
    };

    if (!validateStudentData(student)) {
      alert("Некоректні дані.");
      return;
    }

    addStudent(student);
  });

  searchField.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    filterStudents(query);
  });

  document.querySelector(".close").onclick = () => {
    editModal.style.display = "none";
  };

  updateStudentsTable();
});

function validateStudentData(student) {
  const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
  const courseRegex = /^[1-6]$/;
  return (
    nameRegex.test(student.name) &&
    nameRegex.test(student.surname) &&
    courseRegex.test(student.course.toString())
  );
}

function addStudent(student) {
  students.push(student);
  updateStudentsTable();
  studentForm.reset();
  localStorage.setItem("students", JSON.stringify(students));
}

function updateStudentsTable() {
  const studentsTable = document
    .getElementById("studentsTable")
    .querySelector("tbody");
  studentsTable.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.surname}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.faculty}</td>
      <td>${student.subjects.join(", ")}</td>
      <td>
        <button class="edit-button" data-index="${index}">Редагувати</button>
        <button class="delete-button">Видалити</button>
      </td>
    `;

    studentsTable.appendChild(row);

    row.querySelector(".edit-button").onclick = () =>
      openEditModal(student, index);
    row.querySelector(".delete-button").onclick = () => {
      students.splice(index, 1);
      updateStudentsTable();
      localStorage.setItem("students", JSON.stringify(students));
    };
  });
}

function openEditModal(student, index) {
  document.getElementById("name").value = student.name;
  document.getElementById("surname").value = student.surname;
  document.getElementById("age").value = student.age;
  document.getElementById("course").value = student.course;
  document.getElementById("faculty").value = student.faculty;
  document.getElementById("subjects").value = student.subjects.join(", ");

  const editModal = document.getElementById("editModal");
  editModal.style.display = "block";

  document.getElementById("editStudentForm").onsubmit = (event) => {
    event.preventDefault();

    const updatedStudent = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      age: parseInt(document.getElementById("age").value),
      course: parseInt(document.getElementById("course").value),
      faculty: document.getElementById("faculty").value,
      subjects: document.getElementById("subjects").value.split(","),
    };

    students[index] = updatedStudent;
    updateStudentsTable();
    localStorage.setItem("students", JSON.stringify(students));
    editModal.style.display = "none";
  };
}

function filterStudents(query) {
  const filteredStudents = students.filter(
    (student) =>
      student.surname.toLowerCase().includes(query) ||
      student.course.toString().includes(query)
  );

  const studentsTable = document
    .getElementById("studentsTable")
    .querySelector("tbody");
  studentsTable.innerHTML = "";

  filteredStudents.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.surname}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.faculty}</td>
      <td>${student.subjects.join(", ")}</td>
      <td>
        <button class="edit-button" data-index="${index}">Редагувати</button>
        <button class="delete-button">Видалити</button>
      </td>
    `;

    studentsTable.appendChild(row);

    row.querySelector(".edit-button").onclick = () =>
      openEditModal(student, index);
    row.querySelector(".delete-button").onclick = () => {
      students.splice(index, 1);
      updateStudentsTable();
      localStorage.setItem("students", JSON.stringify(students));
    };
  });
}
