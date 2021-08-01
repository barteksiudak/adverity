import { keyBy } from 'lodash';
import { useMemo } from 'react';

import { Item } from '../../types';
import './sidebar.scss';
import MultiSelect from '../MultiSelect/MultiSelect';

interface SidebarProps {
  items: Item[],
  selectedCampaigns: string[],
  selectedDataSources: string[],
  onChangeCampaigns: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onChangeDataSource: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onRemoveCampaign: (attr: string) => void,
  onRemoveDataSources: (attr: string) => void,
}

export default function Sidebar({
  items,
  selectedCampaigns,
  selectedDataSources,
  onChangeCampaigns,
  onChangeDataSource,
  onRemoveCampaign,
  onRemoveDataSources,
}: SidebarProps): JSX.Element {
  const dataSourceNames = useMemo(() => Object.keys(keyBy(items, 'dataSource')), [items]);
  const filteredDataSources = useMemo(
    () => dataSourceNames.filter((name) => !selectedDataSources.includes(name)),
    [dataSourceNames, selectedDataSources]
  );
  const campaigns = useMemo(() => Object.keys(keyBy(items, 'campaign')), [items]);
  const filteredCampaigns = useMemo(
    () => campaigns.filter((name) => !selectedCampaigns.includes(name)),
    [campaigns, selectedCampaigns]
  );
  
  return (
    <div className="sidebar">
      <h2>Filter dimension values</h2>
      <div className="sidebar-form-container">
        <MultiSelect
          title="Campaigns"
          label="Select Campaigns"
          options={filteredCampaigns}
          selectedItems={selectedCampaigns}
          onChange={onChangeCampaigns}
          onRemove={onRemoveCampaign}
        />
         <MultiSelect
          title="Data Sources"
          label="Select Data Sources"
          options={filteredDataSources}
          selectedItems={selectedDataSources}
          onChange={onChangeDataSource}
          onRemove={onRemoveDataSources}
        />
      </div>
    </div>
  );
}
