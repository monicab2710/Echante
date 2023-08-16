import Breadcrumb from "@/components/Common/Breadcrumb";
import Categories from "@/components/Hero/Categories";

const HeroPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hero Page"
        description="Aquí encontrarás la información de nuestras últimas novedades."
      />
      <Categories />
    </>
  );
};

export default HeroPage;