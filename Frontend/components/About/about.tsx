import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/resta.webp"
                alt="foto"
                fill
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                ¡Bienvenidos a Enchanté!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Nuestro restaurante es una experiencia culinaria única en Argentina.
                Con una especialidad en cocina francesa, nuestro chef Felipe Parra,
                con su pasión y dedicación, crea obras de arte comestibles en cada plato. <br />
                Además, nuestros bartenders son apasionados por crear cócteles artesanales que
                complementan perfectamente nuestros platos, agregando una capa adicional de sabor
                a tu experiencia gastronómica.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                ¡Visita Enchanté!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Ubicado en una imponente casa colonial restaurada, nuestro restaurante, con su música
                en vivo, ofrece una atmósfera animada y vibrante para acompañar la experiencia
                gastronómica única que te transportará a la vida francesa.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                ¡Vive Enchanté!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Nuestro restaurante es más que un lugar para comer y beber, es un santuario para el alma,
                donde puedes escapar del bullicio de la ciudad y sumergirte en la vibrante cultura francesa.
                Reserva una mesa y transportate al corazon del pais galo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
