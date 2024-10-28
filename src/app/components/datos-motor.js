"use client"; // Marca el componente como componente del cliente

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Datosmotor() {
  const [capacidades, setCapacidades] = useState([]);
  const [tensiones, setTensiones] = useState([]);
  const [tiposEficiencia, setTipoEficiencias] = useState([]);
  const [frecuencias, setFrecuencias] = useState([]);
  const [aniosOperOpciones, setAniosOper] = useState([]);
  const [numRebobinadoOpciones, setNumRebobinados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCapacidades = await axios.get('/api/capacidades');
        setCapacidades(responseCapacidades.data.results);

        const responseTensiones = await axios.get('/api/tensiones');
        setTensiones(responseTensiones.data.results);

        const responseTiposEficiencia = await axios.get('/api/tiposEficiencia');
        setTipoEficiencias(responseTiposEficiencia.data.results);

        const responseFrecuencias = await axios.get('/api/frecuencias');
        setFrecuencias(responseFrecuencias.data.results);

        const responseAniosOper = await axios.get('/api/aniosOper');
        setAniosOper(responseAniosOper.data.results);

        const responseNumRebobinados = await axios.get('/api/numRebobinados');
        setNumRebobinados(responseNumRebobinados.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const data = {
      nombre: document.getElementById('motor_nombre').value,
      capacidad: document.querySelector('#capacidad option:checked').dataset.id,
      tension: document.querySelector('#tension option:checked').dataset.id,
      velocidad: document.getElementById('motor_velocidad').value,
      eficiencia: document.getElementById('motor_eficiencia').value,
      tipoEficiencia: document.querySelector('select[name="tipoEficiencia"] option:checked').dataset.id,
      frecuencia: document.querySelector('#motor_frecuencia option:checked').dataset.id,
      potencia: document.getElementById('motor_Potencia').value,
      aniosOper: document.querySelector('#motor_anios_oper option:checked').dataset.id,
      numRebobinados: document.querySelector('#num_rebobinados option:checked').dataset.id,
      hrsOper: document.getElementById('hrs_oper').value,
      diasOper: document.getElementById('dias_oper').value
    };

    try {
      const response = await axios.post('/api/guardarMotor', data);
      console.log('Datos enviados con éxito:', response.data);
    } catch (error) {
      console.error('Error enviando datos:', error);
    }
  };

  return (
    <div className="motor-inputs">
      <div>
        <label htmlFor="motor_nombre">Nombre del motor:</label>
        <input id="motor_nombre" name="motor_nombre" type="text" />
      </div>

      <div>
        <label htmlFor="capacidad">Capacidad:</label>
        <select id="capacidad" name="capacidad">
          {capacidades.map((capacidad) => (
            <option key={capacidad.id} value={capacidad.capacidad} data-id={capacidad.id}>
              {capacidad.capacidad} HP
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tension">Tensión:</label>
        <select id="tension" name="tension">
          {tensiones.map((tension) => (
            <option key={tension.id} value={tension.tension} data-id={tension.id}>
              {tension.tension} V
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="motor_velocidad">Velocidad: </label>
        <input id="motor_velocidad" name="motor_velocidad" type="text" />
      </div>

      <div>
        <label htmlFor="motor_eficiencia">Eficiencia: </label>
        <input id="motor_eficiencia" name="motor_eficiencia" type="text" />
      </div>

      <div>
        <label htmlFor="tipoEficiencia">Tipo de Eficiencia: </label>
        <select name="tipoEficiencia">
          {tiposEficiencia.map((tipoEficiencia) => (
            <option key={tipoEficiencia.id} value={tipoEficiencia.nombre} data-id={tipoEficiencia.id}>
              {tipoEficiencia.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="motor_frecuencia">Frecuencia: </label>
        <select id="motor_frecuencia" name="motor_frecuencia">
          {frecuencias.map((frecuencia) => (
            <option key={frecuencia.id} value={frecuencia.frecuencia} data-id={frecuencia.id}>
              {frecuencia.frecuencia} Hz
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="motor_Potencia">Factor de Potencia: </label>
        <input id="motor_Potencia" type="text" />
      </div>

      <div>
        <label htmlFor="motor_anios_oper">Años de operación: </label>
        <select id="motor_anios_oper" name="motor_anios_oper">
          {aniosOperOpciones.map((anios_oper) => (
            <option key={anios_oper.id} value={anios_oper.anios_oper} data-id={anios_oper.id}>
              {anios_oper.anios_oper}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="num_rebobinados">Número de rebobinados: </label>
        <select id="num_rebobinados" name="num_rebobinados">
          {numRebobinadoOpciones.map((numRebobinados) => (
            <option key={numRebobinados.id} value={numRebobinados.num_rebobinado} data-id={numRebobinados.id}>
              {numRebobinados.num_rebobinado}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="hrs_oper">Horas de operación al día: </label>
        <input id="hrs_oper" type="text" />
      </div>

      <div>
        <label htmlFor="dias_oper">Días de operación al año: </label>
        <input id="dias_oper" type="text" />
      </div>

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
