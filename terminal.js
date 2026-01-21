// Kitty Terminal Portfolio - Interactive Features

document.addEventListener('DOMContentLoaded', function () {
    // Typing effect for terminal content
    const terminalContent = document.getElementById('terminal-content');

    // Add smooth scroll behavior
    document.querySelector('.terminal-body').style.scrollBehavior = 'smooth';

    // Interactive command hints
    const quotes = [
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
        '"Knowledge is power." - Francis Bacon',
        '"The only way to do great work is to love what you do." - Steve Jobs',
        '"Simplicity is the soul of efficiency." - Austin Freeman',
        '"Make it work, make it right, make it fast." - Kent Beck'
    ];

    // Randomly select and display a quote
    const quoteElement = document.querySelector('.quote');
    if (quoteElement) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote;
    }

    // Add click listeners to terminal buttons
    const closeBtn = document.querySelector('.btn.close');
    const minimizeBtn = document.querySelector('.btn.minimize');
    const maximizeBtn = document.querySelector('.btn.maximize');

    closeBtn?.addEventListener('click', function () {
        if (confirm('Are you sure you want to close the terminal?')) {
            document.querySelector('.terminal-container').style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; color: #66fcf1; font-family: monospace; font-size: 20px;">Terminal closed. Refresh to reopen.</div>';
            }, 500);
        }
    });

    minimizeBtn?.addEventListener('click', function () {
        const terminal = document.querySelector('.terminal-container');
        terminal.style.transform = 'scale(0.1)';
        terminal.style.opacity = '0';
        setTimeout(() => {
            terminal.style.transform = 'scale(1)';
            terminal.style.opacity = '1';
        }, 1000);
    });

    maximizeBtn?.addEventListener('click', function () {
        const terminal = document.querySelector('.terminal-container');
        const isMaximized = terminal.dataset.maximized === 'true';

        if (!isMaximized) {
            terminal.style.maxWidth = '100%';
            terminal.style.width = '100%';
            terminal.style.height = '100vh';
            terminal.style.borderRadius = '0';
            terminal.dataset.maximized = 'true';
        } else {
            terminal.style.maxWidth = '1100px';
            terminal.style.width = '100%';
            terminal.style.height = 'auto';
            terminal.style.borderRadius = '12px';
            terminal.dataset.maximized = 'false';
        }
    });

    // Add fade-in animation
    const fadeInAnimation = `
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
        }
    `;

    const style = document.createElement('style');
    style.textContent = fadeInAnimation;
    document.head.appendChild(style);

    // Skill items hover sound effect (visual feedback)
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.2s ease';
        });
    });

    // Social links analytics (console log for demonstration)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const platform = this.querySelector('i').classList[1].replace('fa-', '');
            console.log(`Navigating to ${platform}...`);
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function (e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        const terminal = document.querySelector('.terminal-container');
        terminal.style.animation = 'rainbow 2s linear infinite';

        const rainbowAnimation = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;

        const easterEggStyle = document.createElement('style');
        easterEggStyle.textContent = rainbowAnimation;
        document.head.appendChild(easterEggStyle);

        // Add a new command line showing the easter egg
        const newCommandLine = document.createElement('div');
        newCommandLine.className = 'command-line';
        newCommandLine.innerHTML = `
            <span class="prompt">mufies@portfolio</span>:<span class="path">~</span>$ <span class="command">echo "🎉 Easter egg activated! 🎉"</span>
        `;

        const newOutput = document.createElement('div');
        newOutput.className = 'output';
        newOutput.innerHTML = '<p class="success">✨ You found the secret! The matrix has you... ✨</p>';

        const inputLine = document.querySelector('.input-line');
        terminalContent.insertBefore(newCommandLine, inputLine);
        terminalContent.insertBefore(newOutput, inputLine);

        setTimeout(() => {
            terminal.style.animation = '';
        }, 10000);
    }

    // Add current time to terminal
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        document.querySelector('.terminal-title').textContent = `mufies@portfolio:~ [${timeString}]`;
    }

    updateTime();
    setInterval(updateTime, 1000);

    // Smooth scroll to bottom on new content
    function scrollToBottom() {
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Initial scroll animation removed to prevent auto-scrolling on load

    // Add matrix rain effect on skill items
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#66fcf1';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    // Handle window resize
    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    console.log('%c✨ Welcome to mufies portfolio terminal! ✨', 'color: #66fcf1; font-size: 20px; font-weight: bold;');
    console.log('%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #45a29e; font-size: 14px;');
});
