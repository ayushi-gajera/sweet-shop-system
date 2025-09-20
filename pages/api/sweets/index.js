import { connectToDatabase } from '../../../lib/mongodb';
import Sweet from '../../../models/Sweet';
import jwt from 'jsonwebtoken';

async function getUserFromReq(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  try { return jwt.verify(token, process.env.JWT_SECRET); } catch (e) { return null; }
}

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'GET') {
    const sweets = await Sweet.find().sort({ name: 1 });
    return res.status(200).json(sweets);
  }
  if (req.method === 'POST') {
    const user = await getUserFromReq(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const { name, category, price, quantity } = req.body;
    if (!name || !category || price == null || quantity == null) return res.status(400).json({ message: 'Missing fields' });
    const s = new Sweet({ name, category, price, quantity });
    await s.save();
    return res.status(201).json(s);
  }
  return res.status(405).end();
}
