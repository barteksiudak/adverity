import { useCallback, useEffect, useMemo, useState } from 'react';
import { Sidebar, Container } from './components';
import { parseData } from './compositions';

import './App.scss';
import { Item } from './types';

export default function App() {
  const [rawData, setRawData] = useState<string>('');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv')
    .then(response => response.text())
    .then(setRawData)
  }, []);

  const items = useMemo((): Item[] => parseData(rawData), [rawData]);

  const onChange = (type: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (!value) {
      return;
    }

    const [list, setList] = type === 'campaign' ?
      [selectedCampaigns, setSelectedCampaigns] :
      [selectedDataSources, setSelectedDataSources];
  
      setList([...list, value]);
  }

  const onRemove = (type: string) => (name: string) => {
    const [list, setList] = type === 'campaign' ?
      [selectedCampaigns, setSelectedCampaigns] :
      [selectedDataSources, setSelectedDataSources];

    const index = list.indexOf(name);
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  return (
    <div data-testid="content" className="content">
      <Sidebar
        items={items}
        selectedCampaigns={selectedCampaigns}
        selectedDataSources={selectedDataSources}
        onChangeCampaigns={onChange('campaign')}
        onChangeDataSource={onChange('dataSource')}
        onRemoveCampaign={onRemove('campaign')}
        onRemoveDataSources={onRemove('dataSource')}
      />
      <Container
        items={items}
        selectedCampaigns={selectedCampaigns}
        selectedDataSources={selectedDataSources} />
    </div>
  );
}
