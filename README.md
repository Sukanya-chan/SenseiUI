# 🥷 SenseiUI

SenseiUI is a Linux-first futuristic desktop terminal and system dashboard inspired by sci-fi HUD interfaces such as eDEX-UI.

## ⚙️ Current v0.1 features
- Electron desktop shell
- Frameless futuristic glass/HUD interface
- Real Linux shell through node-pty
- CPU, RAM, disk, network, battery and host telemetry
- Quick diagnostic commands
- Optional Python AI-backend boundary
- Linux AppImage/.deb packaging configuration
- Windows/macOS packaging configuration

## Requirements
- Linux (tested target: Kali/Debian family)
- Node.js + npm
- build-essential
- Python 3 (only needed for optional backend)

## Install on Kali
```bash
chmod +x scripts/install.sh scripts/build.sh
./scripts/install.sh
npm start
```

If node-pty fails to compile, install the current Debian/Kali Node.js development/build prerequisites and retry `npm install`.

## 👷‍♂️ Build
```bash
./scripts/build.sh
```

Linux artifacts are generated under `dist/`.

## 🏛️ Architecture
Electron main process -> preload IPC -> renderer UI.
node-pty connects the renderer terminal to a real shell.
systeminformation supplies telemetry.
The Python service is deliberately isolated and does not execute shell commands.

## 🔐 Security model
AI-generated commands must never be executed blindly. Future AI integration should classify commands by risk and require explicit user confirmation for privileged/destructive operations.

## ✨ About Me ✨

👋 Hi!, I'm Ms. Sukanya Chandra.
👩‍🔬 Engineering student specializing in Computer Science, Systems Architecture, and Cybersecurity. Focused on low-overhead environments, lightweight tooling, and deep-dive technical implementations.

## 🛠️ Tech Stack & Environment 🛠

*   **OS:** Arch Linux / Kali Linux (Bare Metal HDD Deployment)
*   **Languages:** C++, Python, Java, Bash, Verilog, HTML, CSS, JS(Three.js, node.js)
*   **Web & Architecture:** MEAN Stack, Web Design, Firebase, RTL to GDS Flow
*   **Core Focus:** Ethical Hacking, Data Structures & Algorithms, Theory of Computation
*   **Designing:** System emulator designed, Figama, Blender engine, PhotoShop

## 🪐 Current Focus & Specializations

*   **Hardware Modeling:** Digital circuit modeling and custom hardware design using Verilog.
*   **Systems Customization:** Maintaining a highly customized, performance-optimized workspace featuring a strict cyberpunk aesthetic.
*   **Security & Data:** Practical penetration testing, secure script development, and localized machine learning implementation.

## 🔗 Link
*   [![LinkedIn](https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original)](https://www.linkedin.com/in/sukanya-chandra-71b032435)
*   [![GitHub](https://jsdelivr.net)](https://github.com/Sukanya-chan)

## 🧭 Roadmap
v0.2: xterm.js terminal rendering, command history, themes.
v0.3: process viewer, filesystem browser, network diagnostics.
v0.4: local Ollama integration with command-risk classifier.
v1.0: polished desktop-shell mode and signed releases.

## 📁 License
****no License****

## 💭 Quote
*"Does human really need to be cured from their evilness?"*
