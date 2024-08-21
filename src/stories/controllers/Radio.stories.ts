import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/controllers/Radio.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Controllers/Radio',
  component,
};

export const Radio: StoryObj<typeof meta> = {};

export default meta;
