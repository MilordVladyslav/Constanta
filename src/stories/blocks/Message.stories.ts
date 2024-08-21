import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Message.vue';

import { STATE } from '@/interfaces/controllers.interface';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Message',
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

export const Message: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    state: STATE.default,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export default meta;
