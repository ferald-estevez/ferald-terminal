/* =========================================
   FERALD TERMINAL // BLOGGER EDITION
   Adaptación segura para el tema de Blogger
========================================= */

(function () {

    /* No hacer nada si esta página no contiene la terminal. */
    if (!document.getElementById("output")) {
        return;
    }

    let history = [];
    let currentInput = "";
    let isProcessing = false;


    /* =========================================
       ARCHIVOS DE OCS
    ========================================= */

    const archivosOC = {

        "1": "ALEX",
        "01": "ALEX",

        "2": "NICK",
        "02": "NICK",

        "3": "NATSUKI",
        "03": "NATSUKI"

    };


    /* =========================================
       FICHAS DE PERSONAJES
    ========================================= */

    const fichas = {

        ALEX:
            "CHARACTER FILE // ALEX\n\n" +
            "EDAD: 21\n" +
            "ROL: PERSONAJE PRINCIPAL\n\n" +

            "PERSONALIDAD:\n" +
            "IRRITABLE / SARCÁSTICO / DESPREOCUPADO\n\n" +

            "RASGOS:\n" +
            "SOBREESTIMULACIÓN FRECUENTE\n" +
            "RESERVADO CON DESCONOCIDOS\n" +
            "DIFICULTAD PARA SOCIALIZAR\n" +
            "AVERSIÓN PARTICULAR HACIA LAS MUJERES\n\n" +

            "GUSTOS:\n" +
            "COCINA / PUZLES / JUEGOS DE DESTREZA\n" +
            "HUMOR FÍSICO Y ABSURDO\n\n" +

            "HÁBITOS:\n" +
            "FUMAR / BEBER / MORDER A NICK\n\n" +

            "MIEDOS:\n" +
            "FANTASMAS / OSCURIDAD\n\n" +

            "RELACIONES:\n" +
            "NICK\n" +
            "NATSUKI\n" +
            "MEL\n" +
            "ANGEL\n\n" +

            "ESTADO:\n" +
            "ACTIVO",


        NICK:
            "CHARACTER FILE // NICK\n\n" +
            "EDAD: 25\n" +
            "ROL: PERSONAJE PRINCIPAL\n\n" +

            "PERSONALIDAD:\n" +
            "CARISMÁTICO / COQUETO / EXPLOSIVO\n\n" +

            "RASGOS:\n" +
            "PROTECTOR\n" +
            "IMPULSIVO\n" +
            "DIFICULTAD PARA COMPROMETERSE\n" +
            "VIOLENCIA INTERNALIZADA\n\n" +

            "GUSTOS:\n" +
            "MECÁNICA / AUTOMÓVILES\n\n" +

            "HÁBITOS:\n" +
            "BEBER / SALIR / CONDUCTAS IMPULSIVAS\n\n" +

            "MIEDOS:\n" +
            "SOLEDAD / PERDER A SUS SERES QUERIDOS\n" +
            "SU PADRE / BICHOS GRANDES\n\n" +

            "RELACIONES:\n" +
            "MATT\n" +
            "NATSUKI\n" +
            "ALEX\n" +
            "JANN\n\n" +

            "ESTADO:\n" +
            "ACTIVO",


        NATSUKI:
            "CHARACTER FILE // NATSUKI\n\n" +
            "EDAD: 21\n" +
            "ROL: PERSONAJE PRINCIPAL\n\n" +

            "PERSONALIDAD:\n" +
            "CUIDADORA / ESPONTÁNEA / EXPLOSIVA\n\n" +

            "RASGOS:\n" +
            "ATENTA CON SUS CERCANOS\n" +
            "PROTECTORA\n" +
            "AUTOEXIGENTE\n" +
            "DIFICULTAD PARA MOSTRARSE VULNERABLE\n\n" +

            "GUSTOS:\n" +
            "TERROR / GORE / CASOS CRIMINALES\n" +
            "ARTE / CULTURA DE INTERNET\n\n" +

            "HÁBITOS:\n" +
            "DATOS OSCUROS ALEATORIOS\n" +
            "RISA ESCANDALOSA\n" +
            "GOLPEAR A SUS AMIGOS AL REÍRSE\n\n" +

            "MIEDOS:\n" +
            "HUMILLACIÓN / VULNERABILIDAD EMOCIONAL\n\n" +

            "RASGO CARACTERÍSTICO:\n" +
            "PINCHE DE ESTRELLA\n\n" +

            "RELACIONES:\n" +
            "ALEX\n" +
            "NICK\n" +
            "NORA\n" +
            "TINA\n" +
            "NATSU\n\n" +

            "ESTADO:\n" +
            "ACTIVO"

    };

    /* =========================================
       SISTEMA DE SONIDO
    ========================================= */

    let audioContext;

    function initAudio() {

        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

    }


    function playKeySound() {

        initAudio();

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            180,
            audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            0.06,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.04
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.04
        );

    }

    function playBackspaceSound() {

        initAudio();

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            120,
            audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            0.035,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.06
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.06
        );

    }

    function playClearSound() {

        initAudio();

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            500,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            120,
            audioContext.currentTime + 0.18
        );

        gain.gain.setValueAtTime(
            0.045,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.18
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.18
        );

    }

    function playEnterSound() {

        initAudio();

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            600,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            900,
            audioContext.currentTime + 0.08
        );

        gain.gain.setValueAtTime(
            0.07,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.1
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.1
        );

    }

    /* =========================================
       EFECTO MÁQUINA DE ESCRIBIR
    ========================================= */

    function typeText(text, speed = 30, callback) {

        isProcessing = true;

        let index = 0;

        const typingInterval = setInterval(function() {

            history[history.length - 1] = text.substring(0, index);

            renderTerminal();

            index++;

            if (index > text.length) {

                clearInterval(typingInterval);

                isProcessing = false;

                renderTerminal();

                if (callback) {
                    callback();
                }

            }

        }, speed);

    }

    /* =========================================
       SISTEMA DE LA TERMINAL
    ========================================= */

    function renderTerminal() {

        const output = document.getElementById("output");
        const currentInputElement = document.getElementById("current-input");
        const currentLine = document.getElementById("current-line");

        output.textContent = history.join("\n");

        currentInputElement.textContent = currentInput;

        if (isProcessing) {
            currentLine.style.display = "none";
        } else {
            currentLine.style.display = "block";
        }

        const screen = document.querySelector(".screen");

        screen.scrollTop = screen.scrollHeight;
    }


    /* =========================================
       ESCRITURA
    ========================================= */

    function writeKey(letter) {

        if (isProcessing) return;

        currentInput += letter;

        playKeySound();

        renderTerminal();
    }


    function deleteKey() {

        if (isProcessing) return;

        currentInput = currentInput.slice(0, -1);

        playBackspaceSound();

        renderTerminal();
    }


    /* =========================================
       LIMPIAR PANTALLA
    ========================================= */

    function clearScreen() {

        history = [];
        currentInput = "";

        playClearSound();

        renderTerminal();
    }


    /* =========================================
       ANIMACIÓN DE CARGA
    ========================================= */

    function loadingAnimation(
        finalMessage,
        loadingText,
        typeSpeed = 35,
        foundMessage = "ARCHIVO ENCONTRADO.\nCARGANDO DATOS..."
    ) {

        isProcessing = true;

        let progress = 0;

        const loadingInterval = setInterval(function() {

            progress += 10;

            let filled = "█".repeat(progress / 10);
            let empty = "░".repeat(10 - progress / 10);

            history[history.length - 1] =
                loadingText + "\n" +
                "[" + filled + empty + "] " + progress + "%";

            renderTerminal();


            if (progress >= 100) {

                clearInterval(loadingInterval);

                setTimeout(function() {

                    history.push(foundMessage);

                    renderTerminal();

                    setTimeout(function() {

                        history.push("");

                        typeText(
                            finalMessage,
                            typeSpeed,
                            function() {
                                renderTerminal();
                            }
                        );

                    }, 700);

                }, 400);

            }

        }, 100);

    }


    /* =========================================
       EJECUTAR COMANDOS
    ========================================= */

    function executeCommand() {

        if (isProcessing) return;

        const command = currentInput.trim().toUpperCase();

        if (command === "") {
            return;
        }


        /* CLEAR */

        if (command === "CLEAR") {

            clearScreen();

            return;
        }


        /* Guardar comando */

        history.push("> " + command);

        currentInput = "";


        /* =====================================
           ABOUT
        ===================================== */

        if (command === "ABOUT") {

            history.push(
                "ACCEDIENDO AL PERFIL DE USUARIO..."
            );

            renderTerminal();

            loadingAnimation(

                "USER PROFILE // FERALD\n\n" +

                "NOMBRE: FERALD\n" +
                "EDAD: 23\n" +
                "LOCACIÓN: CHILE\n\n" +

                "OCUPACIÓN: DISEÑO GRÁFICO\n\n" +

                "INTERESES:\n" +
                "ILUSTRACIONES\n" +
                "ANIMACIÓN\n" +
                "HTF\n\n" +

                "CONTEO DE OCS: DEMASIADOS\n\n" +

                "ESTATUS: ACTIVO",

                "ACCEDIENDO AL PERFIL DE USUARIO..."

            );

            return;
        }


        /* =====================================
           HELP
        ===================================== */

        if (command === "HELP") {

        history.push("");

        typeText(
            "AVAILABLE COMMANDS:\n\n" +
            "ABOUT\n" +
            "OCS\n" +
            "ART\n" +
            "BLOG\n" +
            "CLEAR",
            40,
            function() {
                renderTerminal();
            }
        );

        return;

    }


        /* =====================================
           OCS
        ===================================== */

        else if (command === "OCS") {

        history.push("");

        typeText(

            "OC DATABASE\n\n" +

            "PERSONAJES PRINCIPALES:\n\n" +

            "[01] ALEX\n" +
            "[02] NICK\n" +
            "[03] NATSUKI\n\n\n" +

            "OTROS PERSONAJES:\n\n" +

            "[04] MATT\n" +
            "[05] JANN\n" +
            "[06] KALED\n" +
            "[07] MEL\n" +
            "[08] NATSU\n" +
            "[09] NORA\n" +
            "[10] TINA\n" +
            "[11] ANGEL\n" +
            "[12] BERNARDO\n\n\n" +

            "CONTEO TOTAL: DEMASIADOS\n\n" +

            "SELECCIONA UN ARCHIVO...",

            35,

            function() {
                renderTerminal();
            }

        );

        return;

    }


        /* =====================================
           ARCHIVOS DE ALEX, NICK Y NATSUKI
        ===================================== */

        else if (archivosOC[command]) {

        const personaje = archivosOC[command];

        history.push("");

        loadingAnimation(
            fichas[personaje],
            "ACCEDIENDO AL ARCHIVO " + command + "...",
            35,
            "ARCHIVO " + command + " ENCONTRADO.\nCARGANDO DATOS..."
        );

        return;

    }


        /* =====================================
           NÚMERO SIN ARCHIVO
        ===================================== */

       else if (/^\d+$/.test(command)) {

        history.push("");

        typeText(
            "ARCHIVO NO DISPONIBLE.\n\n" +
            "ESTE PERSONAJE NO CUENTA CON\n" +
            "UN ARCHIVO PÚBLICO.",
            25,
            function() {
                renderTerminal();
            }
        );

        return;

    }


        /* =====================================
           ART
        ===================================== */

        else if (command === "ART") {

        history.push("");

        typeText(
            "ART ARCHIVE\n\n" +
            "DATABASE UNDER CONSTRUCTION...",
            30,
            function() {
                renderTerminal();
            }
        );

        return;

    }


        /* =====================================
           BLOG
        ===================================== */

        else if (command === "BLOG") {

        history.push("");

        typeText(
        "BLOG DIRECTORY\n\n" +
        "ACCESSING ARCHIVE...",
        35,
        function() {
            renderTerminal();
        }
    );

        return;

    }

    /* =====================================
       COMANDO SECRETO // FERALD
    ===================================== */

    else if (command === "FERALD") {

        history.push("");

        isProcessing = true;

        const secretText =
            "HUSMEANDO SOBRE MI...\n\n" +
            "NO OBTENDRÁS NADA MÁS...\n\n" +
            "NADA!";

        let index = 0;


        /* =====================================
           ESCRITURA IRREGULAR
        ===================================== */

        function escribirFerald() {

            if (index >= secretText.length) {

                setTimeout(iniciarGlitch, 350);

                return;
            }

            history[history.length - 1] =
                secretText.substring(0, index);

            renderTerminal();

            index++;

            const randomDelay =
                Math.floor(Math.random() * 150) + 30;

            setTimeout(escribirFerald, randomDelay);
        }


        /* =====================================
           GLITCH
        ===================================== */

        function iniciarGlitch() {

            let glitchFrames = 0;

            const glitchCharacters =
                "@#$%&!?░▒▓█<>/\\|~^";

            const glitchInterval = setInterval(function() {

                let glitchText = "";

                const mode = Math.floor(Math.random() * 3);


                /* Puntos */

                if (mode === 0) {

                    glitchText =
                        ".".repeat(
                            Math.floor(Math.random() * 20) + 20
                        );

                }


                /* Caracteres corruptos */

                else if (mode === 1) {

                    for (let i = 0; i < 45; i++) {

                        glitchText +=
                            glitchCharacters[
                                Math.floor(
                                    Math.random() *
                                    glitchCharacters.length
                                )
                            ];

                    }

                }


                /* Barra de progreso loca */

                else {

                    const randomProgress =
                        Math.floor(Math.random() * 101);

                    const filled =
                        "█".repeat(
                            Math.floor(randomProgress / 10)
                        );

                    const empty =
                        "░".repeat(
                            10 - Math.floor(randomProgress / 10)
                        );

                    glitchText =
                        "SYSTEM ERROR\n\n" +
                        "[" +
                        filled +
                        empty +
                        "] " +
                        randomProgress +
                        "%";

                }


                history[history.length - 1] = glitchText;

                renderTerminal();

                glitchFrames++;


                /* Después de varios frames, termina */

                if (glitchFrames >= 12) {

                    clearInterval(glitchInterval);

                    setTimeout(function() {

                        history[history.length - 1] =
                            "........................................";

                        renderTerminal();


                        setTimeout(function() {

                            history[history.length - 1] = "";

                            isProcessing = false;

                            renderTerminal();

                        }, 250);

                    }, 100);

                }

            }, 70);

        }


        escribirFerald();

        return;

    }

        /* =====================================
           COMANDO DESCONOCIDO
        ===================================== */

       else {

        history.push("");

        typeText(
            "COMMAND NOT RECOGNIZED.\n" +
            "TYPE HELP FOR AVAILABLE COMMANDS.",
            30,
            function() {
                renderTerminal();
            }
        );

        return;

    }

        renderTerminal();

    }

    /* =========================================
       TECLADO FÍSICO
    ========================================= */

    document.addEventListener("keydown", function(event) {

        if (!document.getElementById("output")) {
            return;
        }

        const key = event.key.toUpperCase();

        /* Letras y números */

        if (
            key.length === 1 &&
            (
                (key >= "A" && key <= "Z") ||
                (key >= "0" && key <= "9")
            )
        ) {

            event.preventDefault();

            writeKey(key);
        }

        /* Espacio */

        if (event.key === " ") {

            event.preventDefault();

            writeKey(" ");
        }

        /* Backspace */

        if (event.key === "Backspace") {

            event.preventDefault();

            deleteKey();
        }

        /* Enter */

        if (event.key === "Enter") {

            event.preventDefault();

            playEnterSound();

            executeCommand();
        }

    });

    /* Funciones utilizadas por los botones del teclado virtual. */
    window.writeKey = writeKey;
    window.deleteKey = deleteKey;
    window.clearScreen = clearScreen;
    window.executeCommand = executeCommand;
    window.playEnterSound = playEnterSound;
   })();
