async function getWeather(lat, lng, dateTaken) {
  if (!lat || !lng) return null;
  
  try {
    let data;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // Try historical if date is provided
    if (dateTaken) {
      const ts = Math.floor(new Date(dateTaken).getTime() / 1000);
      const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lng}&dt=${ts}&appid=${apiKey}&units=metric&lang=en`;
      const res = await fetch(url);
      if (res.ok) {
        const histData = await res.json();
        // The timemachine returns hourly data, use the current one
        data = histData.current || histData.data?.[0];
      }
    }

    // Fallback to current weather if historical failed or no date provided
    if (!data) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=en`;
      const res = await fetch(url);
      if (!res.ok) return null;
      data = await res.json();
    }

    // Common response mapping format from current and onecall is slightly varied
    const weatherArray = data.weather || [];
    const temp = data.temp ?? data.main?.temp ?? null;

    return {
      summary: weatherArray[0]?.description || null,
      temperature: temp,
      icon: weatherArray[0]?.icon || null
    };
  } catch {
    return null;
  }
}

module.exports = { getWeather };
