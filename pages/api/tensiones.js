import { connectDB, sequelize } from '../../lib/database';

export default async function handler(req, res) {
  await connectDB();

  // Aquí puedes ejecutar consultas usando Sequelize
  const [results, metadata] = await sequelize.query("SELECT * FROM tension_motor");

  res.status(200).json({ results });
}