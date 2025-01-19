import LogoItem from "../components/LogoItem";

const Footer = () => {
  return (
    <div className="relative z-50 lg:flex lg:justify-center grid grid-cols-2 sm:grid-cols-3 w-full lg:py-20 py-16 mt-[100px] bg-darkBlue lg:gap-x-8 gap-x-3 sm:px-10 px-6 sm:gap-y-8 gap-y-6 place-items-center">
      <LogoItem
        src="66d8439f4a0f3000ee782e10_Stake logo white.png"
        alt="stake"
      />
      <LogoItem
        src="66793d683666e2d91d208c06_complay-advantage-white.svg"
        alt="Comply advantage"
      />
      <LogoItem src="66793d68a2e00db335689f83_deriv-white.svg" alt="deriv" />
      <LogoItem src="66793d68acc128ff6fded32d_paypal-white.svg" alt="paypal" />
      <LogoItem src="66793d68f0cb5ff56f00fc25_paxos-white.svg" alt="paxos" />
      <LogoItem src="66793d685fd353878381d7ed_noda-white.svg" alt="noda" />
      <LogoItem src="66793d685fd353878381d7ed_noda-white.svg" alt="noda" />
      <LogoItem src="6706483c51647021f7e0b45e_Deel logo (1).svg" alt="Deel" />
    </div>
  );
};

export default Footer;
