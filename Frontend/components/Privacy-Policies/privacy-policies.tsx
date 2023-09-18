import Image from "next/image";

const PrivacyPage = () => {
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
                ¡Política de Privacidad Enchanté!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Su privacidad es muy importante para nosotros. En Enchanté tenemos algunos principios fundamentales:

                No solicitamos información personal a menos que realmente la necesitemos.
                No compartimos su información personal con nadie, excepto para cumplir con la ley, el desarrollo de nuestros productos, o para proteger nuestros derechos.
                No almacenamos información personal en nuestros servidores a menos que se requiera para brindar nuestros servicios.
                Si tiene alguna pregunta acerca de cómo eliminar o corregir sus datos personales por favor, póngase en contacto con nuestro equipo de soporte Enchanté.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                ¡Visitantes del sitio web Enchanté!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Al igual que la mayoría de los operadores de sitios web, Enchanté recoge información no personalmente identificable del tipo que los navegadores web y servidores suelen poner a disposición, tales como el tipo de navegador, sitio de referencia, y la fecha y hora de cada solicitud del visitante. 
                El propósito de Enchanté al recopilar información no personalmente identificable es entender mejor cómo los visitantes de Enchanté usan su página web. De vez en cuando Enchanté puede liberar la información no personalmente identificable de manera agregada, por ejemplo, mediante la publicación de un informe sobre las tendencias en el uso de su sitio web.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                ¡Cambios en la Política de Privacidad de Enchanté!
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Aunque la mayoría de los cambios sean muy probablemente menores, Enchanté puede cambiar su Política de Privacidad de vez en cuando, y a sola discreción de Enchanté. Enchanté anima a los visitantes a visitar con frecuencia esta página para conocer cualquier cambio en su política de privacidad. El uso continuado de este sitio después de cualquier cambio en esta Política de Privacidad, constituirá su aceptación de tales cambios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
