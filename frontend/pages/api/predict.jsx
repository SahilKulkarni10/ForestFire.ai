export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { temperature, humidity, windSpeed, rainfall } = req.body;

    try {
      const backendURL = req.headers.host.includes('localhost')
        ? 'http://localhost:5001/predict' 
        : 'https://forestfire-ai.onrender.com/predict'; 

      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ temperature, humidity, windSpeed, rainfall }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Prediction failed:', error);
      res.status(500).json({ message: error.message || 'Prediction failed. Please try again.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}