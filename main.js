
const addBtn = document.querySelector('.todo__add-btn')
const item = document.querySelectorAll('.todo__task-item')
const wrapperTask = document.querySelector('.todo__wrapper-task')
const input = document.querySelector('.todo__input')
const countDone = document.querySelector('.todo__counter-done')
const countWait = document.querySelector('.todo__counter-wait')
const btnArhive = document.querySelector('.todo__archive')
const archiveSpan = document.querySelector('.todo__archive-span')
const btnTheme = document.querySelector('.header__settings')
const body = document.querySelector('body')

let countUp = 0
let countDown = 0
let dataCount = 0



addBtn.addEventListener('click', addNewTask)  // Добавление новой таски
wrapperTask.addEventListener('click', deleteTask) // Удаление таски
wrapperTask.addEventListener('click', markerTask) // Метка Выполенной таски
wrapperTask.addEventListener('click', openPopUpTask) // Попап для таски
// btnArhive.addEventListener('click', openPopUpArchive)
body.addEventListener('click', themeBody) // Замена цветовой темы для Боди




// Цветовая тема сайта
const btnDay = document.querySelector('.btn-day')
const btnNigth = document.querySelector('.btn-nigth')

function addClassDayTheme () {
  body.classList.add('day-theme')
  btnDay.classList.add('remove-icon-day')
  btnNigth.classList.add('add-icon-nigth')
  localStorage.setItem('theme', 'day')
}
function addClassNigthTheme () {
  body.classList.remove('day-theme')
  btnDay.classList.remove('remove-icon-day')
  btnNigth.classList.remove('add-icon-nigth')
  localStorage.setItem('theme', 'dark')
}

function themeBody (event) {
  if (event.target.classList.contains('btn-day')) {
    addClassDayTheme()
  } 
  if (event.target.classList.contains('btn-nigth')) {
    addClassNigthTheme()
  }
}

if (localStorage.getItem('theme') === 'day') {
  addClassDayTheme()
}

// Находим нужные переменные
    // const colorDayBlue = getComputedStyle(document.documentElement).getPropertyValue('--color-day-blue')
    // const colorDayBg = getComputedStyle(document.documentElement).getPropertyValue('--color-day-bg')
    // const colorDayText = getComputedStyle(document.documentElement).getPropertyValue('--color-day-text')
    // const colorDayBgTask = getComputedStyle(document.documentElement).getPropertyValue('--color-day-bg-task')
    // const colorDayBorder = getComputedStyle(document.documentElement).getPropertyValue('--color-day-border')
    

    // const colorOgange = document.documentElement.style.setProperty('--color-ogange',colorDayBlue )
    // const colorBg = document.documentElement.style.setProperty('--color-bg',colorDayBg )
    // const colorText = document.documentElement.style.setProperty('--color-text',colorDayText )
    // const colorBgTask = document.documentElement.style.setProperty('--color-bg-task',colorDayBgTask )
// const colorBorder = document.documentElement.style.setProperty('--color-border',colorDayBorder )


/*==============================================================*/
/*фокус инпута */
input.addEventListener('focus', () => {
  input.classList.add('input-active')
})
input.addEventListener('blur', () => {
  input.classList.remove('input-active')
})
/*==============================================================*/
//Метка Выполенной таски
function markerTask (event) {
  if(event.target.classList.contains('todo__item-circle')) {
    const parentNode = event.target.closest('.todo__task-item')
    const childText = parentNode.querySelector('.todo__task-title')
    const childCircle = parentNode.querySelector('.todo__item-circle')

    childText.classList.add('active-text')
    childCircle.classList.add('active-circle')
  }
}
/*==============================================================*/
// Добавление новой таски
function addNewTask() {
  dataCount++
  if (input.value === '') return
  const newTask = `
    <li class="todo__task-item" data-target="${dataCount}">
    <div class="todo__item-circle"></div>
    <h5 class="todo__task-title">
      ${input.value}
    </h5>
    <div class="todo__wrapper-btn">
      <button class="todo__task-edit">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 11V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H13" stroke="" stroke-width="2" stroke-linecap="round"/>
        <path d="M17.9227 3.52798C18.2607 3.18992 18.7193 3 19.1973 3C19.6754 3 20.134 3.18992 20.472 3.52798C20.8101 3.86605 21 4.32456 21 4.80265C21 5.28075 20.8101 5.73926 20.472 6.07732L12.3991 14.1502L9 15L9.84978 11.6009L17.9227 3.52798Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 6L18 8" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="todo__task-delete">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4H19" stroke="" stroke-width="2" stroke-linecap="round"/>
        <path d="M18 8L17.2131 18.2301C17.0928 19.7931 15.7895 21 14.2219 21H9.77809C8.21048 21 6.90716 19.7931 6.78693 18.2301L6 8" stroke="" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 4L9.84479 4C10.5665 4 11.2405 3.63931 11.6408 3.0388C11.8117 2.78249 12.1883 2.78249 12.3592 3.0388C12.7595 3.63931 13.4335 4 14.1552 4L16 4" stroke="" stroke-width="2"/>
        </svg>
      </button>
      </div>
      </li>
  ` 
  wrapperTask.insertAdjacentHTML('beforeend', newTask)
  input.value = ''
  input.focus()
  countUp++
  countDone.textContent = countUp
  
}
/*=============================================================*/
// Удаление таски
function deleteTask(event) {
  if (event.target.classList.contains('todo__task-delete')) {
    const parenNode = event.target.closest('.todo__task-item')
    parenNode.remove()
    countUp--
    countDown++
    archiveSpan.textContent = countDown
    countDone.textContent = countUp
    countWait.textContent = countDown
  }
}
/*============================================================*/
//Попап Архива

/*============================================================*/
// Попап для таски
const popUpTask = document.querySelector('.todo__popup-task')
const overlya = document.querySelector('.todo__overlya')
const btnSavePopUp = document.querySelector('.todo__popup-save')
const textarea = document.querySelector('.todo__popup-textarea')
let dataItem = 0 

function openPopUpTask (event) {
  if (event.target.classList.contains('todo__task-edit')) {
    const parentNode = event.target.closest('.todo__task-item')
    const itemTitle = parentNode.querySelector('.todo__task-title')
    // const taskTitle = parentNode.dataset.target
    textarea.value = itemTitle.textContent
    dataItem = parentNode.dataset.target
    // parentNode.classList.add('item-active')
    overlya.classList.add('active-overlya')
    popUpTask.classList.add('pop-up-active') 
  }
}
// Сохранения и закрытие таски
btnSavePopUp.addEventListener('click', () => {
  overlya.classList.remove('active-overlya')
  popUpTask.classList.remove('pop-up-active')  
  // const transformData = String(dataCount)
  const itemTask = document.querySelectorAll('.todo__task-item') 
  itemTask.forEach((item) => {
    if (item.dataset.target === dataItem) {
      // console.log(transformData)
      const taskTitle = item.querySelector('.todo__task-title')  
      taskTitle.textContent = textarea.value 
    } 
  })
})


/*============================================================*/










