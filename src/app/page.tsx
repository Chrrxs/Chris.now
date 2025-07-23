"use client";

import { useState, useEffect } from "react";

// Constants
const ACTIVITIES = [
  "creating engaging experiences.",
  "tackling challenges.",
  "thinking about design.",
  "reading documentation.",
  "debugging.",
  "thinking about security."
];

const ANIMATION_TIMINGS = {
  TYPING_BASE_DELAY: 50,
  TYPING_RANDOM_DELAY: 60,
  DELETE_BASE_DELAY: 30,
  DELETE_RANDOM_DELAY: 20,
  SPACE_DELAY: 50,
  PUNCTUATION_DELAY: 150,
  PAUSE_BEFORE_DELETE: 2000,
  TEXT_FADE_OUT: 18,
  CHAR_REVEAL_DELAY: 18,
  CHAR_REVEAL_DURATION: 150,
  BUTTON_ANIMATION_DURATION: 400,
};

export default function Home() {
  // Time and typewriter state
  const [currentTime, setCurrentTime] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [activityIndex, setActivityIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActivelyTyping, setIsActivelyTyping] = useState(false);

  // Discord button state
  const [showDiscordHandle, setShowDiscordHandle] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState('Discord');

  // Clock effect - updates every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for activities
  useEffect(() => {
    const currentText = ACTIVITIES[activityIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      // Delete characters one by one
      if (displayText.length > 0) {
        setIsActivelyTyping(true);
        const deleteDelay = ANIMATION_TIMINGS.DELETE_BASE_DELAY + Math.random() * ANIMATION_TIMINGS.DELETE_RANDOM_DELAY;
        timeoutId = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteDelay);
      } else {
        // Finished deleting, move to next activity
        setIsActivelyTyping(false);
        setIsDeleting(false);
        setActivityIndex((prev) => (prev + 1) % ACTIVITIES.length);
      }
    } else {
      // Type characters one by one
      if (displayText.length < currentText.length) {
        setIsActivelyTyping(true);
        const char = currentText[displayText.length];
        let typingDelay = ANIMATION_TIMINGS.TYPING_BASE_DELAY + Math.random() * ANIMATION_TIMINGS.TYPING_RANDOM_DELAY;

        // Add pauses for natural typing rhythm
        if (char === " ") typingDelay += ANIMATION_TIMINGS.SPACE_DELAY;
        if (char === "," || char === ".") typingDelay += ANIMATION_TIMINGS.PUNCTUATION_DELAY;

        timeoutId = setTimeout(() => {
          setDisplayText((prev) => prev + char);
        }, typingDelay);
      } else if (displayText === currentText) {
        // Finished typing, pause then start deleting
        setIsActivelyTyping(false);
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, ANIMATION_TIMINGS.PAUSE_BEFORE_DELETE);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activityIndex, displayText, isDeleting]);

  // Handle Discord button click with character-by-character text animation
  const handleDiscordClick = () => {
    setIsTransitioning(true);
    setIsClicked(true);

    const newText = !showDiscordHandle ? '@chrrxs' : 'Discord';
    const direction = !showDiscordHandle ? 'reveal-right' : 'reveal-left';

    // Copy Discord handle to clipboard when revealing
    if (!showDiscordHandle) {
      navigator.clipboard.writeText('Chrrxs').catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = 'Chrrxs';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      });
    }

    // Add directional animation class
    const button = document.querySelector('.discord-button');
    button?.classList.add(direction);

    // Fade out current text, then reveal new text character by character
    setTimeout(() => {
      setDisplayedText('');

      let charIndex = 0;
      const revealInterval = setInterval(() => {
        if (charIndex < newText.length) {
          setDisplayedText(newText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(revealInterval);
          setIsTransitioning(false);
        }
      }, ANIMATION_TIMINGS.CHAR_REVEAL_DELAY);

      setShowDiscordHandle(!showDiscordHandle);
    }, ANIMATION_TIMINGS.TEXT_FADE_OUT);

    // Clean up animations
    setTimeout(() => {
      setIsClicked(false);
      button?.classList.remove('reveal-right', 'reveal-left');
    }, ANIMATION_TIMINGS.BUTTON_ANIMATION_DURATION);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 overflow-hidden px-4 py-8">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 dark:bg-yellow-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl text-center space-y-4 sm:space-y-6 border border-white/20 dark:border-gray-700/20">
        {/* Header */}
        <div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium">
            Hey there! I&apos;m 
            <span className="animate-pulse bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-900 px-2 py-1 rounded-md mx-1 font-bold">
              Chris.
            </span>
          </p>
        </div>

        {/* Live clock and activity typewriter */}
        <div className="space-y-2 sm:space-y-3 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl sm:rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
          <div className="text-xl sm:text-2xl font-mono font-bold text-gray-800 dark:text-white">
            {currentTime}
          </div>

          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 min-h-[3rem] sm:min-h-[2.5rem] flex items-center justify-center overflow-hidden px-2">
            Right
            <span className="animate-pulse bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-900 px-2 py-1 rounded-md mx-1 font-bold">
              now
            </span>
            I&apos;m&nbsp;
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {displayText}
              <span
                className={`vscode-cursor ${isActivelyTyping ? "solid" : ""}`}
              ></span>
            </span>
          </div>
        </div>

        {/* Social links */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
            Let&apos;s connect
          </h3>

          <div className="relative flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://github.com/chrrxs"
              className="github-button group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-lg sm:rounded-xl transition-all duration-200 ease-out cursor-pointer w-full sm:w-40 min-h-[48px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium sm:font-semibold text-sm sm:text-base">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/chris-michael-guzman"
              className="linkedin-button group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg sm:rounded-xl transition-all duration-200 ease-out cursor-pointer w-full sm:w-40 min-h-[48px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-medium sm:font-semibold text-sm sm:text-base">LinkedIn</span>
            </a>


            <button
              onClick={handleDiscordClick}
              className={`discord-button group relative overflow-hidden flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg sm:rounded-xl transition-all duration-200 ease-out cursor-pointer w-full sm:w-40 min-h-[48px] ${
                isClicked ? 'clicked' : ''
              }`}
            >
              <svg
                className={`discord-icon w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                  isClicked ? 'wiggle' : ''
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
              </svg>
              <span className="font-medium sm:font-semibold text-sm sm:text-base">
                <div className="relative overflow-hidden flex justify-center items-center min-h-[1.5rem]">
                <span 
                  className={`discord-text font-medium sm:font-semibold text-sm sm:text-base transition-all duration-150 ease-out ${
                    isTransitioning && displayedText === '' ? 'transitioning' : ''
                  }`}
                  style={{
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {displayedText.split('').map((char, index) => (
                    <span
                      key={`${showDiscordHandle}-${index}`}
                      className="char-reveal inline-block"
                      style={{
                        animationDelay: `${index * 30}ms`,
                        animationDuration: '150ms'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                </div>
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
          Made with Next.js and lots of ❤️
          by CMG
        </div>
      </div>

      <style jsx>{`
        /* Background blob animation */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* VSCode-style cursor */
        @keyframes vscode-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .vscode-cursor {
          animation: vscode-blink 1s infinite;
          color: #9333ea;
          font-weight: normal;
          display: inline-block;
          width: 1px;
          height: 1.2em;
          background-color: currentColor;
          vertical-align: middle;
        }
        .vscode-cursor.solid {
          animation: none;
          opacity: 1;
        }
        .dark .vscode-cursor {
          color: #a855f7;
        }

        /* Button animations */
        @keyframes fluidClick {
          0% { transform: scale(1); }
          40% { transform: scale(0.96); }
          70% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        /* Social button base styles */
        .discord-button, .github-button, .linkedin-button {
          transform: scale(1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: box-shadow 0.3s ease-in-out;
        }
        .discord-button:hover:not(.clicked), 
        .github-button:hover, 
        .linkedin-button:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        /* Discord button click animation */
        .discord-button.clicked {
          animation: fluidClick 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Sweeping glow effect */
        .discord-button::before {
          content: '';
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: transform 0.3s ease-out;
          transform: translateX(-100%);
        }
        .discord-button.clicked.reveal-right::before {
          transform: translateX(100%);
        }
        .discord-button.clicked.reveal-left::before {
          transform: translateX(-200%);
        }

        /* Text transition effects */
        .discord-text {
          opacity: 1;
          position: relative;
        }
        .discord-text.transitioning {
          opacity: 0;
          filter: blur(2px);
        }

        /* Character reveal animation */
        @keyframes charReveal {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.7);
            filter: blur(3px);
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-2px) scale(1.1);
            filter: blur(1px);
            text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
            text-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
        }
        .char-reveal {
          animation: charReveal ease-out;
          animation-fill-mode: both;
        }

        /* Icon wiggle animation */
        @keyframes springWiggle {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(-8deg); }
          20% { transform: rotate(6deg); }
          30% { transform: rotate(-4deg); }
          40% { transform: rotate(2.5deg); }
          50% { transform: rotate(-1.5deg); }
          60% { transform: rotate(0.8deg); }
          70% { transform: rotate(-0.4deg); }
          80% { transform: rotate(0.2deg); }
          90% { transform: rotate(-0.1deg); }
          100% { transform: rotate(0deg); }
        }
        .discord-icon.wiggle {
          animation: springWiggle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
}
