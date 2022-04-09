import contractArtifact from "./ProfileImageNfts.json";

// export const contractAddress =
export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const contractABI = contractArtifact.abi;

export const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "#334250a7",
  },
};
