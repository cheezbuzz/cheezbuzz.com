const INPUT_HIT = () => {
  BUZZ.routines.input()
}

const INPUT_TOGGLE = () => {
  BUZZ.routines.toggle()
}

const INPUT_SUBMIT = () => {
  BUZZ.routines.submit()
}

BUZZ.CONTAINER = document.getElementById("main")
BUZZ.LOADED = true
BUZZ.routines.ui()

console.log("cheese gang.")
