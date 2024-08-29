<script lang="ts">
import type { PropType, VNode } from 'vue'
import { VAvatar, VBtn, VIcon } from 'vuetify/components'
import { VTreeNode } from '@core/components/TreeView/index'
import { CATEGORY_TYPE } from '@/constants/common'

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
  emits: ['edit'],
  setup(props, { emit, slots }) {
    const genChild = (child: TreeItem) => {
      return h(VTreeNode, {
        class: 'ml-8',
        items: child,
        onEdit: item => emit('edit', item),
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

      const editIcon = h(VBtn, {
        class: 'me-2 ml-auto',
        onClick: () => emit('edit', props.items),
        icon: 'mdi-pencil',
        size: 'small',
      })

      const label = h('span', {
        style: 'max-width: 60%;',
      }, props.items[props.itemLabel] as string)

      const iconType = h(VIcon, {
        icon: CATEGORY_TYPE[props.items.type as string].icon,
        color: CATEGORY_TYPE[props.items.type as string].color,
      })

      return h('div',
        {
          class: 'py-1 d-flex align-center',
        },
        slots.default ? slots.default({ icon, label, iconType }) : [icon, label, iconType, editIcon],
      )
    }

    return () => {
      return h('div', {}, [genRoot(), ...genChildren()])
    }
  },

})
</script>
