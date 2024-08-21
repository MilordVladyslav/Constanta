import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/Input.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Controllers/Input',
  component,
};

export const Input: StoryObj<typeof meta> = {};

export default meta;
