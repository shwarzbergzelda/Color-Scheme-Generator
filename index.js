const colorGeneratorForm = document.getElementById('color-generator-form')
const colorScheme = document.getElementById('color-scheme')

colorGeneratorForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(colorGeneratorForm)
    
    const color = formData.get('color')
    const scheme = formData.get('scheme')

    const hex = color.slice(1)

    fetchHex(hex, scheme)
})

function generateColorScheme(colors) {
    const colorSchemeHtml = colors.map(color => {
        const { hex } = color
        return `
            <div class="color-column">
                <div class="color-block"></div>
                <p class="hex-value">${hex.value}</p>
            </div>
        `
    }).join('')

    colorScheme.innerHTML = colorSchemeHtml

    document.querySelectorAll('.color-block').forEach((block, index) => {
        block.style.backgroundColor = colors[index].hex.value
    })
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('hex-value')) {
        navigator.clipboard.writeText(e.target.textContent)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => console.log('Error copying text: ', err))
    }
})

function fetchHex(hex, scheme) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${scheme}&count=5`)
        .then(response => response.json())
        .then(data => {
            generateColorScheme(data.colors)
        })
}

fetchHex('825372', 'monochrome')