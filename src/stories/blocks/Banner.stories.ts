import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Banner.vue';

import { STATE } from '@/interfaces/controllers.interface';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Banner',
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

export const Banner: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    state: STATE.default,
    title: 'Title',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    showClose: false,
  },
};

export default meta;
