import { render, type VirtualDOM } from '../lib/vdom'

const root = document.querySelector('#app')

const component = (): VirtualDOM => ({
  tag: 'main',
  children: [
    {
      tag: 'p',
      props: {
        style: 'font-weight: bold'
      },
      events: {
        click: () => {
          console.log('Long live King Souma!')
        }
      },
      children: [
        {
          tag: null,
          children: 'United Kingdom of Elfrieden and Amidonia'
        }
      ]
    }
  ]
})

function doRender(): void {
  if (root !== null) {
    root.appendChild(render(component()))
  }
}

doRender()
