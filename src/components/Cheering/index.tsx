import Image from "next/image";

const BearDancing = () => (
  <div
    className="cherringWrapper animate-slide-up"
    style={{ bottom: -45, right: 20 }}
  >
    <Image alt="dancer" width={200} height={100} src={"/dance.gif"} />
  </div>
);
const BunnyDancing = () => (
  <div
    className="cherringWrapper animate-slide-up"
    style={{ bottom: -0, left: 100 }}
  >
    <Image alt="dancer" width={200} height={100} src={"/bunny.gif"} />
  </div>
);
const Cheering = () => {
  // Animation styles
  return (
    <>
      <BearDancing />
      <BunnyDancing />
    </>
  );
};

export default Cheering;
