import { calculatorKeys } from "./calculatorKeys.js"

import {
    createCalculator,
    createKeys,
    listenKeys
} from "./calculator.js"


function initCalculator() {

    const screen = document.querySelector(".calc__output")

    createKeys(calculatorKeys)

    const handleKey = createCalculator(screen)

    listenKeys(handleKey)
}


initCalculator()
