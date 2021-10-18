const bill = document.getElementById("bill")
const persons = document.getElementById("number-persons")
const custom = document.getElementById("custom")
const tipPerson = document.getElementById("tip")
const totalPerson = document.getElementById("total")
const reset = document.getElementById("reset")
const zero = document.getElementById("zero")
const path = document.getElementById("path")
const buttons = [...document.querySelectorAll(".button")]

let billTotal
let personsT

reset.disabled = true
zero.hidden = true

const recorrerBotones = () => {
    for(let button of buttons) {
        button.classList.remove("active-tip")
    }
}

const notificacionDeError = () => {
    persons.required = true
    zero.hidden = false
    path.setAttribute("fill", "red")
}

bill.addEventListener("change", () => {
    billTotal = bill.value 
})

persons.addEventListener("input", () => {
    personsT = Number(persons.value)
    recorrerBotones()   
    if(personsT > 0 && Number.isInteger(personsT)) {
        let totalPersonFixed
        totalPersonFixed = billTotal / personsT
        totalPerson.value = `\$${totalPersonFixed.toFixed(2)}`
        persons.required = false
        zero.hidden = true
        path.setAttribute("fill", "#9EBBBD")
    }else {
        totalPerson.value = ""
        tipPerson.value = ""
        zero.textContent = "Invalid"
        notificacionDeError()
    }
})

for (let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        if(persons.value < 1 || !Number.isInteger(personsT)) {
            notificacionDeError()
        }else {
            let tip = buttons[i].value
            let tipPersonFixed
            let totalPersonFixed
            tipPersonFixed = tip * billTotal / 100 / personsT
            tipPerson.value = `\$${tipPersonFixed.toFixed(2)}`
            totalPersonFixed = billTotal / personsT + tipPersonFixed
            totalPerson.value = `\$${totalPersonFixed.toFixed(2)}`
            for (let button of buttons) {
                if(button.classList.contains("active-tip")) {
                    button.classList.remove("active-tip")
            }
            buttons[i].classList.add("active-tip")
        }
            if(billTotal.length > 0 && personsT > 0) {
                reset.disabled = false
                persons.required = false
                zero.hidden = true
                path.setAttribute("fill", "#9EBBBD")
            }
        }
        custom.value = ""
    })
}

custom.addEventListener("input", () => {
    if(custom.value > 0 && persons.value > 0) {
        let tipPersonFixed
        let totalPersonFixed
        tipPersonFixed = custom.value * billTotal / 100 / personsT
        tipPerson.value = `\$${tipPersonFixed.toFixed(2)}`
        totalPersonFixed = billTotal / personsT + tipPersonFixed
        totalPerson.value = `\$${totalPersonFixed.toFixed(2)}`
        reset.disabled = false
        persons.required = false
        zero.hidden = true
        path.setAttribute("fill", "#9EBBBD")
    }else if(custom.value == 0) {
        let totalPersonFixed
        totalPersonFixed = billTotal / personsT
        totalPerson.value = `\$${totalPersonFixed.toFixed(2)}`
        reset.disabled = true
        persons.required = false
        zero.hidden = true
        tipPerson.value = ""
    }else {
        custom.value = ""
        notificacionDeError()
    }
    recorrerBotones()
})

reset.addEventListener("click", () => {
    bill.value = ""
    persons.value = ""
    persons.required = false
    custom.value = ""
    zero.hidden = true
    path.setAttribute("fill", "#9EBBBD")
    recorrerBotones()
    const resetDisabled = () => {
        reset.disabled = true
    }
    setTimeout(resetDisabled, 10)
})