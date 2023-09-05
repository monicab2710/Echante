import HeroSectionOne from "@/components/Hero/HeroSectionProducts";
import Breadcrumb from "@/components/Common/Breadcrumb";
import HeroSectionOnex from "@/components/Hero/HeroSectionCategories";

const HeroPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hero Page"
        description="Aquí encontrarás la información de nuestras últimas novedades."
      />
      <HeroSectionOnex />
      <HeroSectionOne />
    </>
  );
};

export default HeroPage;