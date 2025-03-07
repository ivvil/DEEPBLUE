<script>
	import { Vector2, Vector3 } from 'three';
    import {globals} from './Globals';
	import Ship from './Ship.svelte';

    // Aquí iteraremos por todos los barcos de globals, estan tamaños y cantidad de barcos
    // Ponerlos fuera del campo de juego y añadir boton para confirmar
  //

  let {camera} = $props();

  let pieces = [];

  for (let piece of globals.pieces) {
	var size = new Vector3(1, 2, piece.size);
	let models = globals.ships[piece.size];
	for (let i = 0; i < piece.amount; i++) {
	  pieces.push({model: models[Math.floor(Math.random() * models.length)], size: size});
	}
  }

  console.log(pieces);
</script>

{#each pieces as piece, idx}
  <Ship modelName={piece.model + '.glb'} size={piece.size} pos={new Vector3(8, 0, idx * 3 - 5)} {camera} />
{/each}
