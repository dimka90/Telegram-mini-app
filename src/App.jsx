
// import React, { useEffect } from 'react';

// function App() {
//   useEffect(() => {
//     // Wait for the Telegram Web App SDK to be available
//     const checkSDK = setInterval(() => {
//       if (window.Telegram && window.Telegram.WebApp) {
//         // Initialize the Web App SDK
//         window.Telegram.WebApp.init();

//         // Optionally, you can change the title or other settings
//         window.Telegram.WebApp.setTitle("My Telegram Mini App");

//         // Close the web app (optional)
//         window.Telegram.WebApp.close();

//         // Cleanup the interval after initialization
//         clearInterval(checkSDK);
//         console.log('Telegram Web App Initialized');
//       }
//     }, 100); // Check every 100ms

//     // Cleanup interval if the component is unmounted
//     return () => clearInterval(checkSDK);
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to my Telegram Mini App</h1>
//       <button
//         onClick={() => {
//           // Example: Sending data to Telegram when a button is clicked
//           window.Telegram.WebApp.sendData('Hello from my Mini App!');
//         }}
//       >
//         Send Data to Telegram
//       </button>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [location, setLocation] = useState(null);
//   const [speed, setSpeed] = useState(0);

//   useEffect(() => {
//     const checkSDK = setInterval(() => {
//       if (window.Telegram && window.Telegram.WebApp) {
//         window.Telegram.WebApp.init();
//         clearInterval(checkSDK);
//       }
//     }, 100);

//     return () => clearInterval(checkSDK);
//   }, []);

//   // Function to get the user's location and calculate speed
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude, speed } = position.coords;
//           setLocation({ latitude, longitude });
//           setSpeed(speed);
//         },
//         (error) => {
//           console.log(error);
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to my Telegram Mini App</h1>
//       <button onClick={getLocation}>Track Location and Speed</button>
//       {location && (
//         <div>
//           <p>Latitude: {location.latitude}</p>
//           <p>Longitude: {location.longitude}</p>
//           <p>Speed: {speed} m/s</p>
//         </div>
//       )}
//       <button
//         onClick={() => {
//           window.Telegram.WebApp.sendData('Hello from my Mini App!');
//         }}
//       >
//         Send Data to Telegram
//       </button>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [location, setLocation] = useState(null);
//   const [prevLocation, setPrevLocation] = useState(null);
//   const [prevTimestamp, setPrevTimestamp] = useState(null);
//   const [calculatedSpeed, setCalculatedSpeed] = useState(null);

//   useEffect(() => {
//     // Initialize Telegram Web App SDK if available
//     const checkSDK = setInterval(() => {
//       if (window.Telegram && window.Telegram.WebApp) {
//         window.Telegram.WebApp.init();
//         console.log('Telegram Web App Initialized');
//         clearInterval(checkSDK);
//       }
//     }, 100);
    
//     // Request geolocation updates
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const currentCoords = position.coords;
//           const currentTime = position.timestamp;
//           setLocation(currentCoords);

//           if (prevLocation && prevTimestamp) {
//             // Calculate distance using Haversine formula
//             const distance = calculateDistance(
//               prevLocation.latitude,
//               prevLocation.longitude,
//               currentCoords.latitude,
//               currentCoords.longitude
//             ); // in kilometers

//             // Calculate time difference in hours
//             const timeDiff = (currentTime - prevTimestamp) / (1000 * 3600);

//             // Calculate speed in km/h
//             const speed =
//               timeDiff > 0 ? (distance / timeDiff).toFixed(2) : null;
//             setCalculatedSpeed(speed);
//           }
          
//           // Update previous location and timestamp
//           setPrevLocation(currentCoords);
//           setPrevTimestamp(currentTime);
//         },
//         (error) => console.error('Error getting location:', error),
//         { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
//       );

//       return () => navigator.geolocation.clearWatch(watchId);
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, [prevLocation, prevTimestamp]);

