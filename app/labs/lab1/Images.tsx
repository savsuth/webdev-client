export default function Images() {
  return (
    <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img
        id="wd-starship"
        width="400px"
        alt="Starship"
        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      {/* "Tesla Bot 2023.jpg" by Premeditated, Wikimedia Commons, CC BY-SA 4.0 */}
      <img
        id="wd-teslabot"
        src="/images/teslabot.jpg"
        height="200px"
        alt="Tesla Bot (Optimus) humanoid robot"
      />
      <br />
      A personal photo:
      <br />
      <img
        id="wd-your-image"
        src="/images/profile.jpg"
        width="300px"
        alt="Aasav Suthar"
      />
      <br />
      Sample image from a public URL:
      <br />
      <img
        id="wd-ai-image"
        src="https://www.nasa.gov/wp-content/uploads/2023/03/iss068e027836.jpg"
        width="200px"
        alt="International Space Station"
      />
    </div>
  );
}
