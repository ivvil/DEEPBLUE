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
        Hundir la Flota
    </h1>
    <p class="text-black">
        ¡Bienvenido comandante! Prepárate para sumergirte en batallas navales épicas y enfrentar a otros jugadores en línea. Conéctate y demuestra tu estrategia en este clásico juego reinventado.
    </p>
    <div class="buttons jugar_button">
		<a href="/game">
		<button on:mouseover={moverBoton} style="transform: translate({x}px, {y}px); rotate:{x}deg">
            Jugar Ahora
        </button>
	</a>
    </div>
</section>

<style>
    section.hero {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        background: url({battleshipHeroFallback});
        background-size: cover;
        background-position: center;
        color: #fff;
        padding: 2rem;
        text-align: center;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
		background-image: linear-gradient(to left, blue, purple);
        background-clip: text;
        color: transparent;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        max-width: 600px;
    }

    .buttons {
        display: flex;
        gap: 1rem;
    }

    button {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
		background-image: linear-gradient(to left, blue, purple);
        color: #fff;
        font-size: 1rem;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }

    
</style>
