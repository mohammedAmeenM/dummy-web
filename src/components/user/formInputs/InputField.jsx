import { Field, ErrorMessage } from 'formik';

const InputField = ({ label, name, type, placeholder }) => {
  return (
    <div className="relative mb-4">
      <label htmlFor={name} className="leading-7 text-sm text-gray-600">
        {label}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm h-5" />
    </div>
  );
};

export default InputField;
