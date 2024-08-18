/* eslint-disable react/prop-types */
export default function Input({
  id,
  label,
  classname,
  placeholder,
  name,
  value,
  onchange,
  error,
}) {
  return (
    <div className={classname} key={id}>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onchange}
      />
      <p className="error">{error}</p>
    </div>
  );
}
