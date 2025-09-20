import { connectToDatabase } from '../../../lib/mongodb';
import Sweet from '../../../models/Sweet';
import jwt from 'jsonwebtoken';

function getUserFromReq(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  try { return jwt.verify(token, process.env.JWT_SECRET); } catch(e) { return null; }
}

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;
  if (req.method === 'GET') {
    const s = await Sweet.findById(id);
    if (!s) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(s);
  }
  if (req.method === 'PUT') {
    const user = getUserFromReq(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const payload = req.body;
    const updated = await Sweet.findByIdAndUpdate(id, payload, { new: true });
    return res.status(200).json(updated);
  }
  if (req.method === 'DELETE') {
    const user = getUserFromReq(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (!user.isAdmin) return res.status(403).json({ message: 'Admin only' });
    await Sweet.findByIdAndDelete(id);
    return res.status(204).end();
  }
  return res.status(405).end();
}
