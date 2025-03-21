import { LandingFeature } from "./components/LandingFeature";

export default async function Home() {

  return (
    <main className="text-center flex flex-col justify-between">
      <h1 className="text-3xl font-bold p-5">Unleash Your Band&apos;s Potential with BandPal</h1>
      <h2 className="text-2xl italic ">Experience the rhythm of seamless band management.</h2>
      <div className="flex flex-col sm:flex-row">
        <LandingFeature>
          <h3 className="text-1xl font-bold">Feature 1</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque fringilla, ligula a sollicitudin pretium, lectus enim gravida felis, sit amet consectetur
          quam mi eu odio. Donec ut rhoncus ante, quis dictum neque. Integer fringilla, dolor vel molestie eleifend,
          elit nulla egestas metus, sit amet dignissim metus ex at leo.
        </LandingFeature>
        <LandingFeature>
          <h3 className="text-1xl font-bold">Feature 2</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque fringilla, ligula a sollicitudin pretium, lectus enim gravida felis, sit amet consectetur
          quam mi eu odio. Donec ut rhoncus ante, quis dictum neque. Integer fringilla, dolor vel molestie eleifend,
          elit nulla egestas metus, sit amet dignissim metus ex at leo.
        </LandingFeature>
        <LandingFeature>
          <h3 className="text-1xl font-bold">Feature 3</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque fringilla, ligula a sollicitudin pretium, lectus enim gravida felis, sit amet consectetur
          quam mi eu odio. Donec ut rhoncus ante, quis dictum neque. Integer fringilla, dolor vel molestie eleifend,
          elit nulla egestas metus, sit amet dignissim metus ex at leo.
        </LandingFeature>
      </div>
    </main>
  );
}