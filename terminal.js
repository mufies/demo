// Kitty Terminal Portfolio - Interactive Features

document.addEventListener('DOMContentLoaded', function () {
    const terminalContent = document.getElementById('terminal-content');
    const cmdInput = document.getElementById('cmd-input');
    const terminalBody = document.querySelector('.terminal-body');

    // Focus input on click anywhere in terminal
    document.querySelector('.terminal-container').addEventListener('click', () => {
        cmdInput.focus();
    });

    // Initial focus
    cmdInput.focus();

    // Show initial welcome message with typewriter effect
    const welcomeMsg = document.getElementById('welcome-msg');
    const welcomeHTML = `
        <div style="margin-bottom: 20px;">
            <p>Welcome to Mufies Terminal Portfolio!</p>
            <p>Type <span class="cmd">help</span> to see available commands.</p>
            <p>Type <span class="cmd">fastfetch</span> for system info.</p>
        </div>
    `;
    typeWriter(welcomeMsg, welcomeHTML, 0);

    function typeWriter(element, html, index) {
        // Simple approach: process HTML tags instantly, type text char by char
        // But for rich HTML, it's easier to just fade in lines or use a simpler text approach.
        // Given the requirement "animation... when user join", a line-by-line reveal is safer for HTML.

        element.style.opacity = '0';
        element.innerHTML = html;

        // CSS Animation for fade-in effect on content
        element.style.animation = 'fadeIn 1s forwards';
    }

    // Command History
    let commandHistory = [];
    let historyIndex = -1;

    // Command Handler
    cmdInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            if (command) {
                executeCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            } else {
                createCommandLine('', '');
            }
            this.value = '';
            scrollToBottom();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                this.value = '';
            }
        }
    });

    // Typing Animation Effect
    let typingTimer;
    cmdInput.addEventListener('input', () => {
        cmdInput.classList.add('typing-pulse');
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            cmdInput.classList.remove('typing-pulse');
        }, 100);
    });

    function executeCommand(cmd) {
        createCommandLine(cmd);

        const parts = cmd.split(' ');
        const mainCommand = parts[0].toLowerCase();
        const args = parts.slice(1);

        let output = '';

        switch (mainCommand) {
            case 'help':
                output = `
                    <div class="help-grid">
                        <div><span class="cmd">about</span> - Display profile information</div>
                        <div><span class="cmd">skills</span> - List technical skills</div>
                        <div><span class="cmd">projects</span> - View portfolio projects</div>
                        <div><span class="cmd">social</span> - Connect via social media</div>
                        <div><span class="cmd">fastfetch</span> - System information</div>
                        <div><span class="cmd">clear</span> - Clear terminal</div>
                        <div><span class="cmd">whoami</span> - Display username</div>
                        <div><span class="cmd">date</span> - Display current time</div>
                    </div>
                `;
                break;
            case 'about':
                output = `
                    <div class="profile-section">
                        <img src="img/haha.jpg" alt="Anime Profile" class="anime-profile">
                        <div class="profile-info">
                            <p><span class="label">Name:</span> Tri Mai - チマイ</p>
                            <p><span class="label">Role:</span> Full-Stack Developer</p>
                            <p><span class="label">Location:</span> Vietnam 🇻🇳</p>
                            <p><span class="label">Status:</span> <span class="status-online">● Online</span> - Ready to code!</p>
                            <p class="quote" style="margin-top: 10px;">"Code is like humor. When you have to explain it, it's bad."</p>
                        </div>
                    </div>
                `;
                break;
            case 'skills':
                output = `
                    <div class="skills-grid">
                        <div class="skill-item"><i class="fa-brands fa-java"></i><span>Java</span></div>
                        <div class="skill-item"><i class="fa-solid fa-code"></i><span>.NET</span></div>
                        <div class="skill-item"><i class="fa-brands fa-angular"></i><span>Angular</span></div>
                        <div class="skill-item"><i class="fa-brands fa-react"></i><span>React</span></div>
                        <div class="skill-item"><i class="fa-brands fa-js"></i><span>JavaScript</span></div>
                        <div class="skill-item"><i class="fa-brands fa-git-alt"></i><span>Git</span></div>
                        <div class="skill-item"><i class="fa-brands fa-docker"></i><span>Docker</span></div>
                        <div class="skill-item"><i class="fa-solid fa-database"></i><span>SQL</span></div>
                    </div>
                `;
                break;
            case 'projects':
                output = `
                    <div class="project-item">
                        <p class="project-title">Ride-Hailing Application</p>
                        <p class="project-desc">╰─➤ Full-stack ride-hailing app with real-time GPS tracking, WebSocket communication, and map integration.</p>
                        <p class="project-tech">Stack: Angular 18+, Java, Spring Boot, WebSocket, TrackAsia Maps</p>
                    </div>
                    <div class="project-item">
                        <p class="project-title">Kita - Social Music Platform</p>
                        <p class="project-desc">╰─➤ Music streaming with real-time collaborative listening and chat.</p>
                        <p class="project-tech">Stack: ASP.NET Core 8, React 19.2, PostgreSQL, SignalR</p>
                    </div>
                `;
                break;
            case 'social':
                output = `
                    <p class="success">✓ Establishing connections...</p>
                    <div class="social-links">
                        <a href="https://github.com/mufies" target="_blank" class="social-link"><i class="fa-brands fa-github"></i><span>github.com/mufies</span></a>
                        <a href="https://www.facebook.com/100090675770318" target="_blank" class="social-link"><i class="fa-brands fa-facebook"></i><span>facebook.com/mufies</span></a>
                        <a href="https://www.instagram.com/trimai._05/" target="_blank" class="social-link"><i class="fa-brands fa-instagram"></i><span>instagram.com/trimai._05</span></a>
                        <a href="https://www.youtube.com/channel/UCiNPiHEm3Jawy6EPqiEd1CA" target="_blank" class="social-link"><i class="fa-brands fa-youtube"></i><span>youtube.com/@tmai14</span></a>
                        <a href="https://steamcommunity.com/id/flucc/" target="_blank" class="social-link"><i class="fa-brands fa-steam"></i><span>steam/flucc</span></a>
                    </div>
                `;
                break;
            case 'clear':
                const inputParent = cmdInput.closest('.input-line');
                terminalContent.innerHTML = '';
                terminalContent.appendChild(inputParent);
                // Re-focus after clear
                cmdInput.focus();
                return;
            case 'whoami':
                output = 'mufies';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'echo':
                output = args.join(' ');
                break;
            case 'fastfetch':
                output = generateFastFetch();
                break;
            default:
                output = `Command not found: ${mainCommand}. Type <span class="cmd">help</span> for available commands.`;
        }

        if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'output output-animated'; // Add animation class
            outputDiv.innerHTML = output;
            terminalContent.insertBefore(outputDiv, cmdInput.closest('.input-line'));
        }
    }

    function createCommandLine(cmd) {
        const cmdLine = document.createElement('div');
        cmdLine.className = 'command-line';
        cmdLine.innerHTML = `
            <div class="prompt-line-1">
                <span class="kali-symbol">┌──(</span>
                <img src="img/terminal_line_icon.png" class="prompt-icon-inline">
                <span class="kali-user">mufies</span>
                <span class="kali-symbol">㉿</span>
                <span class="kali-host">portfolio</span>
                <span class="kali-symbol">)-[</span>
                <span class="path">~</span>
                <span class="kali-symbol">]</span>
            </div>
            <div class="prompt-line-2">
                <span class="kali-symbol">└─$</span>
                <span class="command" style="margin-left: 8px;">${escapeHtml(cmd)}</span>
            </div>
        `;
        terminalContent.insertBefore(cmdLine, cmdInput.closest('.input-line'));
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function generateFastFetch() {
        return `
            <div class="fastfetch-container">
                <div class="ascii-logo">
                   <pre>
          /\\
         /  \\
        /    \\      
       /      \\     
      /   ,,   \\    
     /   |  |   \\   
    /_-''    ''-_\\  
                   </pre>
                </div>
                <div class="fetch-info">
                    <div><span class="key">User</span><span class="separator">:</span> mufies@portfolio</div>
                    <div><span class="key">OS</span><span class="separator">:</span> Arch Linux x86_64</div>
                    <div><span class="key">Host</span><span class="separator">:</span> Portfolio v2.0</div>
                    <div><span class="key">Kernel</span><span class="separator">:</span> 6.8.9-arch1-1</div>
                    <div><span class="key">Uptime</span><span class="separator">:</span> Forever</div>
                    <div><span class="key">Shell</span><span class="separator">:</span> ZSH 5.9</div>
                    <div><span class="key">Resolution</span><span class="separator">:</span> 1920x1080</div>
                    <div><span class="key">DE</span><span class="separator">:</span> Plasma 6.0</div>
                    <div><span class="key">WM</span><span class="separator">:</span> KWin</div>
                    <div class="palette">
                        <span class="color c1"></span><span class="color c2"></span><span class="color c3"></span><span class="color c4"></span><span class="color c5"></span>
                    </div>
                </div>
            </div>
        `;
    }

    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});
