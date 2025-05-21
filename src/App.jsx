import { useState, useEffect } from "react";
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoords,
} from "./api/WeatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tải dữ liệu thời tiết khi tìm kiếm
  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);

      // Lấy thời tiết hiện tại
      const weatherData = await getCurrentWeather(city);
      setWeatherData(weatherData);

      // Lấy dữ liệu dự báo
      const forecastData = await getForecast(city);
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Không thể tìm thấy thành phố. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý lấy vị trí hiện tại
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Lấy thời tiết theo tọa độ
            const weatherData = await getWeatherByCoords(latitude, longitude);
            setWeatherData(weatherData);

            // Lấy dữ liệu dự báo theo tên thành phố từ dữ liệu thời tiết
            const forecastData = await getForecast(weatherData.name);
            setForecastData(forecastData);
            setError(null);
          } catch (error) {
            console.error("Error fetching weather by location:", error);
            setError("Không thể lấy dữ liệu thời tiết cho vị trí của bạn.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(
            "Không thể xác định vị trí của bạn. Vui lòng cấp quyền truy cập vị trí."
          );
          setLoading(false);
        }
      );
    } else {
      setError("Trình duyệt của bạn không hỗ trợ định vị.");
    }
  };

  // Mặc định tải dữ liệu cho Hà Nội khi ứng dụng khởi động
  useEffect(() => {
    handleSearch("Hanoi");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Ứng Dụng Thời Tiết
        </h1>

        <SearchBar
          onSearch={handleSearch}
          onGetCurrentLocation={handleGetCurrentLocation}
        />

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {weatherData && !loading && (
          <div>
            <WeatherCard weatherData={weatherData} />
            <WeatherDetails weatherData={weatherData} />
            <Forecast forecastData={forecastData} />
          </div>
        )}

        <footer className="text-center mt-8 text-gray-600">
          <p>Dữ liệu cung cấp bởi OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
