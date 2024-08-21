enum DEVICE_TYPE {
  desktop = 'desktop',
  tablet = 'tablet',
  mobile = 'mobile',
}

type DataObject = string | FileList | File | any[] | object;

export const toFormData = (dataObject: { [x: string]: DataObject }): FormData => {
  const fd = new FormData();

  for (const key in dataObject) {
    const d: DataObject = dataObject[key];

    if (d instanceof FileList) {
      for (let i = 0; i < d.length; i++) {
        const file = d.item(i)!;

        fd.append(key, file, file.name);
      }
    } else if (d instanceof File) {
      fd.append(key, d, d.name);
    } else if (Array.isArray(d)) {
      fd.append(key, JSON.stringify(d));
    } else if (typeof d === 'object') {
      fd.append(key, JSON.stringify(d));
    } else {
      fd.append(key, d);
    }
  }

  return fd;
};

export const validateTypeFile = (file: File, listValidFormat: string[]): File | null => {
  const splitFileName = file.name.split('.');
  const fileFormat = splitFileName[splitFileName.length - 1];

  if (listValidFormat.some((v) => v === fileFormat)) return file;

  return null;
};

/**
 *
 * @link https://www.gbmb.org/mb-to-bytes (use binary value)
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const randomString = (length: number, chars: string) => {
  let mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  let result = '';
  for (let i = length; i > 0; i -= 1) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
};

export const getDeviceType = (): DEVICE_TYPE => {
  const userAgent = navigator.userAgent;

  const tabletRegEx = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
  const mobileRegEx =
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;

  if (tabletRegEx.test(userAgent)) return DEVICE_TYPE.tablet;

  if (mobileRegEx.test(userAgent)) return DEVICE_TYPE.mobile;

  return DEVICE_TYPE.desktop;
};

export const arrayEqual = (arr1: any[], arr2: any[]) => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) return false;
  }

  // Otherwise, return true
  return true;
};

export const getUniqueObjectFromArray = <T>(array: any[], key?: string): T[] =>
  Array.from(new Set(array.map((item) => (key ? JSON.stringify((item as any)[key]) : JSON.stringify(item))))).map(
    (str) => JSON.parse(str)
  );

export const changeControllerBorderColorForFeedback = (feedback: string[] | boolean | undefined): boolean => {
  if (typeof feedback === 'boolean') return feedback;

  if (Array.isArray(feedback) && feedback.length) return true;

  return false;
};
