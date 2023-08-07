import Image from 'next/image';

const NewsLatterBox = () => {
  return (
    <div
      className="wow fadeInUp relative z-10 rounded-md bg-primary/[3%] p-8 dark:bg-primary/10 sm:p-11 lg:p-8 xl:p-11"
      data-wow-delay=".2s"
    >
      <div style={{ height: '570px' }}>
        <Image
          src="/images/66ad69725aa037d059d292a3c5a522ab.jpg" // Ruta absoluta de la imagen
          alt="Imagen para el boletín"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default NewsLatterBox;
