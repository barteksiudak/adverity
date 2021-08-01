import { Item } from "../types";

export default function getItemsGroupedByDate(items: Item[]) {
  return items.reduce((acc, item) => {
    const { date, clicks, impressions } = item;
    const currentItem = acc[date] || { clicks: 0, impressions: 0 };
    return {
      ...acc,
      [date]: {
        ...item,
        clicks: currentItem.clicks + clicks,
        impressions: currentItem.impressions + impressions,
      },
    }
  }, {} as { [key: string]: Item });
}
