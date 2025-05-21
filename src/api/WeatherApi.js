import axios from 'axios';

// Đăng ký API key tại OpenWeatherMap: https://openweathermap.org/api
const API_KEY = "acc86afe237b3afd703d3307a928f219";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Tạo instance axios với base URL
const weatherApi = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: "metric", // Độ C
        lang: "vi" // Tiếng Việt
    }
});

// Lấy dữ liệu thời tiết hiện tại theo tên thành phố
export const getCurrentWeather = async (city) => {
    try {
        const response = await weatherApi.get('/weather', {
            params: { q: city }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy dữ liệu dự báo 5 ngày
export const getForecast = async (city) => {
    try {
        const response = await weatherApi.get('/forecast', {
            params: { q: city }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Lấy thời tiết theo vị trí địa lý (latitude, longitude)
export const getWeatherByCoords = async (lat, lon) => {
    try {
        const response = await weatherApi.get('/weather', {
            params: { lat, lon }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default weatherApi;