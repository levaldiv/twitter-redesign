import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

export const TwitterContext = createContext();

export const TwitterProvider = ({ children }) => {
  // keeps track of the app status (logged in or not logged in)
  const [appStatus, setAppStatus] = useState("loading");
  //  track current account
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const router = useRouter();

  // Check if the wallet is connected
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (!currentAccount && appStatus == "connected") return;
    getCurrentUserDetails(currentAccount);
    fetchTweets();
  }, [currentAccount, appStatus]);

  const checkIfWalletIsConnected = async () => {
    // if there is no wallet connected, redirect to the wallet page
    if (!window.ethereum) return setAppStatus("noMetaMask");

    try {
      // When this is called, it will open with metamask and ask which account you want to connect with
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      // you picked a wallet or multiple wallets
      if (addressArray.length > 0) {
        // connected
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
        // not connected
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      setAppStatus("error");
    }
  };

  // Initiates MetaMask wallet connection
  const connectWallet = async () => {
    // if there is no metamask
    if (!window.ethereum) return setAppStatus("NoMetaMask");

    try {
      // trying to connect
      setAppStatus("loading");

      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
        router.push("/");
        setAppStatus("NotConnected");
      }
    } catch (error) {
      // if there is an error
      setAppStatus("error");
    }
  };

  /**
   * Creates an account in Sanity DB if the user does not already have one
   * @param {String} userWalletAddress Wallet address of the currently logged in user
   */
  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const userDoc = {
        _type: "users",
        _id: userWalletAddress,
        name: "Unnamed",
        isProfileImageNft: false,
        profileImage:
          "https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg",
        walletAddress: userWalletAddress,
      };

      // creates a user account if one does not already exist
      await client.createIfNotExists(userDoc);

      setAppStatus("connected");
    } catch (error) {
      router.push("/");
      setAppStatus("error");
    }
  };

  /** Get NFTprofile image here (getProfileImageUrl)**/
  const getProfileImageUrl = async (imageUri, isNft) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`
    } else if (!isNft) {
      return imageUri
    }
  }

  /**
   * Gets all the tweets stored in Sanity DB.
   */
  const fetchTweets = async () => {
    const query = `
    *[_type == "tweets"]{
      "author": author->{name, walletAddress, profileImage, isProfileImageNft},
      tweet,
      timestamp
    }|order(timestamp desc)
    `;

    const sanityResponse = await client.fetch(query);

    setTweets([]);

    sanityResponse.forEach(async (item) => {
      // get the profile image url
      const profileImageUrl = await getProfileImageUrl(
        item.author.profileImage,
        item.author.isProfileImageNft,
      )

      const newItem = {
        tweet: item.tweet,
        timestamp: item.timestamp,
        author: {
          name: item.author.name,
          walletAddress: item.author.walletAddress,
          profileImage: profileImageUrl,
          isProfileImageNft: item.author.isProfileImageNft,
        },
      }

      setTweets((prevState) => [...prevState, newItem]);
    });
  };

  // current user details
  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    // if app is not connected just stop and return
    if (appStatus !== "connected") return;

    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `;
    const sanityResponse = await client.fetch(query);

    // get iamge
    const profileImageUrl = await getProfileImageUrl(
      sanityResponse[0].profileImage,
      sanityResponse[0].isProfileImageNft,
    );

    setCurrentUser({
      tweets: sanityResponse[0].tweets,
      name: sanityResponse[0].name,
      profileImage: profileImageUrl,
      isProfileImageNft: sanityResponse[0].isProfileImageNft,
      coverImage: sanityResponse[0].coverImage,
      walletAddress: sanityResponse[0].walletAddress,
    });
  };

  return (
    <TwitterContext.Provider
      // this gives me access to fetch the tweets fcn and be able to get the tweetes abolut this user wherever iam
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        fetchTweets,
        tweets,
        currentUser,
        getCurrentUserDetails,
      }}
    >
      {/* will be able to access this globally */}
      {children}
    </TwitterContext.Provider>
  );
};
