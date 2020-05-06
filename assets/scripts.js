var color1 =  document.querySelector("#color1")
var color2 = document.querySelector("#color2")
var style = document.querySelector("h3")

const colorChange = () => {
    document.body.style = `background: linear-gradient(90deg, ${color1.value}, ${color2.value})`
    style.textContent = document.body.style.background + ";"
}

color1.addEventListener("input", colorChange)
color2.addEventListener("input", colorChange)