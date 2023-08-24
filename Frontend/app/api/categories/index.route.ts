import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8081/api/v1/categories');
    const categories = response.data;
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Unable to fetch categories' });
  }
};
