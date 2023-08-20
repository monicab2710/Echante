import Breadcrumb from "@/components/Common/Breadcrumb";
import Categories from "@/components/Hero/Categories";

const HeroPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Hero Page"
        description="Aquí encontrarás la información de nuestros platos."
      />
      <Categories />
    </>
  );
};

export default HeroPage;