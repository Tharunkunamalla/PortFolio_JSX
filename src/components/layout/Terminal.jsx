import {useState, useEffect, useRef} from "react";
import {X, Terminal as TerminalIcon, Maximize2, Minimize2} from "lucide-react";
import {useTerminal} from "../../context/TerminalContext";
import {useTheme} from "../../context/ThemeContext";
import {useLenis} from "@studio-freight/react-lenis";
import {allProjects} from "../../constants/projectsData";
import {aboutData} from "../../constants/aboutData";
import {skillsData} from "../../constants/skillsData";

const Terminal = () => {
  const {
    isTerminalOpen,
    setTerminalOpen,
    matrixActive,
    toggleMatrix,
    hackerMode,
    toggleHackerMode,
  } = useTerminal();

  const {theme, changeTheme} = useTheme();
  const lenis = useLenis();

  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef(null);
  const logsEndRef = useRef(null);
  const containerRef = useRef(null);

  const commands = [
    "help",
    "about",
    "skills",
    "projects",
    "project",
    "contact",
    "theme",
    "matrix",
    "sudo",
    "clear",
    "exit",
    "close"
  ];

  // Helper to scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [logs]);

  // Disable background scrolling when terminal is active
  useEffect(() => {
    if (isTerminalOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "auto";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "auto";
      lenis?.start();
    };
  }, [isTerminalOpen, lenis]);

  // Set initial welcome text
  useEffect(() => {
    if (logs.length === 0) {
      setLogs([
        {
          text: (
            <pre className="font-mono text-[9px] sm:text-xs leading-none text-green-400 select-none">
{`████████╗██╗  ██╗ █████╗ ██████╗ ██╗   ██╗███╗   ██╗
╚══██╔══╝██║  ██║██╔══██╗██╔══██╗██║   ██║████╗  ██║
   ██║   ███████║███████║██████╔╝██║   ██║██╔██╗ ██║
   ██║   ██╔══██║██╔══██║██╔══██╗██║   ██║██║╚██╗██║
   ██║   ██║  ██║██║  ██║██║  ██║╚██████╔╝██║ ╚████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`}
            </pre>
          ),
          type: "system",
        },
        {
          text: "Welcome to Tharun's Interactive Portfolio Terminal (v1.0.0)",
          type: "system",
        },
        {
          text: "Type 'help' to view the list of available commands.",
          type: "system",
        },
        {
          text: "Keyboard Shortcuts: Press ` or Ctrl + K to toggle this shell.",
          type: "system",
        },
        {
          text: "--------------------------------------------------------",
          type: "system",
        },
      ]);
    }
  }, []);

  // Auto focus input on load / open
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setLogs((prev) => [...prev, {text: "guest@tharun-portfolio:~$", type: "input"}]);
      return;
    }

    // Add to input log
    const userLog = {text: `guest@tharun-portfolio:~$ ${trimmed}`, type: "input"};
    
    // Add command to history
    const newHistory = [...cmdHistory, trimmed];
    setCmdHistory(newHistory);
    setHistoryIndex(-1);

    // Parse command
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let responseLog = null;

    switch (cmd) {
      case "help":
        responseLog = {
          text: (
            <div className="space-y-1.5 py-1">
              <p className="text-secondary-400 font-black tracking-wide uppercase text-xs">Available Commands:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-gray-300 font-mono text-[11px] sm:text-xs">
                <div><span className="text-[#39ff14] font-semibold">help</span> - Show this help menu</div>
                <div><span className="text-[#39ff14] font-semibold">about</span> - Tharun's profile & career summary</div>
                <div><span className="text-[#39ff14] font-semibold">skills</span> - List of technical programming skills</div>
                <div><span className="text-[#39ff14] font-semibold">projects</span> - Showcase of all project files</div>
                <div><span className="text-[#39ff14] font-semibold">project &lt;num&gt;</span> - Open project by serial number</div>
                <div><span className="text-[#39ff14] font-semibold">contact</span> - Links to social profiles & email</div>
                <div><span className="text-[#39ff14] font-semibold">theme &lt;light|dark&gt;</span> - Switch site theme</div>
                <div><span className="text-[#39ff14] font-semibold">matrix</span> - Toggle full-screen matrix rain</div>
                <div><span className="text-[#39ff14] font-semibold">sudo hacker</span> - Toggle green terminal theme</div>
                <div><span className="text-[#39ff14] font-semibold">clear</span> - Clear screen logs</div>
                <div><span className="text-[#39ff14] font-semibold">exit / close</span> - Exit terminal modal</div>
              </div>
            </div>
          ),
          type: "system",
        };
        break;

      case "about":
        responseLog = {
          text: (
            <div className="space-y-3 font-mono text-[11px] sm:text-xs">
              <p className="text-[#39ff14] font-bold border-b border-[#39ff14]/20 pb-1 text-xs">ABOUT THE DEVELOPER</p>
              <p className="text-gray-300">
                Tharun Kunamalla is a Computer Science and Engineering student at IIIT Kottayam (2023 - 2027) with deep interests in Full Stack Development, AI/ML, and Open Source contributions.
              </p>
              {aboutData.map((section) => (
                <div key={section.id} className="space-y-1">
                  <p className="text-yellow-400 font-bold uppercase tracking-wider">{section.title}</p>
                  <div className="pl-3 space-y-1 text-gray-300">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:gap-2">
                        <span className="text-white font-bold shrink-0">• {item.name}</span>
                        <span className="text-gray-400 shrink-0">({item.date})</span>
                        <span className="text-gray-400 hidden sm:inline">-</span>
                        <span className="text-gray-300 italic">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
          type: "system",
        };
        break;

      case "skills":
        responseLog = {
          text: (
            <div className="space-y-3 font-mono text-[11px] sm:text-xs">
              <p className="text-[#39ff14] font-bold border-b border-[#39ff14]/20 pb-1 text-xs">TECHNICAL EXPERTISE</p>
              <div className="space-y-2">
                <p>
                  <span className="text-yellow-400 font-bold">Frontend Stack:</span>{" "}
                  <span className="text-gray-300">
                    {skillsData
                      .filter((s) => s.category === "frontend")
                      .map((s) => s.name)
                      .join(", ")}
                  </span>
                </p>
                <p>
                  <span className="text-yellow-400 font-bold">Backend & DBs:</span>{" "}
                  <span className="text-gray-300">
                    {skillsData
                      .filter((s) => s.category === "backend")
                      .map((s) => s.name)
                      .join(", ")}
                  </span>
                </p>
                <p>
                  <span className="text-yellow-400 font-bold">Tools & Systems:</span>{" "}
                  <span className="text-gray-300">
                    {skillsData
                      .filter((s) => s.category === "ecosystem")
                      .map((s) => s.name)
                      .join(", ")}
                  </span>
                </p>
              </div>
            </div>
          ),
          type: "system",
        };
        break;

      case "projects":
        responseLog = {
          text: (
            <div className="space-y-2 font-mono text-[11px] sm:text-xs">
              <p className="text-[#39ff14] font-bold border-b border-[#39ff14]/20 pb-1 text-xs">PROJECT WORKSPACE</p>
              <p className="text-gray-400 italic">Type 'project &lt;number&gt;' (e.g., 'project 1') to open in a new browser tab.</p>
              <div className="space-y-1.5 pl-1">
                {allProjects.map((p, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-yellow-400 font-black">[{idx + 1}]</span>
                    <span className="text-white font-bold">{p.title}</span>
                    <span className="text-gray-400 hidden sm:inline">-</span>
                    <span className="text-gray-300 line-clamp-1">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
          type: "system",
        };
        break;

      case "project":
        const idx = parseInt(args[0]) - 1;
        if (isNaN(idx) || idx < 0 || idx >= allProjects.length) {
          responseLog = {
            text: "Error: Invalid project index. Usage: project [1-" + allProjects.length + "]",
            type: "error",
          };
        } else {
          const selected = allProjects[idx];
          const destLink = selected.liveLink || selected.codeLink;
          window.open(destLink, "_blank", "noopener,noreferrer");
          responseLog = {
            text: `Success: Opening '${selected.title}' in a new tab... (Redirecting to: ${destLink})`,
            type: "system",
          };
        }
        break;

      case "contact":
        responseLog = {
          text: (
            <div className="space-y-2 font-mono text-[11px] sm:text-xs">
              <p className="text-[#39ff14] font-bold border-b border-[#39ff14]/20 pb-1 text-xs">CONTACT DIRECTORY</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                <div><span className="text-yellow-400 font-bold">Email:</span> <a href="mailto:kunamallatharun701@gmail.com" className="hover:underline hover:text-white">kunamallatharun701@gmail.com</a></div>
                <div><span className="text-yellow-400 font-bold">GitHub:</span> <a href="https://github.com/Tharunkunamalla" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">Tharunkunamalla</a></div>
                <div><span className="text-yellow-400 font-bold">LinkedIn:</span> <a href="https://www.linkedin.com/in/tharun-kunamalla-/" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">Tharun Kunamalla</a></div>
                <div><span className="text-yellow-400 font-bold">Twitter:</span> <a href="https://x.com/Tharunk0509" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">@Tharunk0509</a></div>
                <div><span className="text-yellow-400 font-bold">WhatsApp:</span> <a href="https://wa.me/916303480726" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">+91 6303480726</a></div>
                <div><span className="text-yellow-400 font-bold">Discord:</span> <a href="https://discord.com/users/751713701425446945" target="_blank" rel="noreferrer" className="hover:underline hover:text-white">Tharun#0509</a></div>
              </div>
            </div>
          ),
          type: "system",
        };
        break;

      case "theme":
        const targetTheme = args[0]?.toLowerCase();
        if (targetTheme === "light" || targetTheme === "dark") {
          changeTheme(targetTheme);
          responseLog = {
            text: `System Alert: Theme changed to '${targetTheme}'.`,
            type: "system",
          };
        } else {
          responseLog = {
            text: "Syntax Error: Theme option invalid. Usage: theme [light|dark]",
            type: "error",
          };
        }
        break;

      case "matrix":
        toggleMatrix();
        responseLog = {
          text: `Matrix system ${matrixActive ? "deactivated" : "activated"}. (Look behind this console)`,
          type: "system",
        };
        break;

      case "sudo":
        if (args[0]?.toLowerCase() === "hacker") {
          toggleHackerMode();
          responseLog = {
            text: hackerMode
              ? "Sudo Restored: Sytem stylesheets recovered. Regular styles active."
              : "Sudo Warning: Security layers overridden! Neon-green shell styles activated.",
            type: "system",
          };
        } else {
          responseLog = {
            text: "Access Denied: Unrecognized privilege. Try: 'sudo hacker'",
            type: "error",
          };
        }
        break;

      case "clear":
        setLogs([]);
        setInputValue("");
        return;

      case "exit":
      case "close":
        setTerminalOpen(false);
        setInputValue("");
        return;

      default:
        responseLog = {
          text: `Command not found: '${cmd}'. Type 'help' for command directory.`,
          type: "error",
        };
    }

    setLogs((prev) => [...prev, userLog, responseLog]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    // History Navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIndex(nextIdx);
        setInputValue(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setInputValue(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputValue("");
      }
    }

    // Autocomplete Tab Completion
    if (e.key === "Tab") {
      e.preventDefault();
      const matches = commands.filter((c) => c.startsWith(inputValue.toLowerCase()));
      if (matches.length === 1) {
        setInputValue(matches[0] + " ");
      } else if (matches.length > 1) {
        // Output potential matches to logs
        const matchLogs = [
          {text: `guest@tharun-portfolio:~$ ${inputValue}`, type: "input"},
          {text: matches.join("    "), type: "system"},
        ];
        setLogs((prev) => [...prev, ...matchLogs]);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={containerRef}
        className={`crt-screen crt-flicker relative bg-[#07070a]/95 border border-[#39ff14]/30 rounded-2xl flex flex-col font-mono text-xs md:text-sm overflow-hidden transition-all duration-300 shadow-[0_0_50px_rgba(57,255,20,0.15)] ${
          isMaximized ? "w-full h-full m-0" : "w-full max-w-3xl h-[500px] md:h-[600px]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f16]/90 border-b border-[#39ff14]/15 text-[#39ff14]/80">
          <div className="flex items-center gap-2 select-none">
            <TerminalIcon className="w-4 h-4 animate-pulse" />
            <span className="font-bold tracking-tight text-[11px] sm:text-xs">guest@tharun-shell:~</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="p-1 rounded hover:bg-white/5 transition-colors text-gray-400 hover:text-[#39ff14]"
              title={isMaximized ? "Restore size" : "Maximize window"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setTerminalOpen(false)}
              className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable logs area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 terminal-scrollbar font-mono">
          {logs.map((log, index) => {
            if (log.type === "input") {
              return (
                <div key={index} className="text-[#39ff14]/85">
                  {log.text}
                </div>
              );
            }
            if (log.type === "error") {
              return (
                <div key={index} className="text-red-400 font-semibold pl-1">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={index} className="text-gray-200 pl-1">
                {log.text}
              </div>
            );
          })}
          <div ref={logsEndRef} />
        </div>

        {/* Input prompt line */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-t border-[#39ff14]/10"
        >
          <span className="text-[#39ff14] font-bold shrink-0 select-none">
            guest@tharun-portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-white font-mono outline-none border-none caret-[#39ff14]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
