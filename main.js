
const addBtn = document.querySelector('.todo__add-btn')
const item = document.querySelectorAll('.todo__task-item')
const wrapperTask = document.querySelector('.todo__wrapper-task')
const input = document.querySelector('.todo__input')
// const countDone = document.querySelector('.todo__counter-done')
const countWait = document.querySelector('.todo__counter-wait')
const btnArhive = document.querySelector('.todo__archive')
const archiveSpan = document.querySelector('.todo__archive-span')
const btnTheme = document.querySelector('.header__settings')
const body = document.querySelector('body')


let AllTasks = []// Масив с тасками
let Allarchive = [] 
let countUp = 0
let countArchive = 0
let dataCount = null






addBtn.addEventListener('click', addNewTask)  // Добавление новой таски
wrapperTask.addEventListener('click', deleteTask) // Удаление таски
body.addEventListener('click', closeArchive) // Закрытие попап архива
wrapperTask.addEventListener('click', markerTask) // Метка Выполенной таски
wrapperTask.addEventListener('click', openPopUpTask) // Попап для таски
// btnArhive.addEventListener('click', openPopUpArchive)
body.addEventListener('click', themeBody) // Замена цветовой темы для Боди



/*=============================================================*/
//Сохранение всех данных в локал стородж 



/*============================================================*/
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

/*================================================================*/
//Сохранение всех данных в локал стородж 
// масива с таксками в локал стородж
if (localStorage.getItem('theme') === 'day') {
  addClassDayTheme()
} 
if (localStorage.getItem('theme') === 'dark') {
  addClassNigthTheme()
} 


if (localStorage.getItem('AllTasks')) { //Масив в тасками
  AllTasks = JSON.parse(localStorage.getItem('AllTasks'))
}
if (localStorage.getItem('countTask')) {
  countUp = JSON.parse(localStorage.getItem('countTask'))
}

