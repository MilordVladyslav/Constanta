import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/datepicker/DatePicker.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Controllers/DatePicker',
  component,
};

export const DatePicker: StoryObj<typeof meta> = {};

export default meta;
