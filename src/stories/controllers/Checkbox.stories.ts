import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/Checkbox.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Controllers/Checkbox',
  component,
};

export const Checkbox: StoryObj<typeof meta> = {};

export default meta;
