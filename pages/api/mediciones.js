import { connectDB, sequelize } from '../../lib/database';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await connectDB();

        const { motorId } = req.query;

        try {
            const [results, metadata] = await sequelize.query('SELECT * FROM medicion_motor WHERE id_motor = ?', {
                replacements: [motorId],
            });
            res.status(200).json({ results: results || [] });  
        } catch (error) {
            console.error('Error fetching mediciones:', error);
            res.status(500).json({ message: 'Error fetching mediciones', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
