/* script.js
 * javascript for NameStats
 * Pessie Mittelman
 * 3/31/25 */

let formattedAge;
let formattedGender;
let formattedNationality;

async function fetchData(input) {
  try {
    const [genderResponse, ageResponse, nationalityRepsonse] = await Promise.all([
      fetch('https://api.genderize.io/?name=' + input),
      fetch('https://api.agify.io/?name=' + input),
      fetch('https://api.nationalize.io/?name=' + input)
    ]);
    if (![genderResponse, ageResponse, nationalityRepsonse].every(response => response.ok)) {
      throw new Error(`HTTP error! Status: ${[genderResponse, ageResponse, nationalityRepsonse].find(response => !response.ok)?.status}`);
    }
    const gender = await genderResponse.json();
    const formattedGender = gender.gender;
    document.getElementById("genderResult").innerHTML = document.getElementById("genderResult").innerHTML.replace("--", formattedGender);
    const age = await ageResponse.json();
    const formattedAge = age.age;
    document.getElementById("ageResult").innerHTML = document.getElementById("ageResult").innerHTML.replace("--", formattedAge);
    const nationality = await nationalityRepsonse.json();
    const formattedNationality = nationality.country[0].country_id;
    document.getElementById("nationalityResult").innerHTML = document.getElementById("nationalityResult").innerHTML.replace("--", formattedNationality);
    console.log(gender);
    console.log(age);
    console.log(nationality);

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

document.getElementById("predictBtn").addEventListener("click", function () {
  const input = document.getElementById("nameInput").value;
  fetchData(input);
});

document.getElementById("resetBtn").addEventListener("click", function () {
  if (formattedGender) {
      document.getElementById("genderResult").innerHTML = document.getElementById("genderResult").innerHTML.replace(formattedGender, "--");
    }
  if (formattedNationality) {
      document.getElementById("nationalityResult").innerHTML = document.getElementById("nationalityResult").innerHTML.replace(formattedNationality, "--");
    }
  if (formattedAge) {
      document.getElementById("ageResult").innerHTML = document.getElementById("ageResult").innerHTML.replace(formattedAge, "--replaced!");
    }
  document.getElementById("nameInput").value = "";
});
