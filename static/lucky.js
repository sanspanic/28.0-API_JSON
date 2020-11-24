console.log("connected");
 
const yearInput = $("#year");
const nameInput = $("#name");
const colorInput = $("#color");
const emailInput = $("#email");
 
/** processForm: get data from form and make AJAX call to our API. */
 
async function processForm(evt) {
  evt.preventDefault();
 
  const year = yearInput.val();
  const name = nameInput.val();
  const color = colorInput.val();
  const email = emailInput.val();
 
  try {
    const res = await axios.post("http://127.0.0.1:5000/api/get-lucky-num", {
      name: name,
      email: email,
      year: year,
      color: color,
    });
    handleSuccess(res);
  } catch (error) {
    handleError(error.response.data);
    
  }
}
 
/** handleResponse: deal with response from our lucky-num API. */
 
function handleSuccess(resp) {

  $("#lucky-results").empty()
  $(".err").empty()

  const luckyNumText = `Your lucky number is ${resp.data.num.num}. \n ${resp.data.num.fact}.`
  const birthYearText = `Your birth year is ${resp.data.year.year}. \n ${resp.data.year.fact}`;

  newRow = document.createElement("div");
  newCol1 =  document.createElement("div");
  newCol2 =  document.createElement("div");
  luckyNumHeading = document.createElement("h4")
  yearHeading = document.createElement("h4")
  numFactTextDiv = document.createElement('div')
  yearFactTextDiv = document.createElement('div')


  $("#lucky-results").append(newRow);
  newRow.append(newCol1)
  newRow.append(newCol2)
  newCol1.append(luckyNumHeading)
  newCol2.append(yearHeading)
  newCol1.append(numFactTextDiv)
  newCol2.append(yearFactTextDiv)

  luckyNumHeading.innerText = "Lucky Number"
  yearHeading.innerText = "Birth Year"
  numFactTextDiv.innerText = luckyNumText
  yearFactTextDiv.innerText = birthYearText

  newRow.classList.add('row')
  yearHeading.classList.add('mb-3')
  luckyNumHeading.classList.add('mb-3')
  newCol1.classList.add('col','col-6', 'text-center', 'result')
  newCol2.classList.add('col', 'col-6', 'text-center', 'result')

}
 
function handleError(err) {

    for(const [key, value] of Object.entries(err.errors)) {

        const section = $(`#${key}-err`)
        section.text(err.errors[key][0])

    }
}
 
$("#lucky-form").on("submit", processForm);