import Image from "next/image";

const Cheering = () => {
  return (
    <div className="cherringWrapper animate-slide-up">
      <Image alt="dancer" width={200} height={100} src={"/dance.gif"} />
    </div>
  );
};

export default Cheering;
