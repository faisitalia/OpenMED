<script>
  import { goto } from "$app/navigation";
</script>

<h1>Appuntamento registrato correttamente</h1>
<sub>Continua la navigazione</sub>

<button on:click={() => goto('/')}>Torna in Home</button>

<div on:click={() => goto('/appointment')}>Crea Nuovo Appuntamento</div>
