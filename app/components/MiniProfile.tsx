import Image from "next/image";
import profielImage from "../../public/profileImg.jpg";

export default function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <Image
        className="rounded-full border p-[2px] w-16 h-16"
        src={profielImage}
        alt="profile image"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">Tomato Toma Poma</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button className="text-blue-400 text-sm font-semibold">Sign out</button>
    </div>
  );
}
