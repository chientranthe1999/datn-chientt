<script lang="ts">
import type { PropType, VNode } from 'vue'
import { VAvatar } from 'vuetify/components'
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
        class: 'ml-8',
        items: child, // flat props
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
      const icon = h(VAvatar, {
        variant: 'tonal',
        icon: props.items.icon ?? 'cate-default',
        size: '40',
        class: 'me-2',
      })

      return h('div',
        {
          class: 'py-3',
        },
        [icon, props.items.label],
      )
    }

    return () => {
      return h('div', {}, [genRoot(), ...genChildren()])
    }
  },

})
</script>
