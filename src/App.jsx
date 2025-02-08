import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/HeaderSection/Header';
import Feed from './components/feedSection/Feed';
import Search from './components/searchSection/Search';
import VideoDetails from './components/videoSection/VideoDetails';
import { AppContext } from './useContext/UseContextApi';
import { ThemeProvider } from './useContext/useTheme';

function App() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <>
      {online ? (
        <AppContext>
          <ThemeProvider>
            <div className="flex flex-col w-full">
              <BrowserRouter basename='/youtube'>
                <Routes>
                  <Route path="/" element={<Feed online={online} />} />
                  <Route path="/search/:searchQuery" element={<Search online={online} />} />
                  <Route path="/video/:categoryId/:videoId" element={<VideoDetails online={online}/>} />
                </Routes>
              </BrowserRouter>
            </div>
          </ThemeProvider>
        </AppContext>
      ) : (
        <div>
         
         <AppContext>
          <ThemeProvider>
            <div className="flex flex-col w-full">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Feed online={online} />} />
                  
                </Routes>
              </BrowserRouter>
            </div>
          </ThemeProvider>
        </AppContext>
          
        </div>
      )}
    </>
  );
}

export default App;
