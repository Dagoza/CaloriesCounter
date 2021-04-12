const descriptionInput = document.getElementById('description');
const caloriesInput = document.getElementById('calories');
const carbsInput = document.getElementById('carbs');
const proteinInput = document.getElementById('protein');
const inputList = [descriptionInput, caloriesInput, carbsInput, proteinInput];
let list = [];

inputList.forEach(input => {
  input.addEventListener('keydown',() => input.classList.remove('is-invalid'));
});

const attrsToString = (obj = {}) => {
  return Object.keys(obj)
    .map(key => `${key}="${obj[key]}"`)
    .join('');
};

const tagAttrs = obj => (content = '') => `<${obj.tag} ${!!obj.attrs ? attrsToString(obj.attrs) : ''}>${content}</${obj.tag}>`;
const tag = t => typeof t === 'string' ? tagAttrs({ tag: t }) : tagAttrs(t);

const tableRowTag = tag('tr');
const tableRow = items => tableRowTag(tableCells(items));
const tableCell = tag('td');
const tableCells = items => items.map(tableCell).join('');
const trashIcon = tag({ tag: 'i', attrs: { class: 'fas fa-trash-alt' } })();

const validateInputs = () => {
  const invalidClass = 'is-invalid';
  inputList.forEach(input => !input.value && input.classList.add(invalidClass));
  inputList.every(input => input.value) && addValues();
};

const addValues = () => {
  const newItem = {
    description: descriptionInput.value,
    calories: +caloriesInput.value,
    carbs: +carbsInput.value,
    protein: +proteinInput.value
  };
  list = [...list, newItem];
  cleanInputs();
  updateTotals();
  renderItems();
}

const cleanInputs = () => {
  inputList.forEach(input => input.value = '');
}

const updateTotals = () => {
  let [calories, carbs, protein] = [0, 0, 0];
  list.forEach(item => {
    calories += item.calories;
    carbs += item.carbs;
    protein += item.protein;
  });

  document.getElementById('totalCalories').innerHTML = calories;
  document.getElementById('totalCarbs').innerHTML = carbs;
  document.getElementById('totalProteins').innerHTML = protein;
}

const renderItems = () => {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  list.forEach((element, index) => {
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon);
    tbody.innerHTML += tableRow([element.description, element.calories, element.carbs, element.protein, removeButton]);
  });
}

const removeItem = (index) => {
  list.splice(index, 1);
  updateTotals();
  renderItems();
}
