<script lang="ts">
import type { PropType, VNode } from 'vue'
import { VAvatar } from 'vuetify/components'
import { VTreeNode } from '@core/components/TreeView/index'

interface TreeItem {
  [key: string]: string | number | TreeItem[] | undefined

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
    itemKey: {
      type: String,
      default: 'id',
    },
    itemLabel: {
      type: String,
      default: 'name',
    },
  },

  setup(props) {
    const genChild = (child: TreeItem) => {
      return h(VTreeNode, {
        class: 'ml-8',
        items: child,
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

      const label = props.items[props.itemLabel] as string

      return h('div',
        {
          class: 'py-1',
        },
        [icon, label],
      )
    }

    return () => {
      return h('div', {}, [genRoot(), ...genChildren()])
    }
  },

})
</script>
