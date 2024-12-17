const FormRow = ({ id, children, type, defaultValue, onChange }) => {
  return (
    <div>
      <div className="form-row">
        <label htmlFor={id} className="form-label">
          {children}
        </label>
        <input
          id={id}
          name={id}
          className="form-input"
          type={type || "text"}
          defaultValue={defaultValue || ""}
          required
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormRow;
