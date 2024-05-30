// Navigation
const flowSection = document.querySelector(".flow-section");
const sizeSection = document.querySelector(".size-section");
const positionSection = document.querySelector(".position-section");
const flexSection = document.querySelector(".flex-section");
const navs = document.querySelectorAll(".nav");
navs.forEach(nav => {
  nav.addEventListener('click', (e) => {
    const classes = e.target.classList;
    if (classes.contains('flow-button')) {
      flowSection.scrollIntoView({ block: "start", behavior: "smooth" })
    } else if (classes.contains('sizing-button')) {
      sizeSection.scrollIntoView({ block: "start", behavior: "smooth" })
    } else if (classes.contains('position-button')) {
      positionSection.scrollIntoView({ block: "start", behavior: "smooth" })
    } else if (classes.contains('flex-button')) {
      flexSection.scrollIntoView({ block: "start", behavior: "smooth" })
    }
  })
});



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
      width = document.querySelector('#width'),
      widthLabel = document.querySelector('#demo-width-label'),
      height = document.querySelector('#height'),
      heightLabel = document.querySelector('#demo-height-label'),
      baseBox = document.querySelector('.base-box')
      sizingSize = document.querySelector('.sizing-size'),
      occupiedSize = document.querySelector('.occupied-size');

const changeSize = (name, event, input, label, span, box) => {
    const value = event.target.value;
    if (value < 0) {
      event.preventDefault();
      input.value = 0;
      return false;
    };
    if (name === 'width' || name === 'height') {
      box.style[name] = `${value}px`;
    } else {
      span.textContent = `${name}: ${value}px`
      box.style.padding = `${value}px`;
    }
    label.textContent = `${name}: ${value}px`
    const widthSize = padding.value * 2 + border.value * 2 + baseBox.offsetWidth;
    const heightSize = padding.value * 2 + border.value * 2 + baseBox.offsetHeight;
    const widthOccupied = margin.value * 2 + widthSize;
    const heightOccupied = margin.value * 2 + heightSize;
    sizingSize.textContent = `${widthSize}px x ${heightSize}px`;
    occupiedSize.textContent = `${widthOccupied}px x ${heightOccupied}px`;
}

padding.addEventListener('input', (event) => changeSize('padding', event, padding, paddingLabel, paddingBoxSpan, paddingBox));
border.addEventListener('input', (event) => changeSize('border', event, border, borderLabel, borderBoxSpan, borderBox));
margin.addEventListener('input', (event) => changeSize('margin', event, margin, marginLabel, marginBoxSpan, marginBox));
width.addEventListener('input', (event) => changeSize('width', event, width, widthLabel, null, baseBox));
height.addEventListener('input', (event) => changeSize('height', event, height, heightLabel, null, baseBox));



// HTML Position
const position = document.querySelector('#position'),
      zIndex = document.querySelector('#z-index'),
      leftPos = document.querySelector('#left'),
      topPos = document.querySelector('#top'),
      demoPositionLabel = document.querySelector('#demo-position-label'),
      demoZIndexLabel = document.querySelector('#demo-z-index-label'),
      demoLeftLabel = document.querySelector('#demo-left-label'),
      demoTopLabel = document.querySelector('#demo-top-label'),
      demoPosition = document.querySelector('#demo-position'),
      positionTarget = document.querySelector('.position-target');

position.addEventListener('change', (e) => {
  demoPosition.style.height = 'auto';
  demoPosition.style.overflow = 'unset';
  positionTarget.style.position = e.target.value;
  demoPositionLabel.textContent = 'position: ' + e.target.value
  switch (e.target.value) {
    case 'relative': demoPositionLabel.dataset.tooltip = "Относительное позиционирование, элемент не выпадает из потока, за ним сохраняется его место и он позиционируется относительно своего места в потоке (z-index, left и top работают)"; break;
    case 'absolute': demoPositionLabel.dataset.tooltip = "Абсолютное позиционирование, элемент выпадает из потока полностью, другие элементы занимают его место и он позиционируется относительно relative родителя или window (z-index, left и top работают)"; break;
    case 'fixed': demoPositionLabel.dataset.tooltip = "Фиксированное позиционирование, элемент выпадает из потока полностью, другие элементы занимают его место и он позиционируется относительно window, не прокручивается (z-index, left и top работают)"; break;
    case 'sticky': demoPositionLabel.dataset.tooltip = "Прилипающее позиционирование, элемент не выпадает из потока, за ним сохраняется его место и он позиционируется относительно родителя, не прокручивается пока идет скролл родителя (z-index и top работают) - пример: прилипающие заголовки";
      demoPosition.style.height = '200px';
      demoPosition.style.overflow = 'auto';
      break;
    default: demoPositionLabel.dataset.tooltip = "Статичное позиционирование, обычное положение элемента в потоке (z-index, left и top не работают)"; break;
  }
});
zIndex.addEventListener('input', (e) => {
  positionTarget.style.zIndex = e.target.value;
  demoZIndexLabel.textContent = 'z-index: ' + e.target.value
});
leftPos.addEventListener('input', (e) => {
  positionTarget.style.left = e.target.value + 'px';
  demoLeftLabel.textContent = 'left: ' + e.target.value
});
topPos.addEventListener('input', (e) => {
  positionTarget.style.top = e.target.value + 'px';
  demoTopLabel.textContent = 'top: ' + e.target.value
});


