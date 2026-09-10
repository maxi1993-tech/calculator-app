const calculatorKeys = [
    { value: "7", action: "digit" },
    { value: "8", action: "digit" },
    { value: "9", action: "digit" },
    { label: "DEL", action: "delete" },
    { value: "4", action: "digit" },
    { value: "5", action: "digit" },
    { value: "6", action: "digit" },
    { value: "+", action: "operator" },
    { value: "1", action: "digit" },
    { value: "2", action: "digit" },
    { value: "3", action: "digit" },
    { value: "-", action: "operator" },
    { value: ".", action: "decimal" },
    { value: "0", action: "digit" },
    { value: "/", action: "operator" },
    { label: "x", value: "*", action: "operator" },
    { label: "RESET", action: "reset" },
    { value: "=", action: "equals" },
]

function createKeys(keys) {

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

createKeys(calculatorKeys)

function listenKeys() {

    const keys = document.querySelector(".calc__keys")

    keys.addEventListener("click", (event) => {

        const key = event.target.closest("button")

        if (key === null) return

        const { value, action } = key.dataset
        handleKey(value, action)
    })
}

listenKeys()

const initialState = {
    display: "0",
    firstNumber: null,
    operator: null,
    shouldResetScreen: true,
};

const state = { ...initialState }

function handleKey(value, action) {
    console.log(value, action)

    const screen = document.querySelector(".calc__output")

    if (action === "reset") {
        Object.assign(state, initialState)
        screen.textContent = state.display;
    }

    if (action === "digit") {

        if (state.shouldResetScreen === true) {
            state.shouldResetScreen = false
            state.display = value
        } else {
            state.display = state.display + value;
        }
        screen.textContent = state.display;
    }
}
