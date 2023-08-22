import Breadcrumb from "@/components/Common/Breadcrumb";
import Layout from "@/components/Hero/Layout";




const HeroPage = () => {
  
  return (
    <>
      <Breadcrumb
        pageName="Hero Page"
        description="Aquí encontrarás la información de nuestros platos."
      />
      <Layout />
    </>
  );
};

export default HeroPage;