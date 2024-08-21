import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/AsideModal.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/AsideModal',
  component,
};

export const AsideModal: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    title: 'Lorem ipsum dolor',
  },
};

export default meta;
