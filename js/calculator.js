export function createCalculator(screen) {

    const initialState = {
        display: "0",
        firstNumber: null,
        secondNumber: null,
        operator: null,
        lastOperator: null,
        shouldResetScreen: true,
    }

    const state = { ...initialState }

    function updateScreen() {

        screen.textContent = state.display
    }

    function handleReset() {

        Object.assign(state, initialState)
        updateScreen()
    }

    function handleDigit(value) {

        console.log(state.shouldResetScreen)

        if (state.shouldResetScreen === true) {

            state.shouldResetScreen = false
            state.display = value

        } else {

            state.display = state.display + value
        }

        updateScreen()
    }

    function handleOperator(value) {

        state.shouldResetScreen = true
        state.firstNumber = state.display
        state.operator = value
    }

    function handleEquals() {

        const {
            firstNumber,
            operator,
            display,
            secondNumber,
            lastOperator,
            shouldResetScreen
        } = state

        console.log("AVANT =", { ...state })

        if (state.shouldResetScreen === false) {

            state.secondNumber = state.display

            const result = calculate(
                Number(state.firstNumber),
                state.operator,
                Number(state.secondNumber)
            )

            state.firstNumber = String(result)
            state.display = String(result)
            state.lastOperator = "="
            state.shouldResetScreen = true

            updateScreen()

            console.log("APRÈS =", { ...state })

        } else if (state.shouldResetScreen === true && state.lastOperator === "=") {

            // Deuxième "=" pas encore codé.
        }
    }

    function handleKey(value, action) {

        console.log(value, action)

        if (action === "reset") {

            handleReset()
        }

        if (action === "digit") {

            handleDigit(value)
        }

        if (action === "operator") {

            handleOperator(value)
        }

        if (action === "equals") {

            handleEquals()
        }
    }

    return handleKey
}

export function listenKeys(handleKey) {

    const keys = document.querySelector(".calc__keys")

    keys.addEventListener("click", (event) => {

        const key = event.target.closest("button")

        if (key === null) return

        const { value, action } = key.dataset

        handleKey(value, action)
    })
}

export function createKeys(keys) {

    const calcKeys = document.querySelector(".calc__keys")
    const keyTemplate = document.querySelector("#key-template")
    const fragment = document.createDocumentFragment()

    calcKeys.replaceChildren()

    for (const { value, action, label } of keys) {

        const keyClone = keyTemplate.content.cloneNode(true)
        const cloneButton = keyClone.querySelector("button")

        if (value) {
            cloneButton.dataset.value = value
        }

        cloneButton.textContent = label || value
        cloneButton.dataset.action = action

        fragment.appendChild(keyClone)
    }

    calcKeys.appendChild(fragment)
}

function calculate(first, operator, second) {

    switch (operator) {

        case "+":
            return first + second

        case "-":
            return first - second

        case "/":
            return first / second

        case "*":
            return first * second
    }
}
