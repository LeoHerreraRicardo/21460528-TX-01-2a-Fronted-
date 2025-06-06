'use client';

import { useState, useEffect } from 'react';

interface SolicitudRegistro {
  usuario: string;
  clave: string;
  token: string;
}

export default function CrearCuenta() {
  const [usuario, cambiarUsuario] = useState('');
  const [clave, cambiarClave] = useState('');
  const [confirmarClave, cambiarConfirmarClave] = useState('');
  const [tokenCsrf, cambiarTokenCsrf] = useState('');

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/csrf-token');
        const resultado = await respuesta.json();
        cambiarTokenCsrf(resultado.csrfToken);
      } catch (err) {
        console.error('No se pudo obtener el token CSRF:', err);
      }
    };
    obtenerToken();
  }, []);

  const enviarFormulario = async (evento: React.FormEvent) => {
    evento.preventDefault();

    if (clave !== confirmarClave) {
      alert('Las contraseñas ingresadas no coinciden.');
      return;
    }

    const datos: SolicitudRegistro = {
      usuario,
      clave,
      token: tokenCsrf
    };

    try {
      const respuesta = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: datos.usuario,
          password: datos.clave,
          csrfToken: datos.token
        })
      });

      const resultado = await respuesta.json();
      if (resultado.error) {
        alert(resultado.error);
        return;
      }

      alert(resultado.message || 'Registro completado correctamente');
    } catch (error) {
      console.error('Fallo al registrar:', error);
      alert('Ocurrió un problema durante el registro');
    }
  };

  return (
    <div>
      <h2>Crear cuenta nueva</h2>
      <form onSubmit={enviarFormulario}>
        <div>
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => cambiarUsuario(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="clave">Contraseña:</label>
          <input
            type="password"
            id="clave"
            value={clave}
            onChange={(e) => cambiarClave(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmarClave">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmarClave"
            value={confirmarClave}
            onChange={(e) => cambiarConfirmarClave(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
