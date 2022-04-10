import { useState } from 'react';

export const useForm = (initialState, validateForm) => {
  const [form, setform] = useState(initialState);
  const [errorForm, seterrorForm] = useState({});
  const [loading, setloading] = useState(false);
  const [response, setResponse] = useState(null);

  const urlForm = 'https://formsubmit.co/ajax/arnoldcrzdev@gmail.com';
  const dataform = form;

  const dataFetch = (url, data) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((ok) => console.log('Success:', ok));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  const handleFocus = (e) => {
    let parent = e.target.parentNode.parentNode;
    parent.classList.add('focus');
  };

  const handleBlur = (e) => {
    let parent = e.target.parentNode.parentNode;
    if (e.target.value === '') {
      parent.classList.remove('focus');
    }
    handleChange(e);
    seterrorForm(validateForm(form));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    seterrorForm(validateForm(form));

    if (Object.keys(errorForm).length === 0) {
      setloading(true);
      dataFetch(urlForm, dataform);
      setResponse(true);
      setTimeout(() => {
        setloading(false);
        setResponse(false);
      }, 1000);
    } else {
      return;
    }
  };

  return {
    form,
    errorForm,
    loading,
    response,
    handleBlur,
    handleChange,
    handleSubmit,
    handleFocus,
  };
};
