import React, { MouseEvent } from 'react';
import './multiSelect.scss';

interface MultiSelectProps {
  title: string,
  label: string,
  options: string[],
  selectedItems: string[],
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onRemove: (itemName: string) => void,
}

export default function MultiSelect({ onRemove, title, label, options, selectedItems, onChange }: MultiSelectProps) {
  const handleRemove = (itemName: string) => (e: MouseEvent): void => {
    e.preventDefault();
    onRemove(itemName);
  };

  return (
    <div className="multi-select-container">
      <h3>{title}</h3>
      <div className="selected-items-container">
        {selectedItems.map((item) => (
          <div key={item} className="selected-item">
            <a href="/" onClick={handleRemove(item)} className="remove">x</a>
            <div>{item}</div>
          </div>
        ))}
      </div>
      <select onChange={onChange} value={''}>
        <option value={''}>{label}</option>
        {options.map((label) => <option key={label}>{label}</option>)}
      </select>
    </div>
  );
}
