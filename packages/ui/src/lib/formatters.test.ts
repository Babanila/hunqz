import {
  formatDate,
  formatLabel,
  renderArray,
  renderBoolean,
  renderCurrency,
  renderNumber,
  renderTargetAge,
  renderValue,
  statusColor,
} from './formatters';

describe('formatLabel', () => {
  it('formats snake case labels correctly', () => {
    expect(formatLabel('LIGHT_BROWN')).toBe('Light Brown');
  });

  it('returns null for empty values', () => {
    expect(formatLabel()).toBeNull();

    expect(formatLabel('')).toBeNull();
  });
});

describe('formatDate', () => {
  it('formats valid dates correctly', () => {
    const result = formatDate('2026-05-15T11:11:28+0000', {
      locale: 'en-US',
      timeZone: 'UTC',
    });

    expect(result).toContain('May');
  });

  it('returns fallback for invalid date', () => {
    expect(formatDate('invalid-date')).toBe('Invalid date');
  });

  it('supports custom fallback', () => {
    expect(
      formatDate('invalid-date', {
        fallback: 'N/A',
      }),
    ).toBe('N/A');
  });

  it('supports Date instances', () => {
    const result = formatDate(new Date('2026-05-15T11:11:28Z'));

    expect(result).toBeTruthy();
  });
});

describe('renderValue', () => {
  it('renders formatted string', () => {
    expect(renderValue('LIGHT_BROWN')).toBe('Light Brown');
  });

  it('renders boolean true as Yes', () => {
    expect(renderValue(true)).toBe('Yes');
  });

  it('renders boolean false as No', () => {
    expect(renderValue(false)).toBe('No');
  });

  it('renders formatted arrays', () => {
    expect(renderValue(['LIGHT_BROWN', 'DARK_BLUE'])).toBe('Light Brown, Dark Blue');
  });

  it('returns null for empty array', () => {
    expect(renderValue([])).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(renderValue(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(renderValue('')).toBeNull();
  });
});

describe('renderCurrency', () => {
  it('renders currency correctly', () => {
    expect(renderCurrency(120, 'USD')).toBe('USD 120');
  });

  it('renders amount without currency', () => {
    expect(renderCurrency(120)).toBe(' 120');
  });

  it('returns null for undefined', () => {
    expect(renderCurrency(undefined)).toBeNull();
  });
});

describe('renderBoolean', () => {
  it('renders true as Yes', () => {
    expect(renderBoolean(true)).toBe('Yes');
  });

  it('renders false as No', () => {
    expect(renderBoolean(false)).toBe('No');
  });

  it('returns null for undefined', () => {
    expect(renderBoolean(undefined)).toBeNull();
  });
});

describe('renderNumber', () => {
  it('renders number correctly', () => {
    expect(renderNumber(180)).toBe('180');
  });

  it('renders number with suffix', () => {
    expect(renderNumber(180, 'cm')).toBe('180 cm');
  });

  it('returns null for undefined', () => {
    expect(renderNumber(undefined)).toBeNull();
  });
});

describe('renderTargetAge', () => {
  it('renders min and max correctly', () => {
    expect(renderTargetAge(25, 35)).toBe('25 - 35');
  });

  it('renders missing min correctly', () => {
    expect(renderTargetAge(undefined, 35)).toBe('- - 35');
  });

  it('renders missing max correctly', () => {
    expect(renderTargetAge(25, undefined)).toBe('25 - -');
  });

  it('returns null when both are missing', () => {
    expect(renderTargetAge()).toBeNull();
  });
});

describe('renderArray', () => {
  it('renders formatted arrays correctly', () => {
    expect(renderArray(['LIGHT_BROWN', 'DARK_BLUE'])).toBe('Light Brown, Dark Blue');
  });

  it('returns null for empty arrays', () => {
    expect(renderArray([])).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(renderArray(undefined)).toBeNull();
  });
});

describe('statusColor', () => {
  it('contains ONLINE status color', () => {
    expect(statusColor.ONLINE).toBe('bg-green-500');
  });

  it('contains OFFLINE status color', () => {
    expect(statusColor.OFFLINE).toBe('bg-gray-400');
  });
});
