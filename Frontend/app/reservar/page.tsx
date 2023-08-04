import Breadcrumb from "@/components/Common/Breadcrumb";
import Reserve from "@/components/Reserve";

const ReservePage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Reserve Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <Reserve />
    </>
  );
};

export default ReservePage;
