/**
 * 创建一个 DOM 元素
 * @param tagName 标签名或组件
 * @param props 属性对象
 * @param children 子节点
 * @returns 返回创建的 DOM 元素
 */
// 函数重载签名
// 函数重载签名
export function createElement (tagName: string, ...children: Array<string | Node>): HTMLElement
export function createElement (tagName: string, props: Record<string, any> | null, ...children: Array<string | Node>): HTMLElement
export function createElement (tagName: object, props?: Record<string, any> | null, ...children: Array<string | Node>): HTMLElement

// 创建一个 DOM 元素
export function createElement (
  tagName: string | object,
  props?: Record<string, any> | null | Array<string | Node>,
  ...children: Array<string | Node>
): HTMLElement {
  const element = typeof tagName === 'string'
    ? document.createElement(tagName)
    : document.createElement('div') // 如果是组件，默认创建一个 div 元素

  // 处理 props 参数
  if (props !== undefined && !(props instanceof Object) && !Array.isArray(props)) {
    children = [props, ...children]
    props = null
  }

  if (props) {
    Object.keys(props).forEach((key) => {
      if (key === 'class' && typeof props[key] === 'object') {
        // 处理 class 为对象的情况
        Object.keys(props[key]).forEach((className) => {
          if (props[key][className]) {
            element.classList.add(className)
          }
        })
      } else {
        element.setAttribute(key, props[key])
      }
    })
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    if (child instanceof Node) {
      element.appendChild(child)
    } else {
      console.error('Invalid child type:', child)
    }
  })

  return element
}

/**
 * 将 DOM AST 结构转换为实际的 DOM 节点
 * @param astNode DOM AST 节点
 * @returns 返回创建的 DOM 元素
 */
export function astToNode (astNode: {
  tagName: string
  props?: Record<string, any>
  children?: any[]
}): HTMLElement {
  const { tagName, props, children } = astNode
  const element = createElement(tagName, props)

  if (children && children.length > 0) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child))
      } else if (child instanceof Node) {
        element.appendChild(child)
      } else if (child && typeof child === 'object') {
        // 递归处理子节点
        element.appendChild(astToNode(child))
      } else {
        console.error('Invalid child type:', child)
      }
    })
  }

  return element
}
