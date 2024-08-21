import type { Meta, StoryObj } from '@storybook/vue3';

import component from '@/components/features/Uploader.vue';

const meta: Meta<typeof component> = {
  title: 'Components/Features/Uploader',
  component,
};

export const Uploader: StoryObj<typeof meta> = {};

export default meta;
