<template>
  <div id="doctor" class="absolute top-0 left-0 h-screen w-screen -z-10">
    <div class="h-screen flex justify-center items-center">
      Primo interlocutore
    </div>
  </div>
  <div class="p-4 h-screen w-screen flex flex-col justify-end items-center z-0">
    <div id="others" class="flex flex-row justify-evenly items-center">
      <div
        class="text-white rounded-xl w-36 h-36 flex flex-col justify-end items-start p-2 mx-2 my-8 bg-slate-400"
      >
        Stomaterapista
      </div>
      <div
        class="text-white rounded-xl w-36 h-36 flex flex-col justify-end items-start p-2 mx-2 my-8 bg-slate-400"
      >
        Paziente
      </div>
      <div
        class="text-white rounded-xl w-36 h-36 flex flex-col justify-end items-start p-2 mx-2 my-8 bg-slate-400"
      >
        Caregiver
      </div>
    </div>
    <div
      id="navbar"
      class="p-2 w-full flex flex-row justify-evenly items-center rounded-3xl bg-slate-500"
    >
      <div
        id="close"
        class="text-white text-3xl material-icons-round px-2 py-1"
      >
        call_end
      </div>
      <div
        id="close"
        class="text-white text-3xl material-icons-round px-2 py-1"
      >
        attach_file
      </div>
      <div
        id="close"
        class="text-white text-3xl material-icons-round px-2 py-1"
      >
        photo_camera
      </div>
      <div
        id="close"
        class="text-white text-3xl material-icons-round px-2 py-1"
      >
        folder
      </div>
    </div>
  </div>
</template>
