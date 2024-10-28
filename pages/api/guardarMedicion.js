import { connectDB, sequelize } from '../../lib/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const {
      motor,
      tension_l1_l2,
      tension_l2_l3,
      tension_l3_l1,
      corriente_l1,
      corriente_l2,
      corriente_l3,
    } = req.body;

    try {
      // Aquí se realiza la consulta para insertar los datos en la base de datos
      const [result, metadata] = await sequelize.query(`
        CALL insertar_medicion_motor(?, ?, ?, ?, ?, ?, ?)
      `, {
        replacements: [
          motor, 
          tension_l1_l2, 
          tension_l2_l3, 
          tension_l3_l1, 
          corriente_l1, 
          corriente_l2, 
          corriente_l3
        ]
      });

      res.status(200).json({ message: 'Datos de medición guardados correctamente', result });
    } catch (error) {
      console.error('Error guardando los datos de medición:', error);
      res.status(500).json({ message: 'Error guardando los datos de medición', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
