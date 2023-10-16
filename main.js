
const addBtn = document.querySelector('.todo__add-btn')
const item = document.querySelector('.todo__task-item')
const wrapperTask = document.querySelector('.todo__wrapper-task')
const input = document.querySelector('.todo__input')
const countDone = document.querySelector('.todo__counter-done')
const countWait = document.querySelector('.todo__counter-wait')
let countUp = 0
let countDown = 0



addBtn.addEventListener('click', addNewTask) 
wrapperTask.addEventListener('click', deleteTastk)
wrapperTask.addEventListener('click', markerTask)



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
  if (input.value === '') return
  const newTask = `
    <li class="todo__task-item">
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
  wrapperTask.insertAdjacentHTML('afterbegin', newTask)
  input.value = ''
  input.focus()
  countUp++
  countDone.textContent = countUp
}
/*=============================================================*/
// Удаление таски
function deleteTastk(event) {
  if (event.target.classList.contains('todo__task-delete')) {
    const parenNode = event.target.closest('.todo__task-item')
    parenNode.remove()
    countUp--
    countDown++
    countDone.textContent = countUp
    countWait.textContent = countDown
  }
}





