/* eslint-disable react/prop-types */
export default function Select({
  id,
  label,
  classname,
  name,
  defaultOption,
  options,
  value,
  onchange,
  error,
}) {
  return (
    <div className={classname}>
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} value={value} onChange={onchange}>
        <option value="" hidden>
          {defaultOption}
        </option>
        {options.map((option, i) => {
          return (
            <option key={i} value={option.id}>
              {option.categoryName}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}
