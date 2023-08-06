import HeroSectionOne from "@/components/Hero/HeroSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

const HeroPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hero Page"
        description="Aquí encontrarás la información de nuestras últimas novedades."
      />
      <HeroSectionOne />
    </>
  );
};

export default HeroPage;