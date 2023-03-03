export interface VirtualTextDOM {
  tag: null
  children: string
}

export interface VirtualElementDOM {
  tag: string
  props?: Record<string, string>
  events?: Record<string, EventListener>
  children: VirtualDOM[]
}

export type VirtualDOM = VirtualElementDOM | VirtualTextDOM

function isTextNode(node: VirtualDOM): node is VirtualTextDOM {
  return node.tag === null
}

// function isElementNode(node: VirtualDOM): node is VirtualElementDOM {
//   return typeof node.tag === 'string'
// }

export function render(node: VirtualDOM): HTMLElement | Text {
  if (isTextNode(node)) {
    return document.createTextNode(node.children)
  }

  const el = document.createElement(node.tag)

  if (node.props != null) {
    for (const prop in node.props) {
      el.setAttribute(prop, node.props[prop])
    }
  }

  if (node.events != null) {
    for (const event in node.events) {
      el.addEventListener(event, node.events[event])
    }
  }

  for (const child of node.children) {
    el.appendChild(render(child))
  }

  return el
}

// export function diff(parent: Element, oldNode: VirtualDOM, newNode: VirtualDOM): void {
//   //
// }
