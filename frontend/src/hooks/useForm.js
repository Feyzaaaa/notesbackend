import { useState, useEffect } from 'react';

/**
 * A custom hook for managing form state
 * 
 * @param {Object} initialValues - The initial values for the form
 * @param {Function} validate - Validation function
 * @param {Function} onSubmit - Function to call when the form is submitted
 * @returns {Object} - Form state and handlers
 */
const useForm = (initialValues = {}, validate = () => ({}), onSubmit = () => {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Only run validation if the form is submitting or fields are touched
    if (Object.keys(touched).length > 0) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, touched, validate]);

  useEffect(() => {
    // Call onSubmit if form is submitting and there are no errors
    if (isSubmitting && Object.keys(errors).length === 0) {
      onSubmit(values);
      setIsSubmitting(false);
    } else if (isSubmitting) {
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, onSubmit, values]);

  // Reset the form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Handle blur events to track touched fields
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Mark all fields as touched to trigger validation
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    setIsSubmitting(true);
  };

  // Set a specific field value programmatically
  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
};

export default useForm;