import { sideBarButton } from "./Buttons";
import WeatherChatLogo from "./WeatherChatLogo";
function SideBar() {
    // fetch chat history from local
    const example = [
        {
            "chatId": "ad4345",
            "title": "Nagpur Weather Report",
            "data": [
                {
                    "isAgent": false,
                    "time": "2:23PM",
                    "isSeen": true,
                    "message": "Hello, What's the weather for Nagpur"
                },
                {
                    "isAgent": true,
                    "time": "2:23PM",
                    "isSeen": true,
                    "message": "Hello, today it can rain in nagpur\n make sure you take umbrella with you!"
                },
                {
                    "isAgent": false,
                    "time": "2:23PM",
                    "isSeen": true,
                    "message": "Hello, today it can rain in nagpur\n make sure you take umbrella with you!"
                }
            ]}
    ]
    return (
        <>
        <div className="lg:w-1/5 sm:w-1 bg-green-500 h-screen">
            <div className="w-full p-2">
                <WeatherChatLogo/>
            </div>
        </div>
        </>
    );
}

export default SideBar;