(async () => {
  // boolean значение, указавающее на то, включен ли «постоянный» режим хранения данных изначально
  const isAlreadyPersist = await window.navigator.storage?.persisted()

  if (isAlreadyPersist) {
    console.info('Хранилище уже переключено в постоянный режим хранения.')
    return
  }

  // boolean значение, указывающее на то, удалось ли переключиться на «постоянный» режим хранения
  const persistModeEnabled = await window.navigator.storage?.persist()

  if (persistModeEnabled) {
    console.info('Браузер успешно сменил режим хранения на «постоянный».')
    return
  }

  console.info(
    'Браузер столкнулся с проблемами при попытке смены режима. Возможно вам стоит обновиться до последней версии, либо использовать на сайте HTTPS протокол.'
  )
})()




const c = document.querySelector('.c')
const b = document.querySelector('.b')
let lose = new Audio('lose.mp3');
let ost = new Audio('ost.wav');




document.addEventListener('keydown', Move)
i = 0
j = 0
d = 10
t = 1000
score = 0
go = false


function Move(e) {
  if ((e.code == 'KeyD' || e.code == 'ArrowRight') && i < 340) {
    i += d
    b.style.left = 'calc(50% + ' + i + 'px)'
  }
  if ((e.code == 'KeyA' || e.code == 'ArrowLeft') && -340 < i) {
    i -= d
    b.style.left = 'calc(50% + ' + i + 'px)'
  }
  if ((e.code == 'KeyW' || e.code == 'ArrowUp') && j > -190) {
    j -= d
    b.style.top = 'calc(50% + ' + j + 'px)'
  }
  if ((e.code == 'KeyS' || e.code == 'ArrowDown') && 190 > j) {
    j += d
    b.style.top = 'calc(50% + ' + j + 'px)'
  }
}

document.querySelector('.play').addEventListener('click', function () {
  setInterval(() => {
    ost.play()
  }, 136);
  b.style.top = 'calc(50% + ' + j + 'px)'
  b.style.left = 'calc(50% + ' + i + 'px)'
  document.querySelector('.play').outerHTML = ''
  b.style.visibility = 'visible'
  document.querySelector('.score').style.visibility = 'visible'
  document.querySelector('.records').style.visibility = 'visible'
  document.querySelector('.rsc p').innerHTML = window.localStorage.getItem('score')
  document.querySelector('.rt p').innerHTML = window.localStorage.getItem('time')

  function summom() {
    if (!go) {
      let ap = new Audio('ap.mp3');
      ap.play()
      c.insertAdjacentHTML('afterbegin', '<div class="t" style="top: -90px"></div>')
      r = (Math.floor(Math.random() * 680) - 340)
      document.querySelector('.t').style.left = 'calc(50% + ' + r + 'px)'
      setTimeout(summom, t);
    }
  }

  setTimeout(() => {
    setInterval(() => {
      o = document.querySelectorAll('.t')
      o.forEach(element => {
        element.style.top = +element.style.top.split('px')[0] + 1 + 'px'
        if (+element.style.top.split('px')[0] >= 390) {
          let dest = new Audio('dest.mp3');
          dest.play()
          element.outerHTML = ''
          score += 1
          document.querySelector('.sc p').innerHTML = score
          if (t > 100) {
            t -= 5
            document.querySelector('.delay p').innerHTML = t
          }
        }
      });
    }, 10);
    summom()
  }, 1000);
  setInterval(() => {
    if (!go) {
      document.querySelector('.time p').innerHTML = +document.querySelector('.time p').innerHTML + 1
    }
  }, 1000);

  setInterval(() => {
    o = document.querySelectorAll('.t')
    o.forEach(element => {
      if (Math.abs(element.getBoundingClientRect().x - b.getBoundingClientRect().x) <= 20 && Math.abs(element.getBoundingClientRect().y - b.getBoundingClientRect().y) <= 20) {
        gameover();
      }
    }
    )
  }, 1);

  function gameover() {
    lose.play()
    go = true
    o = document.querySelectorAll('.t')
    o.forEach(element => {
      element.outerHTML = ''
    })
    document.querySelector('.score').style.top = '45%'
    document.querySelector('.sc').style.margin = 0
    document.querySelector('.delay').outerHTML = ''
    document.querySelector('.score').insertAdjacentHTML('afterend', '<button class="btn">Retry</button>')
    if (+document.querySelector('.rsc p').innerHTML < +document.querySelector('.sc p').innerHTML) {
      document.querySelector('.rsc p').innerHTML = document.querySelector('.sc p').innerHTML
      document.querySelector('.sc').innerHTML = document.querySelector('.sc').innerHTML + '<div class="nr">New record!</div>'
    }
    if (+document.querySelector('.rt p').innerHTML < +document.querySelector('.time p').innerHTML) {
      document.querySelector('.rt p').innerHTML = document.querySelector('.time p').innerHTML
      document.querySelector('.time').innerHTML = document.querySelector('.time').innerHTML + '<div class="nr">New record!</div>'
    }
    window.localStorage.setItem('score', document.querySelector('.rsc p').innerHTML)
    window.localStorage.setItem('time', document.querySelector('.rt p').innerHTML)

    b.style.visibility = 'hidden'
    document.querySelector('.btn').addEventListener('click', function () {
      i = 0
      j = 0
      d = 10
      t = 1000
      score = 0
      go = false
      setTimeout(summom, t);
      document.querySelector('.btn').outerHTML = ''
      Array.from(document.querySelectorAll('.nr')).forEach(e => {
        e.outerHTML = ''
      })
      document.querySelector('.score').style.top = '15%'
      document.querySelector('.sc').style.marginRight = '50px'
      document.querySelector('.sc').insertAdjacentHTML('afterend', '<div class="delay">delay<p>1000</p></div>')
      document.querySelector('.time p').innerHTML = 0
      document.querySelector('.sc p').innerHTML = score
      document.querySelector('.delay p').innerHTML = t
      b.style.top = 'calc(50% + ' + j + 'px)'
      b.style.left = 'calc(50% + ' + i + 'px)'
      b.style.visibility = 'visible'
    })
  }

  document.querySelector('.reset').addEventListener('click', function () {
    if(confirm('Are you sure?')) {
      document.querySelector('.rsc p').innerHTML = 0
      document.querySelector('.rt p').innerHTML = 0
      window.localStorage.setItem('score', document.querySelector('.rsc p').innerHTML)
    window.localStorage.setItem('time', document.querySelector('.rt p').innerHTML)
    }
    
  })
}
)

