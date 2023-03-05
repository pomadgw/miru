import { init, classModule, propsModule, styleModule, eventListenersModule, h, type VNode } from 'snabbdom'

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
])

const root = document.querySelector('#app')

const component = (): VNode =>
  h('main', [
    h(
      'p',
      {
        style: { fontWeight: 'bold' },
        on: {
          click: () => {
            console.log('Long live King Souma!')
          }
        }
      },
      'United Kingdom of Elfrieden and Amidonia'
    )
  ])

function doRender(): void {
  if (root !== null) {
    patch(root, component())
  }
}

doRender()
