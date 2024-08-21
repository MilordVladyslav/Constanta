import type { DefineComponent, DirectiveBinding } from 'vue';

export type ConstantaTooltipBinding = DirectiveBinding<{
  state: string;
  title?: string;
  text?: string;
  link?: {
    title: string;
    href: string;
    medium?: boolean;
  };
}>;

export interface TooltipOptions {
  mode?: TOOLTIP_MODE;
  theme?: TOOLTIP_THEME;

  component?: DefineComponent;

  value?: string;

  toggle?: boolean;

  position?: {
    side?: TOOLTIP_SIDE;
    place?: TOOLTIP_PLACE;
  };
}

export enum TOOLTIP_MODE {
  hover = 'hover', // default;
  toggle = 'toggle',
}

export enum TOOLTIP_THEME {
  grey = 'grey',
  gray = 'gray',
  info = 'info',
  error = 'error',
  warning = 'warning',
  successful = 'successful',
}

export enum TOOLTIP_SIDE {
  left = 'left',
  top = 'top',
  right = 'right', // default
  bottom = 'bottom',
}

// Left to right or top to bottom;
export enum TOOLTIP_PLACE {
  start = 'start',
  center = 'center', // default;
  end = 'end',
}
