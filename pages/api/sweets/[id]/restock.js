import { connectToDatabase } from '../../../../lib/mongodb';
import Sweet from '../../../../models/Sweet';
import jwt from 'jsonwebtoken';

function getUserFromReq(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  try { return jwt.verify(token, process.env.JWT_SECRET); } catch(e) { return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectToDatabase();
  const user = getUserFromReq(req);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  if (!user.isAdmin) return res.status(403).json({ message: 'Admin only' });
  const { id } = req.query;
  const { amount } = req.body;
  if (amount == null || Number.isNaN(Number(amount))) return res.status(400).json({ message: 'Invalid amount' });
  const sweet = await Sweet.findById(id);
  if (!sweet) return res.status(404).json({ message: 'Not found' });
  sweet.quantity += Number(amount);
  await sweet.save();
  return res.status(200).json(sweet);
}
