import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Tag.vue';

import { TAG_STATE } from '@/interfaces/controllers.interface';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Tag',
  component,
  argTypes: {
    state: {
      options: Object.values(TAG_STATE),
      control: {
        type: 'radio',
      },
    },
  },
};

export const Tag: StoryObj<typeof meta> = {
  args: {
    tag: 'div',
    state: TAG_STATE.gray,
    medium: false,
    value: 'Hello',
    canDelete: false,
  },
};

export default meta;
