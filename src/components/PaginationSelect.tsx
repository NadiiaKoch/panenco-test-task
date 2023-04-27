import React from "react";
import "./FormSelect.css";


type Props = {
  options: string[] | number[],
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  value: number,
  className: string,
};

export const PaginationSelect: React.FC<Props> = React.memo(({
  options,
  onChange,
  value,
  className
}) => {
  return (
    <select
      className={className}
      value={value}
      onChange={onChange}
     >
      {options.map(option => (
        <option value={option}>{option}</option>
      ))}
    </select>
  )
});