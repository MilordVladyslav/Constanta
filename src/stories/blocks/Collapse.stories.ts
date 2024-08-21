import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Collapse.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Collapse',
  component,
};

export const Collapse: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    title: 'Title',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    disabled: false,
    open: false,
  },
};

export default meta;
