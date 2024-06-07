// helpers
const numberHandler = (e, target, labelTarget, isDefault, rule, ruleCamelCase, defaultText, text, isPx) => {
  target.style[ruleCamelCase] = e.target.value + (isPx ? 'px' : '');
  console.log(target)
  labelTarget.textContent = rule + ': ' + e.target.value;
  if (isDefault) labelTarget.dataset.tooltip = defaultText;
  else labelTarget.dataset.tooltip = text + e.target.value; 
}
const selectHandler = (e, target, labelTarget, rule, ruleCamelCase, caseObject) => {
  target.style[ruleCamelCase] = e.target.value;
  labelTarget.textContent = rule + ': ' + e.target.value;
  labelTarget.dataset.tooltip = caseObject[e.target.value];
}

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
const modelCases = {
  'none': "Элементы выпали из потока, их как-будто нет",
  'block': "Элементы стали блоками, заняли максимальную ширину в строке, отодвинули другие элементы ниже",
  'inline-block': "Элементы стали инлайн-блоками, они выстроились друг за другом как слова в предложении, но не потеряли своих размеров",
  'inline': "Элементы стали инлайн-блоками, они выстроились друг за другом как слова в предложении, и потеряли свои размеры",
};
model.addEventListener('change', (e) => {
  demoModel.className = "demo " + e.target.value;
  selectHandler(e, floating, demoModelLabel, "display", "display", modelCases);
});
const floatCases = {
  'none': 'Никакого обтекания, обычный поток',
  'left': 'Третий элемент прижался к левому краю, его обтекает справа',
  'right': 'Третий элемент прижался к правому краю, его обтекает слева',
};
float.addEventListener('change', (e) => selectHandler(e, floating, demoFloatLabel, "float", "float", floatCases));

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
      // flex container
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
      demoAlignContentLabel = document.querySelector('#demo-align-content-label'),
      // flex items
      flexibleTarget5 = document.querySelector('#flexible-target5'),
      flexibleTarget6 = document.querySelector('#flexible-target6'),
      order5 = document.querySelector('#order5'),
      order6 = document.querySelector('#order6'),
      demoOrderLabel5 = document.querySelector('#demo-order-label5'),
      demoOrderLabel6 = document.querySelector('#demo-order-label6'),
      grow5 = document.querySelector('#grow5'),
      grow6 = document.querySelector('#grow6'),
      demoGrowLabel5 = document.querySelector('#demo-grow-label5'),
      demoGrowLabel6 = document.querySelector('#demo-grow-label6'),
      shrink5 = document.querySelector('#shrink5'),
      shrink6 = document.querySelector('#shrink6'),
      demoShrinkLabel5 = document.querySelector('#demo-shrink-label5'),
      demoShrinkLabel6 = document.querySelector('#demo-shrink-label6'),
      basis5 = document.querySelector('#basis5'),
      basis6 = document.querySelector('#basis6'),
      demoBasisLabel5 = document.querySelector('#demo-basis-label5'),
      demoBasisLabel6 = document.querySelector('#demo-basis-label6'),
      alignSelf5 = document.querySelector('#self5'),
      alignSelf6 = document.querySelector('#self6'),
      demoAlignSelfLabel5 = document.querySelector('#demo-self-label5'),
      demoAlignSelfLabel6 = document.querySelector('#demo-self-label6');
