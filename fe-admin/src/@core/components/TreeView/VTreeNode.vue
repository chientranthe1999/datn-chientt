<script lang="ts">
import type { PropType, VNode } from 'vue'
import { VTreeNode } from '@core/components/TreeView/index'

interface TreeItem {
  label: string
  icon?: string
  children?: TreeItem[]
}
export default defineComponent({
  name: 'VTreeNode',
  props: {
    items: {
      type: Object as PropType<TreeItem>,
      required: true,
      default: () => ({}),
    },
  },

  setup(props) {
    const genChild = (child: TreeItem) => {
      return h(VTreeNode, {
        class: 'ml-2',
        props: {
          items: child,
        },
      })
    }

    const genChildren = () => {
      const childElements: VNode[] = []
      if (props.items.children) {
        props.items.children.forEach(child => {
          childElements.push(genChild(child))
        })
      }

      return childElements
    }

    const genRoot = () => {
      return h('label', {}, 'ChienTT')
    }

    return () => {
      console.log(genChildren())
      h('div', {}, [genRoot(), ...genChildren()])
    }
  },

})
</script>
