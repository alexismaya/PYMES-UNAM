import { connectDB, sequelize } from '../../lib/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const {
      nombre,
      capacidad,
      tension,
      velocidad,
      eficiencia,
      tipoEficiencia,
      frecuencia,
      potencia,
      aniosOper,
      numRebobinados,
      hrsOper,
      diasOper,
    } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (
      nombre === undefined ||
      capacidad === undefined ||
      tension === undefined ||
      velocidad === undefined ||
      eficiencia === undefined ||
      tipoEficiencia === undefined ||
      frecuencia === undefined ||
      potencia === undefined ||
      aniosOper === undefined ||
      numRebobinados === undefined ||
      hrsOper === undefined ||
      diasOper === undefined
    ) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    try {
      // Aquí se realiza la consulta para insertar los datos en la base de datos
      const [result, metadata] = await sequelize.query(`
        CALL insertar_motor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1.5)
      `, {
        replacements: [
          nombre, 
          capacidad, 
          tension, 
          velocidad, 
          eficiencia, 
          tipoEficiencia, 
          frecuencia, 
          potencia, 
          aniosOper, 
          numRebobinados, 
          hrsOper, 
          diasOper
        ]
      });

      res.status(200).json({ message: 'Datos guardados correctamente' });
    } catch (error) {
      console.error('Error guardando los datos:', error);
      res.status(500).json({ message: 'Error guardando los datos', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
