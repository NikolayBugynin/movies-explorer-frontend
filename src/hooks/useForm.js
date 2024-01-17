import { useState, useCallback } from "react";

export function useFormValidation() {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;
    if (input.name === "name") {
      const validityState = input.validity;
      if (validityState.patternMismatch) {
        input.setCustomValidity(
          "Имя не должно содержать чисел, спецсимволов и пробелов."
        );
      } else {
        input.setCustomValidity("");
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const isChanged = (key, val) => val[key] === values[key];

  const isEmptyForm = (values) => {
    console.log(values);
    return values.name === "";
  };

  return {
    setValues,
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    isChanged,
    isEmptyForm,
  };
}
