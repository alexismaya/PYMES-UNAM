"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MotoresRecientes() {

    const [motores, setMotores] = useState([]);

    useEffect(() => {
        const fetchMotores = async () => {
            try {
                const responseMotores = await axios.get('/api/motoresRecientes');
                const data = responseMotores.data.results;

                // Si la respuesta es un objeto único, lo convertimos en un arreglo
                setMotores(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Error fetching motores:', error);
            }
        };

        fetchMotores();
    }, []);

    return (
        <div>
            <h1>Últimos Motores Agregados</h1>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID Motor</th>
                        <th>Nombre Motor</th>
                        <th>Capacidad</th>
                        <th>Tensión</th>
                        <th>Velocidad</th>
                        <th>Eficiencia</th>
                        <th>Tipo de Eficiencia</th>
                        <th>Frecuencia</th>
                        <th>Factor de Potencia</th>
                        <th>Años de Operación</th>
                        <th>Rebobinados</th>
                        <th>Horas Operación Diaria</th>
                        <th>Días Operación Anual</th>
                        <th>Costo por KWh</th>
                    </tr>
                </thead>
                <tbody>
                    {motores.length > 0 ? (
                        motores.map((motor) => (
                            <tr key={motor.ID_Motor}>
                                <td>{motor.ID_Motor}</td>
                                <td>{motor.Nombre_Motor}</td>
                                <td>{motor.Capacidad}</td>
                                <td>{motor.Tension}</td>
                                <td>{motor.Velocidad}</td>
                                <td>{motor.Eficiencia}</td>
                                <td>{motor.Tipo_Eficiencia}</td>
                                <td>{motor.Frecuencia}</td>
                                <td>{motor.Factor_Potencia}</td>
                                <td>{motor.Anios_Operacion}</td>
                                <td>{motor.Rebobinados}</td>
                                <td>{motor.Horas_Operacion_Diaria}</td>
                                <td>{motor.Dias_Operacion_Anual}</td>
                                <td>{motor.Costo_KWh}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14">No hay datos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
