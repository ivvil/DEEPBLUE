<script>
    let x = 0;
    let y = 0;

    function moverBoton() {
        x = Math.floor(Math.random() * 300 - 150);
        y = Math.floor(Math.random() * 300 - 150);
    }

</script>

<svelte:head>
    <title>Hundir la Flota - Home</title>
    <meta name="description" content="Juego multijugador online de Hundir la Flota sin servidor" />
</svelte:head>

<section class="hero">
    <h1>
        HUNDIR LA FLOTA 🚢
    </h1>
    <p class="text-black">
        ¡Bienvenido comandante! Prepárate para sumergirte en batallas navales épicas y enfrentar a otros jugadores en línea. Conéctate y demuestra tu estrategia en este clásico juego reinventado.
    </p>
    <div class="buttons jugar_button">
		<a href="/game">
        <!-- svelte-ignore a11y_mouse_events_have_key_events -->
        <button on:mouseover={moverBoton} style="transform: translate({x}px, {y}px); rotate:{x}deg">
            Jugar Ahora
        </button>
	</a>
    </div>
</section>

<style>
    section.hero {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        padding: 2rem;
        text-align: center;
        background-size: cover;
        background-position: center;
    }

    h1 {
        font-size: 4rem;
        margin-bottom: 1rem;
        background-image: linear-gradient(45deg, #36d1dc, #5b86e5);
        background-clip: text;
        color: transparent;
        font-weight: 800;
        letter-spacing: 0.1em;
        position: relative;
    }
    
    h1::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px;
        display: block;
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, #36d1dc, #5b86e5);
        transform: scaleX(0);
        transform-origin: center;
        animation: expandLineFromCenter 0.8s forwards;
    }
    
    @keyframes expandLineFromCenter {
        to {
            transform: scaleX(1);
        }
    }
    
    p {
        font-size: 1.3rem;
        margin-bottom: 2rem;
        max-width: 700px;
        color: #000000;
        line-height: 1.5;
    }
    
    .buttons {
        display: flex;
        gap: 1rem;
    }
    
    button {
        padding: 0.8rem 2rem;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        background-image: linear-gradient(45deg, #36d1dc, #5b86e5);
        color: #fff;
        font-size: 1.1rem;
        font-weight: 600;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
    
    button:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
    }
    
    body::before {
        content: "";
        position: fixed;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        animation: moveBackground 20s linear infinite;
        z-index: -1;
    }
    
    @keyframes moveBackground {
        from { transform: translate(0, 0); }
        to { transform: translate(50px, 50px); }
    }
</style>
