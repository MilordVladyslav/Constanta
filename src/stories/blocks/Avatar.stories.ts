import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Avatar.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Avatar',
  component,
};

export const Avatar: StoryObj<typeof meta> = {
  args: {
    dark: false,
    light: false,
    small: false,
    medium: false,
    large: true,
    title: 'Avatar',
    photo: '',
    alt: 'Avatar',
  },
};

export default meta;
