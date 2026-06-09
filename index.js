const colorGeneratorForm = document.getElementById('color-generator-form')

colorGeneratorForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(colorGeneratorForm)
    
    const color = formData.get('color')
    const scheme = formData.get('scheme')

    const hex = color.slice(1)

    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${scheme}&count=5`)
        .then(response => response.json())
        .then(data => console.log(data))
})

function generateColorScheme(data) {

}