import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Drawer.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Drawer',
  component,
};

export const Drawer: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    title: 'Lorem ipsum dolor',
  },
};

export default meta;
