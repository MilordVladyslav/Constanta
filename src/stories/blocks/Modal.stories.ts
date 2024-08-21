import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Modal.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Modal',
  component,
};

export const Modal: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    disabledClose: false,
  },
};

export default meta;
