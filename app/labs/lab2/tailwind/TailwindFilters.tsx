export default function TailwindFilters() {
  // reactjs.jpg is used here so the lab runs out of the box.
  const src = "/images/reactjs.jpg";
  return (
    <div>
      <h2>Blurs</h2>
      <div className="flex">
        <img className="blur-none w-1/4" src={src} alt="blur none" />
        <img className="blur-sm w-1/4" src={src} alt="blur sm" />
        <img className="blur-lg w-1/4" src={src} alt="blur lg" />
        <img className="blur-2xl w-1/4" src={src} alt="blur 2xl" />
      </div>
      <div id="wd-your-filters">
        <h3 className="mt-4">Contrast</h3>
        <div className="flex">
          <img className="contrast-50 w-1/4" src={src} alt="contrast 50" />
          <img className="contrast-100 w-1/4" src={src} alt="contrast 100" />
          <img className="contrast-150 w-1/4" src={src} alt="contrast 150" />
          <img className="contrast-200 w-1/4" src={src} alt="contrast 200" />
        </div>
      </div>
      <div id="wd-ai-filters">
        <h3 className="mt-4">Grayscale and brightness</h3>
        <div className="flex">
          <img className="grayscale w-1/4" src={src} alt="grayscale" />
          <img className="grayscale-0 w-1/4" src={src} alt="grayscale 0" />
          <img className="brightness-50 w-1/4" src={src} alt="brightness 50" />
          <img className="brightness-150 w-1/4" src={src} alt="brightness 150" />
        </div>
      </div>
    </div>
  );
}
