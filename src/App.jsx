import React, { useState } from "react";

// Shortly React Landing Page with TailwindCSS
function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState("Features"); // default active
  const [input, setInput] = React.useState("");
  const [inputError, setInputError] = React.useState(false);
  const [shortUrl, setShortUrl] = React.useState("");
  const [apiError, setApiError] = React.useState("");
  const [results, setResults] = React.useState([]); // Add this
  const [copiedIndex, setCopiedIndex] = React.useState(null); // For copy feedback

  // Desktop and mobile nav items
  const navItems = ["Features", "Pricing", "Resources"];

  // Handle URL shortening
 const handleShorten = async () => {
  setShortUrl("");
  setApiError("");

  const trimmedInput = input.trim();

  if (!trimmedInput) {
    setInputError(true);
    return;
  }
  setInputError(false);

  try {
    const response = await fetch("http://localhost:5000/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: trimmedInput }),
    });

    if (!response.ok) {
      setApiError(`Server error: ${response.status}`);
      return;
    }

    const data = await response.json();

    if (data.result_url) {
      setShortUrl(data.result_url);
    } else if (data.error) {
      setApiError(data.error);
    } else {
      setApiError("Unknown error");
    }
  } catch (err) {
    setApiError("Network error");
  }
};


  return (
    <div className="font-poppins bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-6 md:px-20 bg-white">
        {/* Logo and Desktop Nav */}
        <div className="flex gap-8 items-center">
          <img src="logo.svg" alt="logo" className="h-8" />
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-gray-500 font-semibold text-sm ml-8">
            {navItems.map((item) => (
              <div
                key={item}
                className={`cursor-pointer transition ${
                  activeNav === item
                    ? "text-teal-400 underline underline-offset-8 decoration-2"
                    : ""
                }`}
                onClick={() => {
                  setActiveNav(item);
                  setMenuOpen(false);
                }}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-5 items-center">
          <div className="cursor-pointer text-gray-500 hover:text-black">Login</div>
          <div className="flex items-center text-white bg-teal-400 rounded-full h-8 px-6 justify-center cursor-pointer hover:bg-teal-200 font-semibold">
            Sign Up
          </div>
        </div>
        {/* Hamburger for mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-gray-700 mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-gray-700 rounded"></span>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 mx-4 bg-violet-950 rounded-xl flex flex-col items-center py-8 z-50 shadow-lg md:hidden animate-fade-in">
            <div className="flex flex-col gap-6 w-full items-center text-white font-bold text-lg">
              {navItems.map((item) => (
                <div
                  key={item}
                  className={`cursor-pointer transition ${
                    activeNav === item ? "text-teal-400 underline" : ""
                  }`}
                  onClick={() => {
                    setActiveNav(item);
                    setMenuOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
              <hr className="w-4/5 border-violet-300 my-2" />
              <div className="cursor-pointer">Login</div>
              <div className="w-4/5">
                <div className="flex items-center justify-center text-white bg-teal-400 rounded-full h-12 w-full font-bold cursor-pointer hover:bg-teal-200 mt-4">
                  Sign Up
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:py-24 md:px-20 pt-10 bg-white">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pb-28 md:pb-0">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-8 md:mt-0">
            More than just shorter links
          </h1>
          <p className="text-gray-400 text-2xl md:text-2xl py-4 md:pb-8 max-w-md">
            Build your brand's recognition and get detailed insights on how your links are performing.
          </p>
          <div className="text-white bg-teal-400 rounded-full font-bold w-40 h-12 flex justify-center items-center cursor-pointer hover:bg-teal-200 mt-5 md:mb-0">
            Get Started
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <img src="illustration-working.svg" alt="illustration" className="w-full max-w-md" />
        </div>
      </section>

      {/* Shorten Box */}
      <section className="w-full px-4 md:px-0 mt-[-3rem] relative z-10">
        <div className="bg-[url('bg-shorten-desktop.svg')] bg-violet-950 bg-cover rounded-lg max-w-3xl mx-auto p-6 md:p-8 shadow-lg relative">
          {/* Input and button in a row */}
          <div className="flex flex-col md:flex-row w-full gap-4">
            <input
              className={`rounded-md w-full h-14 px-4 text-lg outline-none ${
                inputError ? "border-2 border-red-400 placeholder-red-400" : ""
              }`}
              type="text"
              placeholder={inputError ? "Please add a link" : "Shorten a link here..."}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                setInputError(false);
              }}
            />
            <button
              className="text-white bg-teal-400 rounded-md font-bold w-full md:w-40 h-14 flex justify-center items-center cursor-pointer hover:bg-teal-200 transition"
              onClick={handleShorten}
            >
              Shorten it!
            </button>
          </div>
          {/* Error or result message below the row */}
          <div className="min-h-[28px] mt-2">
            {inputError && (
              <span className="text-red-400 text-sm ml-2 block">
                Please add a link
              </span>
            )}
            {apiError && (
              <span className="text-red-400 text-sm ml-2 block">
                {apiError}
              </span>
            )}
          </div>
        </div>

        {/* Results List */}
        <div className="max-w-3xl mx-auto mt-6 flex flex-col gap-4">
          {results.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-md flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-3 shadow"
            >
              <div className="text-gray-800 break-all w-full md:w-2/5">{res.original}</div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                <a
                  href={res.short}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 break-all md:ml-6"
                >
                  {res.short}
                </a>
                <button
                  className={`ml-0 md:ml-6 px-6 py-2 rounded-md font-bold ${
                    copiedIndex === idx
                      ? "bg-violet-950 text-white"
                      : "bg-teal-200 text-teal-900 hover:bg-teal-400"
                  } transition`}
                  onClick={() => {
                    navigator.clipboard.writeText(res.short);
                    setCopiedIndex(idx);
                    setTimeout(() => setCopiedIndex(null), 1500);
                  }}
                >
                  {copiedIndex === idx ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Statistics */}
      <section className="bg-gray-100 pt-24 pb-20 px-4 md:px-0 justify">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-3xl md:text-5xl text-center">Advanced Statistics</h2>
          <p className="text-gray-500 text-center leading-relaxed max-w-xl mt-4 text-lg md:text-2xl">
            Track how your links are performing across the web with our advanced statistics dashboard.
          </p>
        </div>
        {/* Cards */}
        <div className="flex flex-col md:flex-row items-stretch gap-8 mt-20 relative justify-center px-4 md:px-0">

          <div className="relative z-10 flex flex-col gap-3 bg-white rounded-md p-8 md:p-10 shadow-lg w-full md:w-1/4">
            <div className="flex justify-center items-center rounded-full bg-violet-950 w-16 h-16 absolute -top-8 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 z-20">
              <img className="size-8" src="icon-brand-recognition.svg" alt="icon" />
            </div>
            <div className="font-bold text-xl md:text-2xl mt-10 md:mt-8 text-center md:text-left">Brand Recognition</div>
            <div className="text-base md:text-lg text-center md:text-left">
              Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative z-10 flex flex-col gap-3 bg-white rounded-md p-8 md:p-10 shadow-lg w-full md:w-1/4 md:mt-8">
            <div className="flex justify-center items-center rounded-full bg-violet-950 w-16 h-16 absolute -top-8 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 z-20">
              <img className="size-8" src="icon-detailed-records.svg" alt="icon" />
            </div>
            <div className="font-bold text-xl md:text-2xl mt-10 md:mt-8 text-center md:text-left">Detailed Records</div>
            <div className="text-base md:text-lg text-center md:text-left">
              Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative z-10 flex flex-col gap-3 bg-white rounded-md p-8 md:p-10 shadow-lg w-full md:w-1/4 md:mt-16">
            <div className="flex justify-center items-center rounded-full bg-violet-950 w-16 h-16 absolute -top-8 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 z-20">
              <img className="size-8" src="icon-fully-customizable.svg" alt="icon" />
            </div>
            <div className="font-bold text-xl md:text-2xl mt-10 md:mt-8 text-center md:text-left">Fully Customizable</div>
            <div className="text-base md:text-lg text-center md:text-left">
              Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.
            </div>
          </div>
        </div>
      </section>

      {/* Boost Section */}
      <section className="flex flex-col gap-5 justify-center items-center bg-[url('bg-boost-desktop.svg')] bg-violet-950 h-60 md:h-48 bg-cover">
        <div className="text-white text-2xl md:text-4xl font-bold text-center mt-10 md:mt-0">
          Boost your links today
        </div>
        <div className="text-white bg-teal-400 rounded-full font-bold w-40 h-12 flex justify-center items-center cursor-pointer hover:bg-teal-200">
          Get Started
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black flex flex-col md:flex-row gap-10 md:gap-32 justify-center items-center md:items-start p-10 md:pr-20">
        <div className="text-white font-bold text-3xl md:text-5xl mb-8 md:mb-0">
          Shortly
        </div>
        <div className="text-white flex flex-col md:flex-row justify-start gap-10 md:gap-20 w-full md:w-auto text-center md:text-left">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-lg">Features</div>
            <div className="flex gap-1 flex-col">
              <div>Link Shortening</div>
              <div>Branded Links</div>
              <div>Analytics</div>
            </div>
          </div>
          <div>
            <div className="font-bold text-lg">Resources</div>
            <div className="flex gap-1 flex-col">
              <div>Blog</div>
              <div>Developers</div>
              <div>Support</div>
            </div>
          </div>
          <div>
            <div className="font-bold text-lg">Company</div>
            <div className="flex gap-1 flex-col">
              <div>About</div>
              <div>Our Team</div>
              <div>Careers</div>
              <div>Contact</div>
            </div>
          </div>
          <div className="md:pl-10 flex gap-5 justify-center md:justify-start mt-6 md:mt-0">
            <div className="flex justify-center gap-5 size-8">
              <img src="icon-facebook.svg" alt="facebook" />
              <img src="icon-twitter.svg" alt="twitter" />
              <img src="icon-pinterest.svg" alt="printest" />
              <img src="icon-instagram.svg" alt="instagram" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
