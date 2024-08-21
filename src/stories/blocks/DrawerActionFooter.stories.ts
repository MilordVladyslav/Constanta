import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/DrawerActionFooter.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/DrawerActionFooter',
  component,
};

export const DrawerActionFooter: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    cancelBtnText: 'Cancel',
    actionBtnText: 'Action',
  },
};

export default meta;
