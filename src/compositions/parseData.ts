import { Item } from "../types";

export default function parseData(rawData: string): Item[] {
  return rawData.trim().split('\n').slice(1).map((row) => {
    const [date, dataSource, campaign, clicks, impressions] = row.split(',');

    return {
      date,
      dataSource,
      campaign,
      clicks: parseInt(clicks, 10) || 0,
      impressions: parseInt(impressions, 10) || 0,
    };
  });
}
