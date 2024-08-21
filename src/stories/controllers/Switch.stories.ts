import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/Switch.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Controllers/Switch',
  component,
};

export const Switch: StoryObj<typeof meta> = {};

export default meta;
