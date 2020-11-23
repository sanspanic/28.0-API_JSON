console.log('connected')

const yearInput = $('#year');
const nameInput = $('#name');
const colorInput = $('#color');
const emailInput = $('#email');

/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {

    evt.preventDefault(); 

    const year = yearInput.val()
    const name = nameInput.val()
    const color = colorInput.val()
    const email = emailInput.val()

    const res = await axios.post('http://127.0.0.1:5000/api/get-lucky-num', {
        name: name,
        email: email, 
        year: year, 
        color: color
      })

    handleResponse(res)
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {

    if (resp.status == 200) {

        const text = `Your lucky number is ${resp.data.num.num}. ${resp.data.num.fact}. Your birth year (${resp.data.year.year}) fact is: ${resp.data.year.fact}`
    
        newDiv = document.createElement('div')
        newDiv.innerText = text
    
        $("#lucky-results").append(newDiv)

    } else if (resp.status == 400) {

        console.log(resp)

    }
}


$("#lucky-form").on("submit", processForm);

