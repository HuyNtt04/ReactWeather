import { WiSunrise, WiSunset, WiStrongWind, WiBarometer } from "react-icons/wi";
import { FaEye } from "react-icons/fa";

const WeatherDetails = ({ WeatherData }) => {
  if (!WeatherData) return null;

  const { main, wind, sys, visibility } = WeatherData;
  const { pressure } = main;
  const { deg } = wind;

  //Chuyen doi timestamp thanh thoi gian
  const FormatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //Xac dinh huong gio
  const getWindDirection = (deg) => {
    const directions = [
      "Bắc",
      "Đông Bắc",
      "Đông",
      "Đông Nam",
      "Nam",
      "Tây Nam",
      "Tây",
      "Tây Bắc",
    ];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">
        Chi tiết thời tiết
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex item-center">
          <WiSunrise className="text-4xl text-yellow-500 mr-2" />
          <div>
            <p className="text-gray-500">Bình minh</p>
            <p className="text-lg font-semibold">{FormatTime(sys.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiSunset className="text-4xl text-orange-500 mr-2" />
          <div>
            <p className="text-gray-500">Hoàng hôn</p>
            <p className="text-lg font-semibold">{FormatTime(sys.sunset)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiStrongWind className="text-4xl text-blue-500 mr-2" />
          <div>
            <p className="text-gray-500">Hướng gió</p>
            <p className="text-lg font-semibold">
              {getWindDirection(deg)} ({deg}°)
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <WiBarometer className="text-4xl text-purple-500 -2" />
          <div>
            <p className="text-gray-500">Áp suất</p>
            <p className="text-lg font-semibold">{pressure} hPa</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaEye className="text-2xl text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500">Tầm nhìn</p>
            <p className="text-lg font-semibold">{visibility / 1000} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherDetails;
