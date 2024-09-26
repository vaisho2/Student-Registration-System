// getting the elements with their specified ids
const sname = document.getElementById("studentname");
const sid = document.getElementById("studentid");
const sclass = document.getElementById("studentclass");
const sadd = document.getElementById("address");
const smail = document.getElementById("email");
const sphone = document.getElementById("phone");
const btn = document.getElementById("submit");
const editbtn = document.getElementById("submit-edit");
const mainInfoDiv = document.getElementById("info");

// using if condition to make scrollbar dynamic
if(mainInfoDiv.scrollHeight>300){
    mainInfoDiv.style.overflowY = 'scroll';
}

// getting the elements with their specified ids for showing errors
const nameError = document.getElementById('name-error');
const idError = document.getElementById('id-error');
const classError = document.getElementById('class-error');
const addressError = document.getElementById('add-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');

// regex patterns for validating inputs
const namePattern = /^[A-Za-z\s]+$/;          
const idPattern = /^[0-9]+$/;                 
const classPattern = /^[0-9]+$/;
const addPattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
const phonePattern = /^[0-9]{10}$/;           
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

// added class to editbutton
editbtn.classList.add("editbtn");

// added evenlistener with click event to button
btn.addEventListener("click", addInfo);

// loading student information using onload function
window.onload = function() {
    loadStudentsFromStorage();
};

// adding student information
function addInfo() {
    // condition to keep all fields filled
    if (sname.value === '' || sid.value === '' || sclass.value === '' || sadd.value === '' || smail.value === '' || sphone.value === '') {
        alert('Please fill all the fields');
        return;
    }

    let isValid = true;

    // validating name to accept only letters
    if (!namePattern.test(sname.value)) {
        nameError.innerHTML = "Student name must contain only letters";
        isValid = false;
    } else {
        nameError.innerHTML = "";
    }

    // validating student id to accept only numbers
    if (!idPattern.test(sid.value)) {
        idError.innerHTML = "Student ID must contain only numbers";
        isValid = false;
    } else {
        idError.innerHTML = "";
    }

    // validating student class to acept only numbers
    if (!classPattern.test(sclass.value)) {
        classError.innerHTML = "Student Class must contain only numbers";
        isValid = false;
    } else {
        classError.innerHTML = "";
    }

    // validating address to have atleast 3 characters
    if (!addPattern.test(sadd.value)) {
        addressError.innerHTML = "Student Address must contain minimum three characters";
        isValid = false;
    } else {
        addressError.innerHTML = "";
    }

    // validating email to have valid email format
    if (!emailPattern.test(smail.value)) {
        emailError.innerHTML = "Enter a valid email address";
        isValid = false;
    } else {
        emailError.innerHTML = "";
    }

    // validating contact number to have 10 numbers 
    if (!phonePattern.test(sphone.value)) {
        phoneError.innerHTML = "Contact number must contain 10 digits";
        isValid = false;
    } else {
        phoneError.innerHTML = "";
    }

    // preventing form submission if any above validation fails
    if (!isValid) {
        event.preventDefault();
        return;
    }

    // created object to store values
    const student = {
        name: sname.value,
        id: sid.value,
        class: sclass.value,
        address: sadd.value,
        email: smail.value,
        phone: sphone.value
    };

    // calling function to add student information to DOM tree
    addStudentToDOM(student);

    // calling function to save student information to local storage
    saveStudentToStorage(student);

    // clearing the form input fields
    sname.value = '';
    sid.value = '';
    sclass.value = '';
    sadd.value = '';
    smail.value = '';
    sphone.value = '';
}

