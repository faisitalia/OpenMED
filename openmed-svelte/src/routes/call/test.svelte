<script>
  import { goto } from '$app/navigation';
</script>

<div class="mx-4 my-4">
  <h1 class="font-bold my-2">Prima di iniziare</h1>
  <p class="font-normal mb-8">Fai un test audio e video.</p>
  <div class="flex flex-col items-stretch bg-brandBlue-50/50 rounded-3xl p-5 mt-16">
    <div id="audio-test" class="my-4 grid grid-cols-[10%_auto] gap-y-2 gap-x-4">
      <div class="row-span-3 p-2">
        <img src="icons/audio-test-icon.svg" alt="a microphone" class="w-6 h-6" />
      </div>
      <div class="col-start-2 flex flex-row items-center justify-evenly">
        <span class="px-1">Prova a parlare!</span>
        <img class="px-1 inline-block" src="icons/check.svg" alt="✅" />
      </div>
      <div class="col-start-2 flex flex-row items-center justify-evenly">
        <div class="rounded-3xl bg-brandBlue-50 py-1 w-[calc(100%-5rem)] h-2">
          <div class="rounded-3xl relative -top-1 bg-brandBlue-500 w-[calc(100%-5rem)] h-2" />
        </div>
        <span class="material-icons-round">volume_up</span>
      </div>
      <select
        name="mic"
        id="select-mic"
        class="transition-all focus:outline-none appearance-none px-10 mx-4 py-1 rounded-3xl bg-white hover:bg-white/40"
      >
        <option value="Microfono Auricolare" disabled selected> Seleziona il tuo microfono </option>
      </select>
    </div>
    <div id="video-test" class="my-4 grid grid-cols-[10%_auto] gap-y-2 gap-x-4">
      <div class="row-span-3 p-2">
        <img src="icons/video-test-icon.svg" alt="a camera" class="w-6 h-6" />
      </div>
      <div class="col-start-2 flex flex-row items-center justify-evenly">
        <span class="px-1">Riesci a vederti?</span>
        <img class="px-1 inline-block" src="icons/red-cross.svg" alt="❌" />
      </div>
      <div
        class="place-self-center col-start-2 bg-brandText-500 w-32 h-32 text-white flex flex-col justify-center items-center"
      >
        Camera
      </div>
      <select
        name="video"
        id="select-video"
        class="transition-all focus:outline-none appearance-none px-10 mx-4 py-1 rounded-3xl bg-white hover:bg-white/40"
      >
        <option value="Microfono Auricolare" disabled selected> Fotocamera interna </option>
      </select>
    </div>
    <div
      class="place-self-center flex flex-row justify-center items-center bg-brandBlue-500 text-white px-6 py-2 rounded-3xl my-4 font-bold"
    >
      <span class="material-icons-round pr-6">call</span>
      <button on:click|preventDefault={() => goto(`/call?id=TODO`)}> Inizio chiamata </button>
    </div>
  </div>
</div>
