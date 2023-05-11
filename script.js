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