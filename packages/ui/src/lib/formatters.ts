import type { ReactNode } from 'react';

export function formatLabel(value?: string) {
  if (!value) {
    return null;
  }

  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export type FormatDateOptions = {
  locale?: string;
  timeZone?: string;
  fallback?: string;
};

export function formatDate(date: string | Date, options: FormatDateOptions = {}): string {
  const { locale = 'en-DE', timeZone, fallback = 'Invalid date' } = options;

  const value = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(value.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...(timeZone ? { timeZone } : {}),
  }).format(value);
}

export function renderValue(value?: string | boolean | string[]): ReactNode {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return null;
    }

    return value.map(formatLabel).join(', ');
  }

  return formatLabel(value);
}

export function renderCurrency(amount?: number, currency?: string): ReactNode {
  if (amount === undefined || amount === null) {
    return null;
  }

  return `${currency || ''} ${amount}`;
}

export function renderBoolean(value?: boolean): ReactNode {
  if (value === undefined || value === null) {
    return null;
  }

  return value ? 'Yes' : 'No';
}

export function renderNumber(value?: number, suffix?: string): ReactNode {
  if (value === undefined || value === null) {
    return null;
  }

  return `${value}${suffix ? ` ${suffix}` : ''}`;
}

export function renderTargetAge(min?: number, max?: number): ReactNode {
  if (min === undefined && max === undefined) {
    return null;
  }

  return `${min ?? '-'} - ${max ?? '-'}`;
}

export function renderArray(values?: string[]): ReactNode {
  if (!values || values.length === 0) {
    return null;
  }

  return values
    .map((item) => formatLabel(item))
    .filter(Boolean)
    .join(', ');
}

export const statusColor = {
  ONLINE: 'bg-green-500',
  OFFLINE: 'bg-gray-400',
};
