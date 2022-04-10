import { Messages } from './components/Messages';
import { useForm } from './hooks/useForm';
import styled from 'styled-components';

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
  } = useForm(initialForm, validationsForm);

  return (
    <Container>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Escribe tu nombre"
          value={form.name}
          required
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errorForm.name && <p className="error-name">{errorForm.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Escribe tu correo"
          value={form.email}
          required
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errorForm.email && <p className="error-email">{errorForm.email}</p>}
        <input
          type="text"
          name="subject"
          placeholder="Asunto a tratar"
          value={form.subject}
          required
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errorForm.subject && (
          <p className="error-subject">{errorForm.subject}</p>
        )}
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
        <input type="submit" />
      </form>

      {response && <Messages msg="El mensaje fue enviado" BgColor="#4dbe18" />}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: repeating-linear-gradient(
    -45deg,
    #fdfbfb,
    0px,
    #fdfbfb 20px,
    #576dac 20px,
    #4196ce 40px
  );

  h1 {
    color: #464444;
    font-size: 2rem;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    padding: 15px;
    width: 30%;
    text-align: center;
  }

  form {
    position: relative;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 2rem;

    input:invalid {
      animation: shake 300ms;

      @keyframes shake {
        25% {
          transform: translateX(10px);
        }
        50% {
          transform: translateX(-10px);
        }
        75% {
          transform: translateX(10px);
        }
      }
    }

    input[type='text'] {
      width: 80%;
      padding: 0.5rem;
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 5px;
      margin-bottom: 15px;
    }
    input[type='email'] {
      width: 80%;
      padding: 0.5rem;
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 5px;
      margin-bottom: 15px;
    }
    textarea {
      width: 80%;
      resize: none;
      padding: 0.5rem;
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 5px;
    }

    input[type='submit'] {
      width: 90%;
      border-radius: 20px;
      padding: 0.5rem;
      background-color: transparent;
      border: 1px solid rgb(29, 31, 31);
      color: #3d3d3d;
    }

    p.error-name {
      position: absolute;
      color: #ff0000;
      font-size: 0.8rem;
      margin: 0;
      transform: translate(-82px, -120px);
    }
    p.error-email {
      position: absolute;
      color: #ff0000;
      font-size: 0.8rem;
      margin: 0;
      transform: translate(-88px, -55px);
    }
    p.error-subject {
      position: absolute;
      color: #ff0000;
      font-size: 0.8rem;
      margin: 0;
      transform: translate(-82px, 8px);
    }
  }
`;
