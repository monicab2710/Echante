import NewsLatterBox from "./NewsLatterBox";

const Reserve = () => {
  return (
    <section id="reserve" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[20%] py-11 px-8 dark:bg-primary/[20%] sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-yellow sm:text-3xl lg:text-2xl xl:text-3xl">
                Reserva en Enchanté
              </h2>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="title"
                        className="mb-3 block text-sm font-medium text-dark dark:text-yellow"
                      >
                       Motivo de la reserva:
                      </label>
                      <input
                        type="text"
                        placeholder="Cuéntanos el motivo de tu reserva"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-yellow placeholder-yellow/[50%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="date"
                        className="mb-3 block text-sm font-medium text-dark dark:text-yellow"
                      >
                        Fecha:
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-yellow placeholder-yellow/[50%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="time"
                        className="mb-3 block text-sm font-medium text-dark dark:text-yellow"
                      >
                        Hora:
                      </label>
                      <input
                        type="time"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-yellow placeholder-yellow shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="people"
                        className="mb-3 block text-sm font-medium text-dark dark:text-yellow"
                      >
                        Personas:
                      </label>
                      <input
                        type="number"
                        placeholder="2"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-yellow placeholder-yellow shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-yellow"
                      >
                        Mensaje (Opcional):
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Envíanos un mensaje"
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-yellow placeholder-yellow/[50%] shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0D263B] dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-yellow transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      Reservar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