//   // Haversine formula to calculate distance between two points (in km)
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) *
//         Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>Telegram Mini App Speed Tracker</h1>
//       {location ? (
//         <div>
//           <p>Latitude: {location.latitude}</p>
//           <p>Longitude: {location.longitude}</p>
//           <p>
//             Speed: {calculatedSpeed !== null ? `${calculatedSpeed} km/h` : 'Calculating...'}
//           </p>
//         </div>
//       ) : (
//         <p>Fetching location...</p>
//       )}
//       <button
//         onClick={() => {
//           if (window.Telegram && window.Telegram.WebApp) {
//             window.Telegram.WebApp.sendData('Speed data sent from mini app!');
//           }
//         }}
//       >
//         Send Data to Telegram
//       </button>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [speed, setSpeed] = useState(0);
//   const [isTracking, setIsTracking] = useState(false);

//   useEffect(() => {
//     // Initialize Telegram WebApp
//     if (window.Telegram?.WebApp) {
//       const tg = window.Telegram.WebApp;
//       tg.ready();
//       tg.expand();
//     }
//   }, []);

//   useEffect(() => {
//     if (!isTracking) return;

//     let lastPosition = null;
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         if (lastPosition) {
//           // Calculate speed
//           const distance = calculateDistance(
//             lastPosition.coords.latitude,
//             lastPosition.coords.longitude,
//             position.coords.latitude,
//             position.coords.longitude
//           );
//           const timeDiff = (position.timestamp - lastPosition.timestamp) / 1000;
//           const speedKmh = (distance / timeDiff) * 3.6; // Convert m/s to km/h
//           setSpeed(Math.round(speedKmh));
//         }
//         lastPosition = position;
//       },
//       (error) => console.error('Error:', error),
//       { enableHighAccuracy: true }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, [isTracking]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3; // Earth's radius in meters
//     const φ1 = lat1 * Math.PI/180;
//     const φ2 = lat2 * Math.PI/180;
//     const Δφ = (lat2-lat1) * Math.PI/180;
//     const Δλ = (lon2-lon1) * Math.PI/180;

//     const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ/2) * Math.sin(Δλ/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//     return R * c;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-center mb-4">Speed Monitor</h1>
        
//         <div className="text-center mb-6">
//           <div className="text-6xl font-bold text-blue-600">
//             {speed}
//             <span className="text-2xl ml-2">km/h</span>
//           </div>
//         </div>

//         <button
//           onClick={() => setIsTracking(!isTracking)}
//           className={`w-full py-3 rounded-lg font-medium ${
//             isTracking 
//               ? 'bg-red-500 hover:bg-red-600 text-white'
//               : 'bg-blue-500 hover:bg-blue-600 text-white'
//           }`}
//         >
//           {isTracking ? 'Stop' : 'Start'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [speed, setSpeed] = useState(0);
//   const [isTracking, setIsTracking] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Initialize Telegram WebApp
//     if (window.Telegram?.WebApp) {
//       const tg = window.Telegram.WebApp;
//       tg.ready();
//       tg.expand();
//     }
//   }, []);

//   useEffect(() => {
//     if (!isTracking) {
//       setSpeed(0);
//       return;
//     }

//     let lastPosition = null;
//     let timeoutId = null;

//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         setError(''); // Clear any previous errors
        
//         if (lastPosition) {
//           // Get current values
//           const currentTime = position.timestamp;
//           const lastTime = lastPosition.timestamp;
          
//           // Calculate time difference in seconds
//           const timeDiff = (currentTime - lastTime) / 1000;
          
//           // Only calculate speed if time difference is reasonable (between 0.1 and 10 seconds)
//           if (timeDiff > 0.1 && timeDiff < 10) {
//             const distance = calculateDistance(
//               lastPosition.coords.latitude,
//               lastPosition.coords.longitude,
//               position.coords.latitude,
//               position.coords.longitude
//             );

//             // Only update speed if we've moved more than 1 meter
//             if (distance > 1) {
//               const speedMps = distance / timeDiff;
//               const speedKmh = (speedMps * 3.6); // Convert m/s to km/h
              
//               // Round to 1 decimal place and ensure it's not NaN
//               const finalSpeed = Math.round(speedKmh * 10) / 10;
//               setSpeed(isNaN(finalSpeed) ? 0 : finalSpeed);
//             }
//           }
//         }

//         lastPosition = {
//           coords: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           },
//           timestamp: position.timestamp
//         };

//         // Reset timeout
//         if (timeoutId) clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => setSpeed(0), 3000); // Reset to 0 if no movement for 3 seconds
//       },
//       (error) => {
//         console.error('Geolocation error:', error);
//         setError(getLocationErrorMessage(error));
//         setIsTracking(false);
//       },
//       { 
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//       }
//     );

//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [isTracking]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     try {
//       const R = 6371e3; // Earth's radius in meters
//       const φ1 = lat1 * Math.PI/180;
//       const φ2 = lat2 * Math.PI/180;
//       const Δφ = (lat2-lat1) * Math.PI/180;
//       const Δλ = (lon2-lon1) * Math.PI/180;

//       const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//                 Math.cos(φ1) * Math.cos(φ2) *
//                 Math.sin(Δλ/2) * Math.sin(Δλ/2);
//       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//       return R * c;
//     } catch (err) {
//       console.error('Distance calculation error:', err);
//       return 0;
//     }
//   };

//   const getLocationErrorMessage = (error) => {
//     switch(error.code) {
//       case 1:
//         return 'Please allow location access';
//       case 2:
//         return 'Location unavailable';
//       case 3:
//         return 'Location request timeout';
//       default:
//         return 'Error getting location';
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
//         <h1 className="text-2xl font-bold text-center mb-4">Speed Monitor</h1>
        
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
//             {error}
//           </div>
//         )}

//         <div className="text-center mb-6">
//           <div className="text-6xl font-bold text-blue-600">
//             {speed}
//             <span className="text-2xl ml-2">km/h</span>
//           </div>
//         </div>

//         <button
//           onClick={() => setIsTracking(!isTracking)}
//           className={`w-full py-3 rounded-lg font-medium ${
//             isTracking 
//               ? 'bg-red-500 hover:bg-red-600 text-white'
//               : 'bg-blue-500 hover:bg-blue-600 text-white'
//           }`}
//         >
//           {isTracking ? 'Stop' : 'Start'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';

const App = () => {
  const [speed, setSpeed] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState(''); // For debugging info

  useEffect(() => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
    }
  }, []);

  useEffect(() => {
    if (!isTracking) {
      setSpeed(0);
      return;
    }

    setDebug('Starting tracking...');
    let lastPosition = null;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setError('');
        const currentTime = new Date().getTime();
        
        if (lastPosition) {
          // Get coordinates
          const lat1 = lastPosition.coords.latitude;
          const lon1 = lastPosition.coords.longitude;
          const lat2 = position.coords.latitude;
          const lon2 = position.coords.longitude;
          
          // Calculate time difference in seconds
          const timeDiff = (currentTime - lastPosition.timestamp) / 1000;
          
          // Calculate distance
          const distance = calculateDistance(lat1, lon1, lat2, lon2);
          
          // Update debug info
          setDebug(`
            Distance: ${distance.toFixed(2)}m
            Time: ${timeDiff.toFixed(2)}s
            Coords: ${lat2.toFixed(6)}, ${lon2.toFixed(6)}
          `);

          // Only calculate speed if we have meaningful movement and time
          if (timeDiff > 0 && distance > 0) {
            // Calculate speed in km/h
            const speedMps = distance / timeDiff;
            const speedKmh = speedMps * 3.6;
            
            // Apply some smoothing and rounding
            if (speedKmh < 1) {
              setSpeed(0);
            } else {
              setSpeed(Math.round(speedKmh));
            }
          }
        }

        lastPosition = {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          timestamp: currentTime
        };
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError(`Location error: ${err.message}`);
        setDebug(`Error code: ${err.code}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isTracking]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Speed Monitor</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
            {error}
          </div>
        )}

        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-blue-600">
            {speed}
            <span className="text-2xl ml-2">km/h</span>
          </div>
        </div>

        <button
          onClick={() => setIsTracking(!isTracking)}
          className={`w-full py-3 rounded-lg font-medium ${
            isTracking 
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isTracking ? 'Stop' : 'Start'}
        </button>

        {/* Debug information */}
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs font-mono whitespace-pre-wrap">
          {debug}
        </div>
      </div>
    </div>
  );
};

export default App;