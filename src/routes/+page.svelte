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
    <h1 class="text-black hover:rotate-720 transition-transform duration-500">
        Hundir la Flota
    </h1>
    <p class="text-black hover:scale-70 transition-transform duration-500">
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
		animation: colorChange 5s infinite;
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
        background-color: #007bff;
        color: #fff;
        font-size: 1rem;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }
	@keyframes colorChange {
            0% { color: hsl(0, 100%, 50%); }
            50% { color: hsl(180, 100%, 50%); }
            100% { color: hsl(360, 100%, 50%); }
        }
    @media (max-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }
        p {
            font-size: 1rem;
        }
    }
</style>
