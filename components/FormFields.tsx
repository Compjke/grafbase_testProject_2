type Props = {
  type?: string;
  title: string;
  state: string;
  setState: (value: string) => void;
  placeholder: string;
  isTextArea?: boolean;
};

const FormField: React.FC<Props> = ({
  title,
  state,
  setState,
  placeholder,
  isTextArea,
  type,
}) => {

  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-slate-500">
         {title}:</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
