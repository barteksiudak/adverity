
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { getItemsGroupedByDate } from '../../compositions';
import { Item } from '../../types';
import './container.scss';

interface ContainerProps {
  items: Item[];
  selectedCampaigns: string[];
  selectedDataSources: string[];
}

export default function Container({ items, selectedCampaigns, selectedDataSources }: ContainerProps) {

  const itemsGroupedByDate = useMemo(() => {
    const filteredItems = items.filter(({ campaign, dataSource }) => {
      const filterCampaign = !selectedCampaigns.length || selectedCampaigns.includes(campaign);
      const filterDataSource = !selectedDataSources.length || selectedDataSources.includes(dataSource);
      return filterCampaign && filterDataSource;
    })
    const itemsByDate = getItemsGroupedByDate(filteredItems);
    return Object.values(itemsByDate);
  }, [items, selectedCampaigns, selectedDataSources]);

  return (
    <div className="container">
      <h2>Datasource "Doubleclick (dfa)" and "Meetrics"; All Campigns</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={itemsGroupedByDate}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" label={{ value: 'Clicks', angle: -90, dx: -36}} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Impressions', angle: -90, dx: 48}} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#8884d8" />
          <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
