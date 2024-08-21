import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/blocks/Spinner.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Blocks/Spinner',
  component,
};

export const Spinner: StoryObj<typeof meta> = {};

export default meta;
