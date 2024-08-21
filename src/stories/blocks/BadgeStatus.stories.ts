import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/BadgeStatus.vue';

import { STATE } from '@/interfaces/controllers.interface';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/BadgeStatus',
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

export const BadgeStatus: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    state: STATE.default,
    value: '',
  },
};

export default meta;
