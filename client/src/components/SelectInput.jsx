export default function SelectInput({
  name,
  defaultValue,
  values,
  children,
  onChange,
}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {children}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {Object.values(values).map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}
