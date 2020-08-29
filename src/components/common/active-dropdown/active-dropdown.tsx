import React from "react";
import classNames from "classnames";

interface ActiveDropdownInterface {
  selected: string | number;
  items: { val: number | string; label: string; classes: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  classes?: string;
}

const ActiveDropdown: React.FC<ActiveDropdownInterface> = ({
  selected,
  items,
  onChange,
  disabled,
  classes
}) => {
  const selectClasses = classNames(classes, { "form-select": true });

  return (
    <select
      value={selected}
      onChange={onChange}
      className={selectClasses}
      disabled={disabled}
    >
      {items.map(({ val, label, classes }) => (
        <option value={val} key={val} className={ classNames("bg-light", classes)}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default ActiveDropdown;
