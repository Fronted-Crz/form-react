import { useState } from 'react';

import styled from 'styled-components';

import { useForm } from './hooks/useForm';
import { Messages } from './components/Messages';
import Loader from './components/Loader/Loader';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  comments: '',
};
const validationsForm = (form) => {
  let error = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regexComments = /^.{1,255}$/;

  // De esta forma se van validando uno por uno gracias a los if anidados
  /* if (!form.name.trim()) {
    error.name = 'El campo nombre es requerido';
  } else if (!form.email.trim()) {
    error.email = 'El campo email es requerido';
  } else if (!form.subject.trim()) {
    error.subject = 'El campo subject es requerido';
  } else {
    console.log('todo mal');
  } */

  // si uno esta vacio advierte en todos los demas campos
  if (!form.name.trim()) {
    error.name = 'El campo nombre es requerido';
  } else if (!regexName.test(form.name)) {
    error.name = 'El campo de Nombre solo acepta letras y espacios en blanco';
  }

  if (!form.email.trim()) {
    error.email = 'El campo email es requerido';
  } else if (!regexEmail.test(form.email)) {
    error.email = 'El Correo debe de contar con una @ y un dominio';
  }
  if (!form.subject.trim()) {
    error.subject = 'El campo subject es requerido';
  }

  if (!regexComments.test(form.comments)) {
    error.comments = 'El campo solo acepta un maximo de 255 caracteres';
  }

  return error;
};

function App() {
  const {
    form,
    errorForm,
    loading,
    response,
    handleBlur,
    handleChange,
    handleSubmit,
    handleFocus,
  } = useForm(initialForm, validationsForm);

  return (
    <Container>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-div ">
          <div>
            <h5>Nombre</h5>
            <input
              type="text"
              name="name"
              value={form.name}
              required
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              autoComplete="off"
            />
            {errorForm.name && <p className="error-name">{errorForm.name}</p>}
          </div>
        </div>
        <div className="input-div ">
          <div>
            <h5>Email</h5>
            <input
              type="email"
              name="email"
              value={form.email}
              required
              autoComplete="off"
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChange}
            />
            {errorForm.email && (
              <p className="error-email">{errorForm.email}</p>
            )}
          </div>
        </div>
        <div className="input-div ">
          <div>
            <h5>Asunto</h5>
            <input
              type="text"
              name="subject"
              value={form.subject}
              required
              autoComplete="off"
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChange}
            />
            {errorForm.subject && (
              <p className="error-subject">{errorForm.subject}</p>
            )}
          </div>
        </div>

        <div className="input-text-area">
          <h5>Descripcion</h5>
          <textarea
            name="comments"
            cols="50"
            rows="5"
            value={form.comments}
            required
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Escribe tus comentarios"
          ></textarea>
        </div>

        <button type="submit">{loading ? <Loader /> : 'Enviar'}</button>
        {/* {response && <Messages msg="Mensaje enviado" BgColor="#4dbe18" />} */}
      </form>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1d1d1d;

  h1 {
    color: #fff;
    font-size: 2rem;
    text-transform: uppercase;
    background: linear-gradient(
      112deg,
      #aaffec -63.59%,
      #ff4ecd -23.3%,
      #0070f3 70.46%
    );
    border-radius: 10px;
    padding: 15px;
    width: 420px;
    text-align: center;
    margin-bottom: 15px;
    border: 3px solid #fff;
  }

  form {
    position: relative;
    background: rgba(255, 255, 255, 0.25);

    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

    .input-div {
      margin: 5px 0;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    }

    .input-div.focus div h5 {
      top: -10px;
      font-size: 0.7rem;
    }

    .input-div > div {
      position: relative;
      height: 20px;
      width: 350px;
    }

    .input-div > div > h5 {
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      color: #999;
      font-size: 0.9rem;
      transition: 0.3s;
    }

    input {
      position: absolute;
      top: 0;
      left: -8px;
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      margin-bottom: 15px;
      font-weight: 600;
      color: #fff;
    }

    .input-text-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .input-text-area > h5 {
      color: #999;
      font-size: 0.9rem;
      transform: translateX(-150%);
      margin: 5px 0;
    }
    .input-text-area > textarea {
      width: 90%;
      resize: none;
      padding: 0.5rem;
      font-weight: 600;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 5px;
      color: #fff;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 50px;
      font-weight: 600;
      font-family: Poppins;
      border-radius: 10px;
      padding: 0.8rem;
      background-image: linear-gradient(
        to right,
        #aaffec -63.59%,
        #ff4ecd -23.3%,
        #0070f3 70.46%
      );
      background-size: 150%;
      color: #fff;
      outline: none;
      border: none;
      transition: 0.1s ease;
      margin-bottom: 10px;
      cursor: pointer;
    }
    button:hover {
      background-position: right;
      border: 3px solid #fff;
    }

    p.error-name {
      position: absolute;
      color: #ff0000;
      font-size: 0.8rem;
      font-weight: 600;
      margin: 0;
      top: 40px;
      left: 0;
    }
    p.error-email {
      position: absolute;
      color: #ff0000;
      font-size: 0.8rem;
      font-weight: 600;
      margin: 0;
      top: 40px;
      left: 0;
    }
    p.error-subject {
      position: absolute;
      color: #ff0000;
      font-size: 0.8rem;
      font-weight: 600;
      margin: 0;
      top: 40px;
      left: 0;
    }
  }
`;
