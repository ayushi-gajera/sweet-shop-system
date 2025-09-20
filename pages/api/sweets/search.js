import { connectToDatabase } from '../../../lib/mongodb';
import Sweet from '../../../models/Sweet';

export default async function handler(req, res) {
  await connectToDatabase();
  const { q, category, minPrice, maxPrice } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  const results = await Sweet.find(filter).sort({ name: 1 });
  return res.status(200).json(results);
}
