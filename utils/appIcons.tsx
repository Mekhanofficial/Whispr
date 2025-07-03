import {
  FaGoogle,
  FaYoutube,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaAmazon,
  FaReddit,
  FaGlobe,
} from "react-icons/fa";
import { SiNetflix } from "react-icons/si";

export const getIconForApp = (name: string): JSX.Element => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("google")) return <FaGoogle />;
  if (lowerName.includes("youtube")) return <FaYoutube />;
  if (lowerName.includes("github")) return <FaGithub />;
  if (lowerName.includes("twitter")) return <FaTwitter />;
  if (lowerName.includes("facebook")) return <FaFacebook />;
  if (lowerName.includes("instagram")) return <FaInstagram />;
  if (lowerName.includes("linkedin")) return <FaLinkedin />;
  if (lowerName.includes("netflix")) return <SiNetflix />;
  if (lowerName.includes("spotify")) return <FaSpotify />;
  if (lowerName.includes("amazon")) return <FaAmazon />;
  if (lowerName.includes("reddit")) return <FaReddit />;

  return <FaGlobe />;
};
