const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');
const colorsCircle = ['#da04b0', '#d47911', '#a82aca', '#f8b8f5', '#5e2a95'];

// Изменяемая переменная времени, выбранная при клике
let time = 0;

// Счёт
let score = 0;

// Когда клик по кнопке "Начать игру"
startBtn.addEventListener('click', event => {
  // Удаляем дефолтное поведение ссылки
  event.preventDefault();
  // Добавляем секции первой класс "up"
  screens[0].classList.add('up');
})


// Когда клик по выбору времени
timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    // Записываем значение времени
    time = Number(event.target.dataset.time);
    // При клике запускаем игру
    startGame();
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score += 1;
    event.target.remove();
    createRandomCircle();
  }
})

// Функция запуску Игры
function startGame() {
  // Когда вызывается функция, добавляется класс 'up'
  screens[1].classList.add('up');
  // За этим в дом елемент "времени" записывается значение времени клика
  timeEl.innerText = `00:${time}`;
  // Вызываем функцию циклом, интервалом в 1 секунду
  setInterval(decreaseTime, 1000);
  // Создаём рандомные кружки
  createRandomCircle();
}

// Функция изменения времени и вывод изменения на экран
function decreaseTime() {
  // Если time = 0, то завершаем игру
  if (time === 0) {
    finishGame();
  } else {
    // Если time != 0, то записываем в current цикличное уменьшение указанного изначального времени клика
    let current = --time;
    
    if (current < 10) {
      // Если цикличное время меньше 10, то прибавляем 0
      current = `0${current}`;
    }

    // Выводим на экран изменения цикличного уменьшения времени
    timeEl.innerText = `00:${current}`;
  }

}

// Функция завершения игры
function finishGame() {
  board.innerHTML = `
    <div class="start-game__wrapper">
      <h1 class="start-game__score score">Счёт: <span class="score__accent">${score}</span></h1>
      <span class="start-game__text">Что бы начать заново, перезагрузите страницу</span>
    </div>
  `;

  // Скрываем показ таймера
  timeEl.parentElement.classList.add('hide');
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const indexColor = Math.round(Math.random() * colorsCircle.length);
  const color = colorsCircle[indexColor];
  circle.classList.add('circle');
  board.append(circle);

  // size - случайные размеры circle
  let size = getRandomNumber(15, 60);

  // Забираем высоту и ширину доски, где появляються circle
  const { width, height } = board.getBoundingClientRect();

  // Записываем в константы случайные координаты circle
  const x = getRandomNumber(20, height - size - 20);
  const y = getRandomNumber(20, width - size - 20);
  
  // Ширина и высота circle
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  // Случайное позиционирование circle
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  // Случайный цвет circle
  circle.style.background = color;
}

// Случайное получение числа в задающем диапазоне
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}