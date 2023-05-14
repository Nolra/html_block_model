// HTML Flow

// tools
const model = document.querySelector("#model"),
      float = document.querySelector("#float");
// box
const demoModel = document.querySelector("#demo-model"),
      floating = document.querySelector("#floating"),
      demoModelLabel = document.querySelector("#demo-model-label"),
      demoFloatLabel = document.querySelector("#demo-float-label");
// select events
model.addEventListener("change", (event) => {
    const value = event.target.value;
    demoModel.className = "demo " + value;
    demoModelLabel.textContent = "display: " + value;
    if (value === "none") demoModelLabel.dataset.tooltip = "Элементы выпали из потока, их как-будто нет";
    else if (value === "block") demoModelLabel.dataset.tooltip = "Элементы стали блоками, заняли максимальную ширину в строке, отодвинули другие элементы ниже";
    else if (value === "inline-block") demoModelLabel.dataset.tooltip = "Элементы стали инлайн-блоками, они выстроились друг за другом как слова в предложении, но не потеряли своих размеров";
    else if (value === "inline") demoModelLabel.dataset.tooltip = "Элементы стали инлайн-блоками, они выстроились друг за другом как слова в предложении, и потеряли свои размеры";
});
float.addEventListener("change", (event) => {
    const value = event.target.value;
    floating.className = "floating " + value;
    demoFloatLabel.textContent = "float: " + value;
    if (value === "none") demoFloatLabel.dataset.tooltip = "Никакого обтекания, обычный поток";
    else if (value === "left") demoFloatLabel.dataset.tooltip = "Третий элемент прижался к левому краю, его обтекает справа";
    else if (value === "right") demoFloatLabel.dataset.tooltip = "Третий элемент прижался к правому краю, его обтекает слева";
});



// HTML Sizing
const padding = document.querySelector('#padding'),
      paddingLabel = document.querySelector('#demo-padding-label'),
      paddingBox = document.querySelector('.padding-box'),
      paddingBoxSpan = document.querySelector('.padding-box > span'),

      border = document.querySelector('#border'),
      borderLabel = document.querySelector('#demo-border-label'),
      borderBox = document.querySelector('.border-box'),
      borderBoxSpan = document.querySelector('.border-box > span'),

      margin = document.querySelector('#margin'),
      marginLabel = document.querySelector('#demo-margin-label'),
      marginBox = document.querySelector('.margin-box'),
      marginBoxSpan = document.querySelector('.margin-box > span'),
      
      sizingSize = document.querySelector('.sizing-size'),
      occupiedSize = document.querySelector('.occupied-size');

const changeSize = (name, event, input, label, span, box) => {
    const value = event.target.value;

    if (value < 0) {
        event.preventDefault();
        input.value = 0;
        return false
    };
    label.textContent = `${name}: ${value}px`
    span.textContent = `${name}: ${value}px`
    box.style.padding = `${value}px`;
    
    const size = padding.value * 2 + border.value * 2 + 200;
    const occupied = margin.value * 2 + size;
    sizingSize.textContent = `${size}px x ${size}px`;
    occupiedSize.textContent = `${occupied}px x ${occupied}px`;
}

padding.addEventListener(
    'input', 
    (event) => changeSize('padding', event, padding, paddingLabel, paddingBoxSpan, paddingBox)
);

border.addEventListener(
    'input', 
    (event) => changeSize('border', event, border, borderLabel, borderBoxSpan, borderBox)
);

margin.addEventListener(
    'input', 
    (event) => changeSize('margin', event, margin, marginLabel, marginBoxSpan, marginBox)
);

