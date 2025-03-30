<template>
  <div class="container">
    Vue test
  </div>
</template>

<script setup lang="ts">
import { astToNode, createElement } from '../lib'

const node1 = createElement(
  'div',
  { class: 'container' },
  createElement('div', { class: 'container' }, '子节点1'),
  createElement('div', { class: 'container' }, '子节点2')
)

console.log('node1', node1)

const node = astToNode({
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
    }
  ]
})

console.log('node', node)
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%
}
</style>
