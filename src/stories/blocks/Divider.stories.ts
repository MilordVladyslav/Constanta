import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Divider.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Divider',
  component,
};

export const Divider: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    title: 'Lorem ipsum dolor',
    left: false,
    center: false,
    right: false,
  },
};

export default meta;
