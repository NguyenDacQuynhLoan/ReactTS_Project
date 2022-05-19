export default function SpinnerLoading() {
  return (
    <div className=" h-screen wrapped flex items-center justify-center ">
      <div className="flex items-center justify-center  space-x-2 animate-bounce">
        <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
        <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
        <div className="w-8 h-8 bg-red-400 rounded-full"></div>
      </div>
    </div>
  );
}
