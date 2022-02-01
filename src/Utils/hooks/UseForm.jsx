import { useState } from 'react';

export const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState);

  const resetFormData = () => {
    setFormData(initialState);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    resetFormData();
    onSubmit?.(formData);
  }


  return { formData, handleInputChange, handleSubmit };
}