import { useAppContext } from "../../useContext/UseContextApi";
import { useTheme } from "../../useContext/useTheme";
import Header from "../HeaderSection/Header";
import Sidebar from "../sidebarSection/Sidebar";
import VideosList from "../videoSection/VideosList";
import offline from '../../assets/noo.png'
import offline1 from '../../assets/offline2.png'

const Feed = ({online}) => {
  const { loading, videoData, mobilemenu } = useAppContext();
  const { isDarkMode } = useTheme();

  

  return (
    <div>
      <Header online={online}/>
      <div
        className={`flex flex-row h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {/* Sidebar */}
        <div
          className={`fixed mt-0 h-full transition-transform transform ${
            mobilemenu ? "translate-x-0" : "-translate-x-full"
          } z-40 md:translate-x-0 md:static ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
          }  `}
        >
          {!online?"":
          <Sidebar />
               }
        </div>
       

        {/* Main Content */}
        <div className="w-full grow overflow-y-auto">
          {/* offline logic */}
          {!online ? <div className="h-screen flex items-center justify-center flex-col">
            {!isDarkMode ?<img src={offline} width={130} alt="" 
            className="text-red-500"/>:<img src={offline1} width={130}/>}
            <h1 className="mini:text-[15px] text-xl md:text-2xl lg:text-2xl" id="no">No internet, Please connect internet</h1>
          </div>:""}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tablet:grid-cols-2 gap-4 p-5">
            {!loading &&
              videoData.map((item, index) => (
                <div key={index}>
                  <VideosList video={item} />
                </div>
              ))}

              
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Feed;
