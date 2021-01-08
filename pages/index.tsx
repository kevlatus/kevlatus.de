import React, { FunctionComponent } from "react";

import AppLayout from "../components/AppLayout";
import DocHead from "../components/DocHead";

const Home: FunctionComponent = function () {
  return (
    <>
      <DocHead />

      <AppLayout className="bg-primary-o2">
        <main className="flex-grow flex flex-col justify-center">
          <section className="p-6">
            <article className="inline-flex flex-col items-start">
              <p className="pb-2 type-display text-sm sm:text-md md:text-xl lg:text-2xl">
                Hey, I'm Kevin
              </p>
              <p className="pb-4 type-display text-lg sm:text-xl md:text-3xl lg:text-4xl">
                I build digital experiences that <br /> bring joy into everyday
                life.
              </p>

              {/* <button className="rounded-md border-primary border-2 px-2 text-primary self-center">
								see how
							</button> */}
            </article>
          </section>
        </main>
      </AppLayout>
    </>
  );
};

export default Home;
