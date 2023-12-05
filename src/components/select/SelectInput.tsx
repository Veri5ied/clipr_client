import { useState } from "react";

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<Props> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const handleSelect = (value: string) => {
    onChange(value);
    toggle();
  };

  return (
    <div className="select">
      <div className="select__header" onClick={toggle}>
        <div className="select__header-label">{value}</div>
        <div className="select__header-arrow">
          <i className={`fas fa-chevron-${open ? "up" : "down"}`}></i>
        </div>
      </div>
      {open && (
        <ul className="select__list">
          {options.map((option) => (
            <li
              className="select__list-item"
              key={option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
