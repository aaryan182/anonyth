import { Avatar } from "./PostCard";
export const AppBar = () => {
  return (
    <div className="border-b  flex justify-between px-10 py-2">
      <div className="flex flex-col justify-center">Anonyth</div>
      <div>
        <Avatar name="Aaryan Bajaj" />
      </div>
    </div>
  );
};
