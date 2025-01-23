import { useState } from 'react';
import { Sun, Droplets, Wind, CloudRain, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/predict', {
        temperature,
        humidity,
        windSpeed,
        rainfall,
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert(error.response?.data?.message || 'Prediction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      icon: Sun,
      label: 'Temperature',
      unit: '°C',
      value: temperature,
      setter: setTemperature,
      color: 'from-orange-400 to-red-400',
    },
    {
      icon: Droplets,
      label: 'Humidity',
      unit: '%',
      value: humidity,
      setter: setHumidity,
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      unit: 'km/h',
      value: windSpeed,
      setter: setWindSpeed,
      color: 'from-teal-400 to-emerald-400',
    },
    {
      icon: CloudRain,
      label: 'Rainfall',
      unit: 'mm',
      value: rainfall,
      setter: setRainfall,
      color: 'from-indigo-400 to-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            Forest Fire Risk Assessment
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor environmental conditions to predict potential fire hazards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {inputFields.map(({ icon: Icon, label, unit, value, setter, color }) => (
            <div
              key={label}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className={`h-2 bg-gradient-to-r ${color}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
                    <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </div>
                  <h2 className="font-semibold text-slate-700 dark:text-slate-300">{label}</h2>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-700 px-4 py-3 pr-12 rounded-lg border-2 border-transparent 
                             focus:border-slate-300 dark:focus:border-slate-500 focus:bg-white dark:focus:bg-slate-600 transition-all duration-300"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    {unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl
                     font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300
                     hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Analyzing...
              </span>
            ) : (
              'Assess Fire Risk'
            )}
          </button>

          {prediction !== null && (
            <div className={`w-full max-w-lg p-6 rounded-xl transition-all duration-500 
                          ${prediction === 1 
                            ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900' 
                            : 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${prediction === 1 
                  ? 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300' 
                  : 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300'}`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg ${prediction === 1 
                    ? 'text-red-700 dark:text-red-300' 
                    : 'text-green-700 dark:text-green-300'}`}>
                    {prediction === 1 ? 'High Fire Risk Detected' : 'Low Fire Risk'}
                  </h3>
                  <p className={`${prediction === 1 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {prediction === 1 
                      ? 'Current conditions suggest an elevated risk of forest fires.' 
                      : 'Environmental conditions indicate minimal fire risk.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}