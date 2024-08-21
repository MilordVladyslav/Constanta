export interface ConstantaPaginationOptions {
  chunkSize: number;
}

export enum TAG_STATE {
  green = 'green',
  red = 'red',
  orange = 'orange',
  blue = 'blue',
  yellow = 'yellow',
  gray = 'gray',
  grey = 'grey',
}

export enum UPLOADER_STATUS {
  wait = 'wait',
  uploading = 'uploading',
  error = 'error',
  successfully = 'successfully',
}

export enum STATE {
  default = 'default',
  info = 'info',
  error = 'error',
  warning = 'warning',
  successful = 'successful',
}

export interface ConstantaDropdownOptions {
  snap?: 'left' | 'right';
  list?: {
    minWidth?: string;
    maxWidth?: string;
  };
}

/**
 * @param thead.size - default: small;
 * @param tbody.size - default: medium;
 */
export interface ConstantaLoadingSkeletionTableOptions {
  thead?: {
    height?: 'large' | 'medium' | 'small';
  };

  tbody?: {
    height?: 'large' | 'medium' | 'small';
  };
}

export enum ConstantaLoadingSkeletionVariant {
  table = 'table',
  input = 'input',
  button = 'button',
  collapse = 'collapse',
  switch = 'switch',
  photo = 'photo',
  btnLink = 'btn-link',
  '16x16' = '16x16',
  '32x32' = '32x32',
}

export interface SelectedDate {
  start: Date | null;
  end: Date | null;
}
