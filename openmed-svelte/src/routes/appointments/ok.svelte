<script>
  import { goto } from "$app/navigation";
</script>

<svelte:head>
  <title>Tutto fatto! - OpenMed</title>
</svelte:head>

<h1>Appuntamento registrato correttamente</h1>
<p>Continua la navigazione</p>

<button on:click={() => goto('/')}>Torna in Home</button>

<div on:click={() => goto('/appointments/new')}>Crea Nuovo Appuntamento</div>