// flex container
const parentModelCases = {
  'flex': 'Flex контейнер, дочерние элементы - flexible (flex) items',
  'block': 'Обычный контейнер, дочерние элементы - блоки',
};
parentModel.addEventListener('change', (e) => selectHandler(e, demoFlex, demoParentModelLabel, "display", "display", parentModelCases));
const flexDirectionCases = {
  'row': 'Ось - X, направление слева - направо',
  'row-reverse': 'Ось - X, направление справа - налево',
  'column': 'Ось - Y, направление сверху - вниз',
  'column-reverse': 'Ось - Y, направление снизу - вверх',
};
flexDirection.addEventListener('change', (e) => selectHandler(e, demoFlex, flexDirectionLabel, "flex-direction", "flexDirection", flexDirectionCases));
const flexWrapCases = {
  'wrap': 'Элементы переносятся, насколько требует того их ширина и размер контейнера, порядок сверху - вниз',
  'wrap-reverse': 'Элементы переносятся, насколько требует того их ширина и размер контейнера, порядок снизу - вверх',
  'nowrap': 'Элементы не переносятся (все в одну строку)',
};
flexWrap.addEventListener('change', (e) => selectHandler(e, demoFlex, flexWrapLabel, "flex-wrap", "flexWrap", flexWrapCases));
const justifyContentCases = {
  'flex-start': 'Выравнивание флекс-элементов с начала',
  'flex-end': 'Выравнивание флекс-элементов с конца',
  'start': 'Выравнивание элементов в начале',
  'end': 'Выравнивание элементов в конце',
  'left': 'Выравнивание элементов по левому краю',
  'right': 'Выравнивание элементов по правому краю',
  'center': 'Выравнивание элементов по центру',
  'safe center': 'Выравнивание элементов по центру, если элемент не помещается в контейнер то он выравнивается по левому краю в обычном порядке',
  'unsafe center': 'Выравнивание элементов по центру, если элемент не помещается в контейнер то он все равно выравнивается по центру',
  'baseline': 'Выравнивание относительно осевой линии',
  'first baseline': 'Выравнивание относительно осевой линии, с flex-start ориентацией',
  'last baseline': 'Выравнивание относительно осевой линии, с flex-end ориентацией',
  'space-between': 'Равномерно распределяет все элементы по ширине flex-блока. Первый элемент вначале, последний в конце',
  'space-around': 'Равномерно распределяет все элементы по ширине flex-блока. Все элементы имеют полноразмерное пространство с обоих концов',
  'space-evenly': 'Равномерно распределяет все элементы по ширине flex-блока. Все элементы имеют равное пространство вокруг',
  'stretch': 'Равномерно распределяет все элементы по ширине flex-блока. Все элементы имеют "авто-размер", чтобы соответствовать контейнеру',
};
justifyContent.addEventListener('change', (e) => selectHandler(e, demoFlex, demoJustifyLabel, "justify-content", "justifyContent", justifyContentCases));
const alignItemsCases = {
  'flex-start': 'Выравнивание элементов с начала в поперечной ос',
  'flex-end': 'Выравнивание элементов с конца в поперечной оси',
  'center': 'Центрирование элементов в поперечной оси',
  'baseline': 'Выравнивание базовых линий элементов',
  'stretch': 'Растянуть элементы в поперечной оси, чтобы они соответствовали контейнеру',
};
alignItems.addEventListener('change', (e) => selectHandler(e, demoFlex, demoAlignLabel, "align-items", "alignItems", alignItemsCases));
const alignСontentCases = {
  'flex-end': 'Расположить элементы flex в конце',
  'flex-right': 'Расположить элементы flex в начале',
  'start': 'Расположить элементы в начале',
  'end': 'Расположить элементы в конце',
  'center': 'Расположить элементы вокруг центра',
  'safe center': 'Выравнивание переполнения (overflow), выравнивание слева с обрезкой элемента',
  'unsafe center': 'Выравнивание переполнения (overflow) выравнивание по центру с обрезкой элемента',
  'baseline': 'Выравнивание по базовой линии',
  'first baseline': 'Выравнивание по базовой линии сверху',
  'last baseline': 'Выравнивание по базовой линии снизу',
  'space-between': 'Распределить элементы равномерно. Первый элемент находится на одном уровне с началом, последней - совпадает с концом',
  'space-around': 'Распределить элементы равномерно. Элементы имеют половинное пространство на каждом конце',
  'space-evenly': 'Распределить элементы равномерно. Элементы имеют одинаковое пространство вокруг них',
  'stretch': 'Распределить элементы равномерно. Растянуть auto-размерные элементы, чтобы заполнить контейнер',
  'normal': 'Выравнивание элементов с начала в поперечной оси'
};
alignСontent.addEventListener('change', (e) => selectHandler(e, demoFlex, demoAlignContentLabel, "align-content", "alignContent", alignСontentCases));
// flex items
// order
const orderArgs = ['order', 'order', "Нормальный порядок, элемент не поменял свое место", "Порядок изменен, элемент занимает место №"];
order5.addEventListener('input', (e) => numberHandler(e, flexibleTarget5, demoOrderLabel5, e.target.value == 0, ...orderArgs));
order6.addEventListener('input', (e) => numberHandler(e, flexibleTarget6, demoOrderLabel6, e.target.value == 0, ...orderArgs));
// flex-grow
const growArgs = ['flex-grow', 'flexGrow', "Дефолтное увеличение элемента", "Относительное увеличение элемента - "];
grow5.addEventListener('input', (e) => numberHandler(e, flexibleTarget5, demoGrowLabel5, e.target.value == 0, ...growArgs));
grow6.addEventListener('input', (e) => numberHandler(e, flexibleTarget6, demoGrowLabel6, e.target.value == 0, ...growArgs));
// flex-shrink
const shrinkArgs = ['flex-shrink', 'flexShrink', "Дефолтное уменьшение элемента", "Относительное уменьшение элемента - "];
shrink5.addEventListener('input', (e) => numberHandler(e, flexibleTarget5, demoShrinkLabel5, e.target.value == 1, ...shrinkArgs));
shrink6.addEventListener('input', (e) => numberHandler(e, flexibleTarget6, demoShrinkLabel6, e.target.value == 1, ...shrinkArgs));
// flex-basis
const basisArgs = ['flex-basis', 'flexBasis', "Дефолтный размер элемента", "Размер элемента в px - ", true];
basis5.addEventListener('input', (e) => numberHandler(e, flexibleTarget5, demoBasisLabel5, e.target.value == 100, ...basisArgs));
basis6.addEventListener('input', (e) => numberHandler(e, flexibleTarget6, demoBasisLabel6, e.target.value == 100, ...basisArgs));
// align-self
const alignSelfCases = {
  'stretch': 'Элемент расположен так, чтобы соответствовать контейнеру',
  'center': 'Элемент расположен в центре контейнера',
  'flex-start': 'Элемент располагается в начале контейнера',
  'flex-end': 'Элемент располагается в конце контейнера',
  'baseline': 'Элемент располагается на базовой линии контейнера',
  'auto': 'Поведение по умолчанию (растягивается, если это свойство нельзя унаследовать от контейнера)'
};
alignSelf5.addEventListener('change', (e) => selectHandler(e, flexibleTarget5, demoAlignSelfLabel5, "align-self", "alignSelf", alignSelfCases));
alignSelf6.addEventListener('change', (e) => selectHandler(e, flexibleTarget6, demoAlignSelfLabel6, "align-self", "alignSelf", alignSelfCases));