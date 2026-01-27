import AboutTerminal from "../AboutTerminal";

const About = () => {
  return (
    <section className="relative w-screen h-screen bg-black bg-[url(about/bg2.webp)] bg-cover bg-no-repeat overflow-hidden">
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20">
        <AboutTerminal />
      </div>
      <img
        src="about/comp.png"
        alt=""
        className="absolute w-full h-full scale-120 bottom-0 max-[1350px]:bottom-[11%] max-[1200px]:bottom-[10%] max-[1000px]:scale-140 max-[900px]:scale-170 max-[900px]:bottom-[20%] max-[700px]:scale-220 z-10 max-[700px]:bottom-[25%] max-[560px]:bottom-[20%]"
      />
      <img
        height={30}
        src="about/cassette.webp"
        alt=""
        className="w-100 h-100 scale-90 absolute bottom-[10%] left-[10%] max-[950px]:left-[9%] max-[900px]:left-[4%] max-[850px]:left-[7%] max-[700px]:-left-[10%] max-[460px]:-left-[20%] max-[460px]:bottom-[8%] max-[460px]:scale-70 max-[410px]:-left-[25%]"
      />
      <img
        height={30}
        src="about/lava.png"
        alt=""
        className="w-200 h-200 absolute bottom-[15%] max-[1000px]:scale-80 -left-[20%] max-[700px]:hidden max-[1200px]:-left-[25%] max-[1045px]:-left-[30%] max-[900px]:-left-[37%]"
      />
      <img
        height={30}
        src="about/cd.webp"
        alt=""
        className="w-120 h-120 absolute -bottom-[7%] -left-[7%] max-[945px]:-left-[15%] max-[1000px]:hidden"
      />
      <img
        height={30}
        src="about/radio.webp"
        alt=""
        className="w-150 h-150 absolute bottom-[15%] max-[1242px]:-right-[10%] -right-[5%] max-[1208px]:w-110 max-[1120px]:h-110 max-[1208px]:-right-[5%] max-[1208px]:bottom-[15%] max-[700px]:hidden"
      />
      <img
        height={30}
        src="about/soda-can.webp"
        alt=""
        className="w-100 h-100 z-20 absolute bottom-[5%] right-[15%] max-[1095px]:right-[10%] max-[700px]:bottom-[5%] max-[700px]:-right-[20%] max-[460px]:scale-70 max-[460px]:bottom-0 max-[410px]:bottom-[2%]"
      />
      <img
        src="about/photoframe.webp"
        alt=""
        className="w-200 h-200 scale-120 z-30 absolute max-[1390px]:-bottom-[10%] max-[1330px]:-bottom-[5%] -bottom-[13%] left-[5%] max-[1170px]:scale-90 max-[1170px]:-bottom-[8%] max-[1000px]:-left-[25%] max-[770px]:-left-[35%] max-[700px]:hidden"
      />
    </section>
  );
};

export default About;
