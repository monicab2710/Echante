import Home from "@/components/Hero/index";
import Breadcrumb from "@/components/Common/Breadcrumb";

const HeroPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hero Page"
        description="Aquí encontrarás la información de nuestras últimas novedades."
      />
      <Home products={[]} />
    </>
  );
};

export default HeroPage;