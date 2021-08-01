import parseData from "./parseData";

const mockValue = {
  date: '1988',
  dataSource: 'e',
  campaign: 'b',
  clicks: 9,
  impressions: 1,
}

const mock = `date,dataSource,campaign,clicks,impressions
2021,a,b,,5
${Object.values(mockValue).join(',')}
2022,c,d,8,

`

describe('parseData', () => {
  it('is parseData', () => {
    expect(parseData('')).toEqual([]);
  });

  it('cuts whites spaces and header', () => {
    expect(parseData(mock)).toHaveLength(3);
  });

  it('returns correct values', () => {
    const [, expected] = parseData(mock);
    expect(expected).toEqual(mockValue);
  });
});
