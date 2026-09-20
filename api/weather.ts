export default async function handler(req: any, res: any) {
  const { city } = req.query;

  if (!city || typeof city !== "string" || !city.trim()) {
    return res.status(400).json({
      error: "Please enter a city.",
    });
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Weather API key is not configured.",
    });
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Unable to fetch weather data.",
      });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({
      error: "Weather service is unavailable.",
    });
  }
}