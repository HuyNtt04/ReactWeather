const Forecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  // Lọc dữ liệu để chỉ hiển thị dự báo cho mỗi ngày (lấy thời điểm 12 giờ trưa)
  const getDailyForecast = () => {
    const dailyData = [];
    const today = new Date().setHours(0, 0, 0, 0);

    // Nhóm dữ liệu theo ngày
    const groupedByDay = forecastData.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // Lấy dữ liệu cho 5 ngày tiếp theo, bỏ qua ngày hiện tại
    Object.entries(groupedByDay).forEach(([date, items]) => {
      if (Number(date) > today) {
        // Tìm mục gần với 12 giờ trưa nhất
        const noonItem = items.reduce((closest, item) => {
          const itemHour = new Date(item.dt * 1000).getHours();
          const closestHour = new Date(closest.dt * 1000).getHours();
          return Math.abs(itemHour - 12) < Math.abs(closestHour - 12)
            ? item
            : closest;
        }, items[0]);

        dailyData.push(noonItem);
      }
    });

    return dailyData.slice(0, 5); // Chỉ lấy 5 ngày
  };

  const dailyForecast = getDailyForecast();

  // Format date
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-4 text-gray-700">
        Dự báo 5 ngày tới
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecast.map((item, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="font-semibold text-blue-700">{formatDay(item.dt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-16 h-16 mx-auto"
            />
            <p className="capitalize text-sm">{item.weather[0].description}</p>
            <div className="flex justify-center gap-2 mt-2">
              <p className="font-bold">{Math.round(item.main.temp_max)}°</p>
              <p className="text-gray-500">{Math.round(item.main.temp_min)}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
