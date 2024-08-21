import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/datepicker/DatePickerContainer.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Features/DatePickerContainer',
  component,
};

export const DatePickerContainer: StoryObj<typeof meta> = {};

export default meta;
