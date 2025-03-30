# poohou-create-element

## 介绍
创建dom与ast转dom方法

## 示例
```typescript
import {astToNode, createElement} from "poohou-create-element";

astToNode({
   tagName: 'div',
   props: {
      class: 'container'
   },
   children: [
      '字符串',
      {
         tagName: 'div',
         children: [
            '内部的'
         ]
      },
   ]
})

createElement(
  'div',
  {class: 'container'},
  createElement('div', {class: 'container'}, '子节点1'),
  createElement('div', {class: 'container'}, '子节点2')
)
```
