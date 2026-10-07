export default function TailwindBackgroundColors() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Background Colors</h2>
      <div className="bg-red-500 text-white p-4 mb-4">This div has a red background.</div>
      <div className="bg-green-500 text-white p-4 mb-4">This div has a green background.</div>
      <div className="bg-blue-500 text-white p-4 mb-4">This div has a blue background.</div>
      <div className="bg-yellow-500 text-black p-4 mb-4">This div has a yellow background.</div>
      <div id="wd-your-bg" className="bg-teal-300 text-black p-4 mb-4">
        This div has a light teal background with black text.
      </div>
      <div id="wd-ai-bg" className="bg-indigo-700 text-white p-4 mb-4">
        This sample div has a dark indigo background with white text.
      </div>
    </div>
  );
}
