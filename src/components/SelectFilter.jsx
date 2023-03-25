import React from "react";

const SelectFilter = ({ title, value, onChange, children }) => {
  return (
    <div className="select-filter">
      <span>{title}</span>
      <select name="all" value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};

export default SelectFilter;
