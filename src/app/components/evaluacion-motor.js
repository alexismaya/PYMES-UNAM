"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EvaluacionMotor() {
    const [motores, setMotores] = useState([]);
    const [mediciones, setMediciones] = useState([]);
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [resultadosEvaluacion, setResultadosEvaluacion] = useState(null);


    useEffect(() => {
        const fetchMotores = async () => {
            try {
                const responseMotores = await axios.get('/api/motores');
                setMotores(responseMotores.data.results);
            } catch (error) {
                console.error('Error fetching motores:', error);
            }
        };

        fetchMotores();
    }, []);

    const handleMotorChange = async (event) => {
        const selectedMotorId = event.target.options[event.target.selectedIndex].dataset.id;
        setSelectedMotor(selectedMotorId);
        console.log('Selected Motor ID:', selectedMotorId);  // Debugging line

        try {
            const responseMediciones = await axios.get(`/api/mediciones?motorId=${selectedMotorId}`);
            console.log('Response Mediciones:', responseMediciones.data.results);  
            setMediciones(responseMediciones.data.results); 
        } catch (error) {
            console.error('Error fetching mediciones:', error);
            setMediciones([]);
        }
    };

    const handleSubmit = async () => {
        const data = {
            motor: document.querySelector("#motor-eval option:checked").dataset.id,
            medicion: document.getElementById("medicion-eval").value
        };
    
        try {
            const response = await axios.post('/api/evaluarMotor', data);
        } catch (error) {
            console.error('Error enviando datos:', error);
        }

        try {
            const responseEvaluacion = await axios.get('/api/evaluacion');
            setResultadosEvaluacion(responseEvaluacion.data.results)
        } catch (error) {
            console.log(error)
        }


    };
    

    return (
        <div>
            <div>
                <label>Seleccione el motor: </label>
                <select id="motor-eval" name="motor-eval" onChange={handleMotorChange}>
                    <option value="">Seleccione un motor</option>
                    {motores.map((motor) => (
                        <option key={motor.id} value={motor.nombre} data-id={motor.id}>
                            {motor.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Seleccione la medición para evaluación: </label>
                <select id="medicion-eval">
                    <option value="">Seleccione una medición</option>
                    {Array.isArray(mediciones) && mediciones.map((medicion) => (
                        <option key={medicion.id} value={medicion.value}>
                            {medicion.id}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleSubmit}>Evaluar</button>

            {resultadosEvaluacion && (
            <div>
                <h2>Resultados de la evaluación</h2>
                <ul>
                    <li>Eficiencia Calculada: {resultadosEvaluacion.eficiencia_calculada}</li>
                    <li>Diferencia de Eficiencia Nominal: {resultadosEvaluacion.dif_eficiencia_nominal}</li>
                    <li>Factor de Carga: {resultadosEvaluacion.factor_carga}</li>
                    <li>Potencia de Salida: {resultadosEvaluacion.potencia_salida}</li>
                    <li>Potencia de Entrada: {resultadosEvaluacion.potencia_entrada}</li>
                    <li>Perdidas: {resultadosEvaluacion.perdidas}</li>
                    <li>Energía Operacional: {resultadosEvaluacion.energia_oper}</li>
                    <li>Energía Perdida: {resultadosEvaluacion.energia_perdidas}</li>
                    <li>Costo Operacional: {resultadosEvaluacion.costo_oper}</li>
                    <li>Costo de Perdidas: {resultadosEvaluacion.costo_perdidas}</li>
                </ul>
            </div>
            )}


        </div>
    );
}

