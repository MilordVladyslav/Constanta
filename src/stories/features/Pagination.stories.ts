import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/features/Pagination.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Features/Pagination',
  component,
};

export const Pagination: StoryObj<typeof meta> = {};

export default meta;