// HTML Flex
const demoFlex = document.querySelector('#demo-flex'),
      parentModel = document.querySelector('#parentModel'),
      demoParentModelLabel = document.querySelector('#demo-parentModel-label'),
      flexDirection = document.querySelector('#flex-direction'),
      flexDirectionLabel = document.querySelector('#demo-direction-label')
      flexWrap = document.querySelector('#flex-wrap'),
      flexWrapLabel = document.querySelector('#demo-wrap-label'),
      justifyContent = document.querySelector('#justify-content'),
      demoJustifyLabel = document.querySelector('#demo-justify-label'),
      alignItems = document.querySelector('#align-items'),
      demoAlignLabel = document.querySelector('#demo-align-label')
      alignСontent = document.querySelector('#align-content'),
      demoAlignContentLabel = document.querySelector('#demo-align-content-label');      

parentModel.addEventListener('change', (e) => {
  demoFlex.style.display = e.target.value;
  demoParentModelLabel.textContent = 'display: ' + e.target.value;
  switch (e.target.value) {
    case 'flex': demoParentModelLabel.dataset.tooltip = 'Flex контейнер, дочерние элементы - блоки'; break;
    default: demoParentModelLabel.dataset.tooltip = 'Обычный контейнер, дочерние элементы - блоки'; break;
  }
})
flexDirection.addEventListener('change', (e) => {
  demoFlex.style.flexDirection = e.target.value;
  flexDirectionLabel.textContent = 'flex-direction: ' + e.target.value;
  switch (e.target.value) {
    case 'row-reverse': flexDirectionLabel.dataset.tooltip = 'Ось - X, направление справа - налево'; break;
    case 'column': flexDirectionLabel.dataset.tooltip = 'Ось - Y, направление сверху - вниз'; break;
    case 'column-reverse': flexDirectionLabel.dataset.tooltip = 'Ось - Y, направление снизу - вверх'; break;
    default: flexDirectionLabel.dataset.tooltip = 'Ось - X, направление слева - направо'; break;
  }
})

flexWrap.addEventListener('change', (e) => {
  demoFlex.style.flexWrap = e.target.value;
  flexWrapLabel.textContent = 'flex-wrap: ' + e.target.value;
  switch (e.target.value) {
    case 'wrap': flexWrapLabel.dataset.tooltip = 'Элементы переносятся, насколько требует того их ширина и размер контейнера, порядок сверху - вниз'; break;
    case 'wrap-reverse': flexWrapLabel.dataset.tooltip = 'Элементы переносятся, насколько требует того их ширина и размер контейнера, порядок снизу - вверх'; break;
    default: flexWrapLabel.dataset.tooltip = 'Элементы не переносятся (все в одну строку)'; break;
  }
})

