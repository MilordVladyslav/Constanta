import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/features/CopyToClipboard.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Features/CopyToClipboard',
  component,
};

export const CopyToClipboard: StoryObj<typeof meta> = {};

export default meta;