function saveToLocalStoradge() {
  localStorage.setItem('AllTasks', JSON.stringify(AllTasks))
  localStorage.setItem('countTask', JSON.stringify(countUp))

}
AllTasks.forEach(item => {
  const cssClass = item.done ? 'active-circle' : '';
  const cssClassActivetext = item.done ? 'active-text' : '';
  const newTask = `
    <li class="todo__task-item" data-target="${item.dataAttribute}">
    <div class="todo__item-circle ${cssClass}"></div>
    <h5 class="todo__task-title ${cssClassActivetext}">
      ${item.text}
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
})
countWait.innerText = countUp


// Allarchive.forEach(item => {
//   console.log(item)
//   const deleteTask = `
//   <li class="todo__task-item" data-target="${item.dataAttribute}">
//     <div class="todo__item-circle ${cssClass}"></div>
//     <h5 class="todo__task-title ${cssClassActivetext}">
//       ${item.text}
//     </h5>
//     <div class="todo__wrapper-btn">
//       <button class="todo__task-edit">
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M21 11V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H13" stroke="" stroke-width="2" stroke-linecap="round"/>
//         <path d="M17.9227 3.52798C18.2607 3.18992 18.7193 3 19.1973 3C19.6754 3 20.134 3.18992 20.472 3.52798C20.8101 3.86605 21 4.32456 21 4.80265C21 5.28075 20.8101 5.73926 20.472 6.07732L12.3991 14.1502L9 15L9.84978 11.6009L17.9227 3.52798Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//         <path d="M16 6L18 8" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//         </svg>
//       </button>
//       <button class="todo__task-delete">
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M5 4H19" stroke="" stroke-width="2" stroke-linecap="round"/>
//         <path d="M18 8L17.2131 18.2301C17.0928 19.7931 15.7895 21 14.2219 21H9.77809C8.21048 21 6.90716 19.7931 6.78693 18.2301L6 8" stroke="" stroke-width="2" stroke-linecap="round"/>
//         <path d="M8 4L9.84479 4C10.5665 4 11.2405 3.63931 11.6408 3.0388C11.8117 2.78249 12.1883 2.78249 12.3592 3.0388C12.7595 3.63931 13.4335 4 14.1552 4L16 4" stroke="" stroke-width="2"/>
//         </svg>
//       </button>
//       </div>
//       </li>  
//   `
//   archive.insertAdjacentHTML('beforeend',deleteTask)
// })



/*===============================================================*/
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
// Добавление новой таски

function addNewTask() {
  dataCount++

  if (input.value === '') return

  //Добавляем индификационные данные для каждой таски которая будет попадать в масив
  const objektTask = {
    dataAttribute: Date.now(),
    text: input.value,
    done: false,
  }

  AllTasks.push(objektTask)
  // console.log(AllTasks)
  const cssClass = objektTask.done ? 'active-circle' : '';
  const cssClassActivetext = objektTask.done ? 'active-text' : '';


  const newTask = `
    <li class="todo__task-item" data-target="${objektTask.dataAttribute}">
    <div class="todo__item-circle ${cssClass}"></div>
    <h5 class="todo__task-title ${cssClassActivetext}">
      ${objektTask.text}
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
  countWait.innerText = countUp
  saveToLocalStoradge()

  
}


document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    addNewTask()
  }
}) 
/*=============================================================*/
// Удаление таски

function deleteTask(event) {
  if (event.target.classList.contains('todo__task-delete')) {
    const parenNode = event.target.closest('.todo__task-item')
    //Находим нужный дата атрибут который надо удалить с масива всех тасков
    const dataTarget = Number(parenNode.dataset.target)
    //Функция что бы найти инекс нужной таски
    const index = AllTasks.findIndex(function (item) {
      if (item.dataAttribute === dataTarget) {
        Allarchive.push(item)
        return true
      }
    })
    console.log(Allarchive)
    AllTasks.splice(index, 1)
    parenNode.remove()
    countUp--
    // countArchive++
    archiveSpan.textContent = countArchive
    countWait.textContent = countUp
    // pushDeleteItem()
    saveToLocalStoradge()
  }

}

/*============================================================*/
//Метка Выполенной таски
function markerTask (event) {
  if(event.target.classList.contains('todo__item-circle')) {
    const parentNode = event.target.closest('.todo__task-item')
    const childText = parentNode.querySelector('.todo__task-title')
    const childCircle = parentNode.querySelector('.todo__item-circle')
    const dataTarget = Number(parentNode.dataset.target)
    const index = AllTasks.find(function (item) {
      if (item.dataAttribute === dataTarget) {
        return true
      } 
    })

    index.done = !index.done

    childText.classList.add('active-text')
    childCircle.classList.add('active-circle')
    saveToLocalStoradge()
  }
}
/*============================================================*/
//Попап Архива
const btnArchive = document.querySelector('.todo__archive')
const archive = document.querySelector('.todo__popup-archive')
const popupWrapper = document.querySelector('.todo__popup-wrapper')
const archiveText = document.querySelector('.todo__popup-archive-text')
btnArchive.addEventListener('click', openPopUPArchive)

function openPopUPArchive () {
  overlya.classList.add('active-overlya')
  archive.classList.add('active-archive')
}
pushDeleteItem()

function pushDeleteItem () {
  if (Allarchive.length <= 0) {
  archive.classList.add('text-center')
} else {
    archiveText.style.display = 'none'
    popupWrapper.classList.remove('text-center')
  // archive.classList.add('text-center')
    // Allarchive.forEach(item => {
    //   const cssClass = item.done ? 'active-circle' : '';
    //   const cssClassActivetext = item.done ? 'active-text' : '';
    //   const newTask = `
    //     <li class="todo__task-item" data-target="${item.dataAttribute}">
    //     <div class="todo__item-circle ${cssClass}"></div>
    //     <h5 class="todo__task-title ${cssClassActivetext}">
    //       ${item.text}
    //     </h5>
    //     <div class="todo__wrapper-btn">
    //       <button class="todo__task-edit">
    //       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M21 11V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H13" stroke="" stroke-width="2" stroke-linecap="round"/>
    //         <path d="M17.9227 3.52798C18.2607 3.18992 18.7193 3 19.1973 3C19.6754 3 20.134 3.18992 20.472 3.52798C20.8101 3.86605 21 4.32456 21 4.80265C21 5.28075 20.8101 5.73926 20.472 6.07732L12.3991 14.1502L9 15L9.84978 11.6009L17.9227 3.52798Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //         <path d="M16 6L18 8" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //         </svg>
    //       </button>
    //       <button class="todo__task-delete">
    //         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M5 4H19" stroke="" stroke-width="2" stroke-linecap="round"/>
    //         <path d="M18 8L17.2131 18.2301C17.0928 19.7931 15.7895 21 14.2219 21H9.77809C8.21048 21 6.90716 19.7931 6.78693 18.2301L6 8" stroke="" stroke-width="2" stroke-linecap="round"/>
    //         <path d="M8 4L9.84479 4C10.5665 4 11.2405 3.63931 11.6408 3.0388C11.8117 2.78249 12.1883 2.78249 12.3592 3.0388C12.7595 3.63931 13.4335 4 14.1552 4L16 4" stroke="" stroke-width="2"/>
    //         </svg>
    //       </button>
    //       </div>
    //       </li>
    //   ` 
    //   popupWrapper.insertAdjacentHTML('beforeend',newTask)

    // })
  } 
}



function closeArchive (e) {
  if (e.target.classList.contains('close-archive')) {
    overlya.classList.remove('active-overlya')
    archive.classList.remove('active-archive')
  }
}




/*============================================================*/
// Попап для таски
const popUpTask = document.querySelector('.todo__popup-task')
const overlya = document.querySelector('.todo__overlya')
const btnSavePopUp = document.querySelector('.todo__popup-save')
const textarea = document.querySelector('.todo__popup-textarea')
let dataItem = 0 //Сохраняем айдишник нужной таски







textarea.addEventListener('input', () => {
  setHeightBlock()
})
// function setHeightBlock () {
//   popUpTask.style.height = textarea.scrollHeight + 'px'
//   popUpTask.dataset.height = textarea.scrollHeight + 'px'
// }
function setHeightBlock () {
  console.log(textarea.scrollHeight)
  popUpTask.style.height = textarea.scrollHeight + 'px'
  popUpTask.dataset.height = textarea.scrollHeight + 'px'
}









function openPopUpTask (event) {
  if (event.target.classList.contains('todo__task-edit')) {
    popUpTask.style.height = 0
    popUpTask.dataset.height = 0
    
    const parentNode = event.target.closest('.todo__task-item')
    const itemTitle = parentNode.querySelector('.todo__task-title')
    console.log()
    // const taskTitle = parentNode.dataset.target
    textarea.value = itemTitle.innerText
    dataItem = parentNode.dataset.target
    // parentNode.classList.add('item-active')


    overlya.classList.add('active-overlya')
    popUpTask.classList.add('pop-up-active') 
    saveToLocalStoradge()
    popUpTask.style.height = popUpTask.dataset.height
    setHeightBlock()
  }
}


// Сохранение и закрытие новых данных в таске
btnSavePopUp.addEventListener('click', saveCloseTask)
function saveCloseTask () {
  overlya.classList.remove('active-overlya')
  popUpTask.classList.remove('pop-up-active')  
  const itemTask = document.querySelectorAll('.todo__task-item')
  itemTask.forEach((item) => {
    if (item.dataset.target === dataItem) {
      const taskTitle = item.querySelector('.todo__task-title')  
      const itemCircle = item.querySelector('.todo__item-circle')
      itemCircle.classList.remove('active-circle')
      taskTitle.textContent = textarea.value.trim()
      taskTitle.classList.remove('active-text')

      
      AllTasks.forEach(item => {
        const transformTypeAttribute = String(item.dataAttribute)
        if (transformTypeAttribute === dataItem) {
          item.text = textarea.value.trim()
          saveToLocalStoradge()
          if (!taskTitle.classList.contains('active-text') && !itemCircle.classList.contains('active-circle')) {
            item.done = false
            saveToLocalStoradge()
          }
        }
      })


    } 
  
  })
  
  // console.log(obj)
}


/*============================================================*/













