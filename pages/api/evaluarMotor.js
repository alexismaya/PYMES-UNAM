import { connectDB, sequelize } from '../../lib/database';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        await connectDB();

        const {
            motor,
            medicion
        } = req.body;

        try {
            const [result, metadata] = await sequelize.query(`
                CALL generar_informe(?,?)
            `, {
                replacements: [
                    motor,
                    medicion
                ]
            });

            res.status(500).json({ message: 'Exito evaluando el motor' })
        
        } catch (error) {
            console.error('Error evaluando el motor:', error);
            res.status(500).json({ message: 'Error evaluando el motor', error: error.message });
        }
        

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}