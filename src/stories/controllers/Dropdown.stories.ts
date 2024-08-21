import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/Dropdown.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Controllers/Dropdown',
  component,
};

export const Dropdown: StoryObj<typeof meta> = {};

export default meta;
