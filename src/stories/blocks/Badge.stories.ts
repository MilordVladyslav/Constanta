import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Badge.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Badge',
  component,
};

export const Badge: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    disabled: false,
    value: '',
  },
};

export default meta;
