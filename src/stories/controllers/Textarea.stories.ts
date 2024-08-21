import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/Textarea.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Controllers/Textarea',
  component,
};

export const Textarea: StoryObj<typeof meta> = {};

export default meta;
