import MyIcon from '@/components/MyIcon'
import Vue from 'vue'
import Mycss from './tip.module.scss'
function getComponentRootDom (comp, props) {
  const vm = new Vue({
    render: h => h(comp, { props })
  })
  vm.$mount()
  return vm.$el
}

const typeString = {
  info: 'success',
  warn: 'jinggao1'
}

export default function (vue) {
  vue.prototype.$tip = function (config) {
    const { msg, callback, type = 'info', wrapper = document.body, delay = 1000, duration = 1000 } = config
    if (wrapper) {
      const positionNmae = getComputedStyle(wrapper).position
      if (positionNmae !== 'relative' || positionNmae !== 'absolute') {
        wrapper.style.position = 'relative'
      }
    }

    const vm = getComponentRootDom(MyIcon, { type: typeString[type] })
    const div = document.createElement('div')

    div.setAttribute('class', `${Mycss.tip} ${Mycss[type]}`)
    div.innerHTML = `${vm.outerHTML} <div style="margin-left:5px">${msg}</div>`
    div.style.transitionDuration = `${duration}ms`
    div.style.transitionDelay = `${delay}ms`
    div.style.zIndex = 99999999

    wrapper.appendChild(div)
    // 强制页面刷新
    console.log(div.clientHeight)
    div.style.transform = 'translate(-50%,calc(-50% - 30px))'
    div.style.opacity = 0
    div.addEventListener('transitionend', () => {
      div.remove()
      callback && callback()
    }, {
      once: true
    })
  }
}
