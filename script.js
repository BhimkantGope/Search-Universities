let url = "http://universities.hipolabs.com/search?name=";      //University API
let btn = document.querySelector("#country-btn");
let countryInp = document.querySelector("input");
let ul = document.querySelector("#list");
let clearList = document.querySelector("#country-clear");

clearList.addEventListener("click", (e) => {
    e.preventDefault();
    ul.innerHTML = ""; 
    countryInp.value = "";// Clears the list content
    console.log("list cleared!"); 
});

btn.addEventListener("click", async (e) => {
    if (countryInp.value !== "" && !e.shiftKey) {
        let collegeArr = await getColleges(countryInp.value);
        show(collegeArr);
    }
});

countryInp.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !e.shiftKey && countryInp.value !== "") {
        e.preventDefault();
        let collegeArr = await getColleges(countryInp.value);
        show(collegeArr);
    }
});

function show(college) {
    ul.innerText = "";
    for (coll of college) {
        let li = document.createElement("li");
        li.innerText = coll.name;
        ul.appendChild(li);
    }    
}

async function getColleges(country) {
    try {
        let res = await axios.get(url+country);
        return res.data;
    } catch (err) {
        alert(err);
    }
}