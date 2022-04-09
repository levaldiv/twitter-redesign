import Post from "../Post";
import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";

const style = {
  wrapper: `no-scrollbar`,
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

const ProfileTweets = () => {
  const { currentAccount, currentUser } = useContext(TwitterContext);

  return (
    <div className={style.wrapper}>
      {currentUser.tweets?.map((tweet, index) => (
        <Post
          key={index}
          displayName={
            currentUser.name === "Unnamed"
              ? `${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`
              : currentUser.name
          }
          userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(
            -4
          )}`}
          text={tweet.tweet}
          avatar={currentUser.profileImage}
          isProfileImageNft={currentUser.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
};

export default ProfileTweets;
