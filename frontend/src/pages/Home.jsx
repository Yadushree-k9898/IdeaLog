import { useState } from "react";
import { Mic, FileText, ArrowRight, Moon, Sun, Save, List } from "lucide-react";

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`fixed w-full ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md z-10 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Mic className="text-purple-600 mr-2" size={24} />
              <span className="text-2xl font-bold text-purple-600">
                VoiceNotes
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-100 text-gray-700"} transition-colors duration-200`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a
                href="#"
                className={`px-4 py-2 rounded-md ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-200`}
              >
                Login
              </a>
              <a
                href="#"
                className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-purple-600">Capture</span> Your Voice,{" "}
              <span className="text-purple-600">Save</span> Your Thoughts
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              A simple voice-to-text note-taking app. Speak your thoughts and
              watch them transform into organized notes instantly.
            </p>
            <a
              href="#"
              className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 text-center inline-flex items-center"
            >
              <Mic size={20} className="mr-2" /> Start Recording
            </a>
          </div>

          <div className="mt-12 flex justify-center">
            <div
              className={`w-full max-w-2xl p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Voice Note Demo</h3>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-purple-100 text-purple-600">
                    <Mic size={18} />
                  </button>
                  <button className="p-2 rounded-full bg-purple-100 text-purple-600">
                    <Save size={18} />
                  </button>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"} min-h-[120px]`}
              >
                <p className="opacity-80">
                  &quot;Remember to schedule the team meeting for Thursday at 2
                  PM and prepare the quarterly report slides...&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple Voice Notes</h2>
            <p className="text-lg max-w-3xl mx-auto opacity-90">
              Our straightforward voice-to-text app helps you capture notes
              faster than typing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Record Voice",
                desc: "Simply press the mic button and start speaking.",
              },
              {
                icon: FileText,
                title: "Convert to Text",
                desc: "Your speech is instantly converted to text notes.",
              },
              {
                icon: List,
                title: "Organize Notes",
                desc: "Save, categorize, and access your notes anytime.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-900" : "bg-white"} shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg max-w-3xl mx-auto opacity-90">
              Three simple steps to capture your thoughts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "Press Record",
                desc: "Tap the microphone button to start recording your voice.",
              },
              {
                step: "Speak Clearly",
                desc: "Talk naturally and your voice will be converted to text.",
              },
              {
                step: "Save Note",
                desc: "Review your note and save it to your collection.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full ${isDarkMode ? "bg-purple-900" : "bg-purple-100"} flex items-center justify-center mb-6`}
                >
                  <span className="text-xl font-bold text-purple-600">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.step}</h3>
                <p className="opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-purple-50"} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Notes with Your Voice?
          </h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90 mb-8">
            No AI, no complexity - just a simple tool to capture your thoughts
            through voice.
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
          >
            Try It Now <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center opacity-70">
          <p>© {new Date().getFullYear()} VoiceNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
