import { BsStars } from "react-icons/bs";
import Post from "../Post";
import TweetBox from "./TweetBox";
import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d]`,
  //   sticky to make sure it stays on top of the page
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

// const tweets = [
//   {
//     displayName: "John Doe",
//     userName: "0x0c5e1119021f90C5981E40aB962b0704f8A6B1b4",
//     avatar:
//       "https://i0.wp.com/ramenswag.com/wp-content/uploads/2018/07/madara-uchiha-wallpaper-iphone-1.jpg?resize=1060%2C595&ssl=1",
//     text: "gm",
//     isProfileImageNft: false,
//     timestamp: "2022-02-14T12:00:00.000Z",
//   },
//   {
//     displayName: "John Doe",
//     userName: "0x0c5e1119021f90C5981E40aB962b0704f8A6B1b4",
//     avatar:
//       "https://i0.wp.com/ramenswag.com/wp-content/uploads/2018/07/madara-uchiha-wallpaper-iphone-1.jpg?resize=1060%2C595&ssl=1",
//     text: "gm",
//     isProfileImageNft: false,
//     timestamp: "2022-02-14T12:00:00",
//   },
//   {
//     displayName: "John Doe",
//     userName: "0x0c5e1119021f90C5981E40aB962b0704f8A6B1b4",
//     avatar:
//       "https://i0.wp.com/ramenswag.com/wp-content/uploads/2018/07/madara-uchiha-wallpaper-iphone-1.jpg?resize=1060%2C595&ssl=1",
//     text: "gm",
//     isProfileImageNft: false,
//     timestamp: "2022-02-14T12:00:00",
//   },
//   {
//     displayName: "John Doe",
//     userName: "0x0c5e1119021f90C5981E40aB962b0704f8A6B1b4",
//     avatar:
//       "https://i0.wp.com/ramenswag.com/wp-content/uploads/2018/07/madara-uchiha-wallpaper-iphone-1.jpg?resize=1060%2C595&ssl=1",
//     text: "gm",
//     isProfileImageNft: false,
//     timestamp: "2022-02-14T12:00:00",
//   },
// ];

function Feed() {
  const { tweets } = useContext(TwitterContext);

  return (
    <div className={`${style.wrapper} no-scrollbar`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>

      <TweetBox />

      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={
            tweet.author.name === 'Unnamed'
              ? `${tweet.author.walletAddress.slice(
                  0,
                  4,
                )}...${tweet.author.walletAddress.slice(41)}`
              : tweet.author.name
          }
          userName={`${tweet.author.walletAddress.slice(
            0,
            4,
          )}...${tweet.author.walletAddress.slice(41)}`}
          avatar={tweet.author.profileImage}
          text={tweet.tweet}
          isProfileImageNft={tweet.author.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
}

export default Feed;
