import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather, sys, wind } = weatherData;
  const { temp, feels_like, humidity } = main;
  const { speed } = wind;
  const { country } = sys;
  const { icon, description } = weather[0];

  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {name}, {country}
            </h2>
            <p className="text-lg">{formatDate()}</p>
          </div>
          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              className="w-24 h-24"
            />
            <p className="text-xl capitalize">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-6xl font-bold">{Math.round(temp)}°C</div>
          <div className="text-right">
            <p className="flex items-center justify-end text-xl">
              <FaTemperatureHigh className="mr-2" /> Cảm giác như:{" "}
              {Math.round(feels_like)}°C
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <WiHumidity className="text-3xl text-blue-500 mr-2" />
          <div>
            <p className="text-gray-500">Độ ẩm</p>
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaWind className="text-2xl text-blue-500 mr-2" />
          <div>
            <p className="text-gray-500">Tốc độ gió</p>
            <p className="text-xl font-semibold">{speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
