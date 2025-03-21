import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function FlootingButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="z-50 fixed bottom-6 right-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full shadow-lg w-14 h-14 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MessageCircle size={28} className="transition-all duration-300" />
    </div>
  );
}