// adding student information to DOM tree
function addStudentToDOM(student) {
    // creating elements to add information in them afterwards
    const infoDiv = document.createElement("div");
    const name = document.createElement("p");
    const id = document.createElement("p");
    const cls = document.createElement("p");
    const add = document.createElement("p");
    const mail = document.createElement("p");
    const phone = document.createElement("p");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    // adding class to created element infoDiv to style it after
    infoDiv.classList.add("infoDiv");

    // fetching object values in created elements
    name.innerHTML = student.name;
    id.innerHTML = student.id;
    cls.innerHTML = student.class;
    add.innerHTML = student.address;
    mail.innerHTML = student.email;
    phone.innerHTML = student.phone;
    delBtn.innerHTML = '<i class="fa-solid fa-trash"> </i>';
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    // adding the information elements to a single div element
    infoDiv.appendChild(name);
    infoDiv.appendChild(id);
    infoDiv.appendChild(cls);
    infoDiv.appendChild(add);
    infoDiv.appendChild(mail);
    infoDiv.appendChild(phone);
    infoDiv.appendChild(delBtn);
    infoDiv.appendChild(editBtn);

    // adding the above div element to main div already present in HTML code
    mainInfoDiv.appendChild(infoDiv);

    // added evenlistener to delete button in created div
    delBtn.addEventListener('click', function() {
        delInfo(infoDiv, student.id);
    });

    // added evenlistener to delete button in created div
    editBtn.addEventListener('click', function() {
        editInfo(infoDiv, student.id);
    });
}

// deleting student information
function delInfo(infoDiv, studentId) {
    // removing created infoDiv from main div
    infoDiv.remove();
    // calling function to remove student information from local storage
    removeStudentFromStorage(studentId);
}

// Editing student information
function editInfo(infoDiv, studentId) {
    // changed submit button opacity to 0
    btn.style.opacity = 0;
    // changed edit button to 1
    editbtn.style.opacity = 1;

    // accessing child nodes (<p> tags)
    const name = infoDiv.childNodes[0];
    const id = infoDiv.childNodes[1];
    const cls = infoDiv.childNodes[2];
    const add = infoDiv.childNodes[3];
    const mail = infoDiv.childNodes[4];
    const phone = infoDiv.childNodes[5];

    // pre-filling values to input fields to edit them
    sname.value = name.innerHTML;
    sid.value = id.innerHTML;
    sclass.value = cls.innerHTML;
    sadd.value = add.innerHTML;
    smail.value = mail.innerHTML;
    sphone.value = phone.innerHTML;

    // added event listener to edit button
    editbtn.addEventListener("click", function() {
        event.preventDefault();
        // condition to keep all fields filled
        if (sname.value === '' || sid.value === '' || sclass.value === '' || sadd.value === '' || smail.value === '' || sphone.value === '') {
            alert('Please fill all the fields');
            return;
        }

        // updating DOM values with new values
        name.innerHTML = sname.value;
        id.innerHTML = sid.value;
        cls.innerHTML = sclass.value;
        add.innerHTML = sadd.value;
        mail.innerHTML = smail.value;
        phone.innerHTML = sphone.value;

        // object to store updated values
        const updatedStudent = {
            name: sname.value,
            id: sid.value,
            class: sclass.value,
            address: sadd.value,
            email: smail.value,
            phone: sphone.value
        };

        // calling function to update student information in local storage
        updateStudentInStorage(studentId, updatedStudent);

        // clearing input fields
        sname.value = '';
        sid.value = '';
        sclass.value = '';
        sadd.value = '';
        smail.value = '';
        sphone.value = '';

        // exchanging opacity of submit and edit button as editing is done
        btn.style.opacity = 1;
        editbtn.style.opacity = 0;
    });
}

// saving student information to localstorage
function saveStudentToStorage(student) {
    // storing new object student to local storage as json string
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

// loading students from local storage
function loadStudentsFromStorage() {
    // retreives existing student array from local storage and displays in created div element
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(student => {
        addStudentToDOM(student);
    });
}

// deleting existing student information from local storage
function removeStudentFromStorage(studentId) {
    // retreiving students array from local storage and filters it out with id & updates storage
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.id !== studentId);
    localStorage.setItem("students", JSON.stringify(students));
}

// updating/editing student information in local storage
function updateStudentInStorage(studentId, updatedStudent) {
    // retreives students array from local storage and finds the student using index of student to be edited with help of student id and updates it in local storage
    let students = JSON.parse(localStorage.getItem("students")) || [];
    const studentIndex = students.findIndex(student => student.id === studentId);
    if (studentIndex !== -1) {
        students[studentIndex] = updatedStudent;
        localStorage.setItem("students", JSON.stringify(students));
    }
}