justifyContent.addEventListener('change', (e) => {
  demoFlex.style.justifyContent = e.target.value;
  demoJustifyLabel.textContent = 'justify-content: ' + e.target.value;
  switch (e.target.value) {
    case 'flex-end': demoJustifyLabel.dataset.tooltip = 'Выравнивание флекс-элементов с конца'; break;
    case 'start': demoJustifyLabel.dataset.tooltip = 'Выравнивание элементов в начале'; break;
    case 'end': demoJustifyLabel.dataset.tooltip = 'Выравнивание элементов в конце'; break;
    case 'left': demoJustifyLabel.dataset.tooltip = 'Выравнивание элементов по левому краю'; break;
    case 'right': demoJustifyLabel.dataset.tooltip = 'Выравнивание элементов по правому краю'; break;
    case 'center': demoJustifyLabel.dataset.tooltip = 'Выравнивание элементов по центру'; break;
    case 'safe center': demoJustifyLabel.dataset.tooltip = 'Выравнивание элементов по центру, если элемент не помещается в контейнер то он выравнивается по левому краю в обычном порядке'; break;
    case 'unsafe center': demoJustifyLabel.dataset.tooltip = 'Выравнивание элементов по центру, если элемент не помещается в контейнер то он все равно выравнивается по центру'; break;
    case 'baseline': demoJustifyLabel.dataset.tooltip = 'Выравнивание относительно осевой линии'; break;
    case 'first baseline': demoJustifyLabel.dataset.tooltip = 'Выравнивание относительно осевой линии, с flex-start ориентацией'; break;
    case 'last baseline': demoJustifyLabel.dataset.tooltip = 'Выравнивание относительно осевой линии, с flex-end ориентацией'; break;
    case 'space-between': demoJustifyLabel.dataset.tooltip = 'Равномерно распределяет все элементы по ширине flex-блока. Первый элемент вначале, последний в конце'; break;
    case 'space-around': demoJustifyLabel.dataset.tooltip = 'Равномерно распределяет все элементы по ширине flex-блока. Все элементы имеют полноразмерное пространство с обоих концов'; break;
    case 'space-evenly': demoJustifyLabel.dataset.tooltip = 'Равномерно распределяет все элементы по ширине flex-блока. Все элементы имеют равное пространство вокруг'; break;
    case 'stretch': demoJustifyLabel.dataset.tooltip = 'Равномерно распределяет все элементы по ширине flex-блока. Все элементы имеют "авто-размер", чтобы соответствовать контейнеру'; break;
    default: demoJustifyLabel.dataset.tooltip = 'Выравнивание флекс-элементов с начала'; break;
  }
})

alignItems.addEventListener('change', (e) => {
  demoFlex.style.justifyContent = e.target.value;
  demoAlignLabel.textContent = 'align-items: ' + e.target.value;
  switch (e.target.value) {
    case 'flex-end': demoAlignLabel.dataset.tooltip = 'Выравнивание элементов с конца в поперечной оси'; break;
    case 'center': demoAlignLabel.dataset.tooltip = 'Центрирование элементов в поперечной оси'; break;
    case 'baseline': demoAlignLabel.dataset.tooltip = 'Выровняйте базовые линии предметов'; break;
    case 'stretch': demoAlignLabel.dataset.tooltip = 'Растянуть предметы в поперечной оси, чтобы соответствовать контейнеру'; break;
    default: demoAlignLabel.dataset.tooltip = 'Выравнивание элементов с начала в поперечной оси'; break;
  }
})

alignСontent.addEventListener('change', (e) => {
  demoFlex.style.justifyContent = e.target.value;
  demoAlignContentLabel.textContent = 'align-content: ' + e.target.value;
  switch (e.target.value) {
    case 'flex-end': demoAlignContentLabel.dataset.tooltip = 'Расположить элементы flex в конце'; break;
    case 'flex-right': demoAlignContentLabel.dataset.tooltip = 'Расположить элементы flex в начале'; break;
    case 'start': demoAlignContentLabel.dataset.tooltip = 'Расположить элементы в начале'; break;
    case 'end': demoAlignContentLabel.dataset.tooltip = 'Расположить элементы в конце'; break;
    case 'center': demoAlignContentLabel.dataset.tooltip = 'Расположить элементы вокруг центра'; break;
    case 'safe center': demoAlignContentLabel.dataset.tooltip = 'Выравнивание переполнения (overflow), выравнивание слева с обрезкой элемента'; break;
    case 'unsafe center': demoAlignContentLabel.dataset.tooltip = 'Выравнивание переполнения (overflow) выравнивание по центру с обрезкой элемента'; break;
    case 'baseline': demoAlignContentLabel.dataset.tooltip = 'Выравнивание по базовой линии'; break;
    case 'first baseline': demoAlignContentLabel.dataset.tooltip = 'Выравнивание по базовой линии сверху'; break;
    case 'last baseline': demoAlignContentLabel.dataset.tooltip = 'Выравнивание по базовой линии снизу'; break;
    case 'space-between': demoAlignContentLabel.dataset.tooltip = 'Распределить элементы равномерно. Первый элемент находится на одном уровне с началом, последней - совпадает с концом'; break;
    case 'space-around': demoAlignContentLabel.dataset.tooltip = 'Распределить элементы равномерно. Элементы имеют половинное пространство на каждом конце'; break;
    case 'space-evenly': demoAlignContentLabel.dataset.tooltip = 'Распределить элементы равномерно. Элементы имеют одинаковое пространство вокруг них'; break;
    case 'stretch': demoAlignContentLabel.dataset.tooltip = 'Распределить элементы равномерно. Растянуть auto-размерные элементы, чтобы заполнить контейнер'; break;
    default: demoAlignContentLabel.dataset.tooltip = 'Выравнивание элементов с начала в поперечной оси'; break;
  }
})

