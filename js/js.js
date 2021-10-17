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

bill.addEventListener("change", () => {
    billTotal = bill.value  
})

persons.addEventListener("input", () => {
    if(persons.value > 0) {
        personsT = persons.value
        let totalPersonFixed
        totalPersonFixed = billTotal / personsT
        totalPerson.value = `\$${totalPersonFixed.toFixed(2)}`
        persons.required = false
        zero.hidden = true
        path.setAttribute("fill", "#9EBBBD")
    }
})


for (let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        if(persons.value < 1) {
            persons.required = true
            zero.hidden = false
            path.setAttribute("fill", "red")
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
            if(billTotal.length > 0 && personsT.length > 0) {
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
    }else if(custom.value == 0) {
        reset.disabled = true
        persons.required = false
        zero.hidden = true
        path.setAttribute("fill", "#9EBBBD")

    }else {
        persons.required = true
        zero.hidden = false
        custom.value = ""
        path.setAttribute("fill", "red")
    }
    for(let button of buttons) {
        button.classList.remove("active-tip")
    }
})

reset.addEventListener("click", () => {
    bill.value = ""
    persons.value = ""
    custom.value = ""
    for(let button of buttons) {
        button.classList.remove("active-tip")
    }
    const resetDisabled = () => {
        reset.disabled = true
    }
    setTimeout(resetDisabled, 10)
})