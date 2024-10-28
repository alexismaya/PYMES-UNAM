"use client"; // Marca el componente como componente del cliente

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DatosMedicion() {

    const [motores, setMotores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const responseMotores = await axios.get('/api/motores');
                setMotores(responseMotores.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const handleSubmit = async () => {

        const data = {
            motor: document.querySelector('#motor option:checked').dataset.id,
            tension_l1_l2: document.getElementById('tension_l1_l2').value,
            tension_l2_l3: document.getElementById('tension_l2_l3').value,
            tension_l3_l1: document.getElementById('tension_l3_l1').value,
            corriente_l1: document.getElementById('corriente_l1').value,
            corriente_l2: document.getElementById('corriente_l2').value,
            corriente_l3: document.getElementById('corriente_l3').value
        };

        try {
            const response = await axios.post('/api/guardarMedicion', data);
            console.log('Datos enviados con éxito:', response.data);
        } catch (error) {
            console.error('Error enviando datos:', error);
        }

    };

    return(
        <div>

            <div>
                <label>Seleccione el motor: </label>
                <select id="motor" name='motor'>
                    {motores.map((motor) => (
                        <option key={motor.id} value={motor.nombre} data-id={motor.id}>
                            {motor.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Tensión L1 - L2: </label>
                <input id='tension_l1_l2' name='tension_l1_l2' />
            </div>

            <div>
                <label>Tensión L2 - L3: </label>
                <input id='tension_l2_l3' name='tension_l2_l3' />
            </div>

            <div>
                <label>Tensión L3 - L1: </label>
                <input id='tension_l3_l1' name='tension_l3_l1' />
            </div>

            <div>
                <label>Corriente L1: </label>
                <input id='corriente_l1' name='corriente_l1' />
            </div>

            <div>
                <label>Corriente L2: </label>
                <input id='corriente_l2' name='corriente_l2' />
            </div>

            <div>
                <label>Corriente L3: </label>
                <input id='corriente_l3' name='corriente_l3' />
            </div>

            <button onClick={handleSubmit}>Enviar</button>
            
        </div>
        

    );

}