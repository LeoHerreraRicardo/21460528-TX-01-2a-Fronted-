'use client';

import { useState, useEffect } from 'react';

interface DatosAcceso {
  usuario: string;
  clave: string;
  token: string;
}

export default function Acceder() {
  const [usuario, cambiarUsuario] = useState('');
  const [clave, cambiarClave] = useState('');
  const [tokenCsrf, cambiarTokenCsrf] = useState('');

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/csrf-token');
        const resultado = await respuesta.json();
        cambiarTokenCsrf(resultado.csrfToken);
      } catch (error) {
        console.error('No se pudo obtener el token CSRF');
      }
    };
    obtenerToken();
  }, []);

  const enviarFormulario = async (evento: React.FormEvent) => {
    evento.preventDefault();
    try {
      const datos: DatosAcceso = {
        usuario,
        clave,
        token: tokenCsrf
      };

      const respuesta = await fetch('http://localhost:3000/login', {
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

      alert(resultado.message || 'Sesión iniciada correctamente');
    } catch (error) {
      alert('Error al intentar iniciar sesión');
    }
  };

  return (
    <div>
      <h2>Acceso al sistema</h2>
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
        <input type="hidden" id="token" value={tokenCsrf} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
