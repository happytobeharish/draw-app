import Design from "../components/Images/Design.svg";
import Image from 'next/image'
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          Excaliedraw
        </h1>
        <a
          href="/app"
          className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all duration-300 shadow"
        >
          Launch App
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-24 py-24 gap-12">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
            Draw Ideas <span className="text-indigo-600">Visually</span> &
            Collaborate Instantly
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A sleek, fast, and intuitive drawing app for teams, creators, and
            visual thinkers. Your ideas, beautifully drawn — wherever you are.
          </p>
          <a
            href="/signup"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Get Started for Free →
          </a>
        </div>
        <div className="w-full max-w-xl">
          <Image
            src={Design}
            alt="Excalidraw preview"
            className="w-full rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">
            Why Choose Excaliedraw?
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powerful features that help you sketch ideas and work together
            seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-24">
          {[
            {
              title: "🧑‍🤝‍🧑 Real-Time Collaboration",
              desc: "Draw together live with teammates from anywhere in the world.",
            },
            {
              title: "⚡ Offline Ready",
              desc: "Works perfectly even without internet. Syncs when you reconnect.",
            },
            {
              title: "🎨 Beautiful & Intuitive",
              desc: "Sleek UI that feels like drawing on paper — but smarter.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="bg-indigo-50 p-6 rounded-3xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h4 className="text-xl font-semibold mb-2 text-indigo-800">
                {title}
              </h4>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 px-6 py-10 text-center text-sm text-gray-500 bg-gradient-to-t from-white via-indigo-50 to-transparent">
        © {new Date().getFullYear()} Excaliedraw Clone. Built with ❤️ using
        React, Tailwind & imagination.
      </footer>
    </div>
  );
}
