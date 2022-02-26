<script>
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>Tutto fatto! - OpenMed</title>
</svelte:head>

<div
  class="flex flex-col justify-center items-center rounded-3xl bg-brandBlue-50/40 p-10 mx-10 my-36"
>
  <h1 class="font-bold text-center">Appuntamento registrato correttamente</h1>
  <p class="my-2 text-center">Continua la navigazione</p>
  <div class="my-7" />
  <a href="/" class="bg-brandBlue-500 text-white text-center px-3 py-2 rounded-3xl font-bold">
    Torna in Home
  </a>
  <!-- <div on:click={() => goto('/appointments/edit')}>Crea Nuovo Appuntamento</div> -->

  <!-- Aggiungere il + in fondo a dx -->
</div>
<a
  href="/appointments/edit"
  class="fixed bottom-7 right-7 material-icons p-1 rounded-full bg-brandBlue-500 font-bold text-white"
>
  add
</a>
