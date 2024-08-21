import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/AlertModal.vue';

import { STATE } from '@/interfaces/controllers.interface';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/AlertModal',
  component,
  argTypes: {
    state: {
      options: Object.values(STATE),
      control: {
        type: 'radio',
      },
    },
  },
};

export const AlertModal: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    title: 'Lorem ipsum dolor',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    state: STATE.default,
    cancelBtnText: 'Cancel',
    applyBtnText: 'Apply',
  },
};

export default meta;
