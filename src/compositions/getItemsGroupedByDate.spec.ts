import { Item } from '../types';
import getItemsGroupedByDate from './getItemsGroupedByDate';

const mock = [
  {
    date: 'first',
    clicks: 5,
    impressions: 4,
  }, {
    date: 'second',
    clicks: 5,
    impressions: 7,
  }, {
    date: 'third',
    clicks: 5,
    impressions: 12,
  }, {
    date: 'first',
    clicks: 5,
    impressions: 4,
  }, {
    date: 'first',
    clicks: 7,
    impressions: 1,
  }, {
    date: 'second',
    clicks: 9,
    impressions: 3,
  },
] as Item[];

describe('getItemsGroupedByDate', () => {
  const groupedItems = getItemsGroupedByDate(mock);

  it('is getItemsGroupedByDate', () => {
    expect(getItemsGroupedByDate([])).toEqual({});
  });

  it('has all dates', () => {
    expect(Object.values(groupedItems)).toHaveLength(3);
  });

  it('counts clicks and impressions', () => {
    const { first, second, third } = groupedItems;
    expect(first.clicks).toBe(17);
    expect(second.clicks).toBe(14);
    expect(third.clicks).toBe(5);

    expect(first.impressions).toBe(9);
    expect(second.impressions).toBe(10);
    expect(third.impressions).toBe(12);
  });
});
