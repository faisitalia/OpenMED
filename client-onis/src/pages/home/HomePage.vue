<script setup lang="ts"></script>

<template>
  <div id="welcome">
    <h1 class="text-6xl mt-4 mb-16 max-w-3xl">
      Osservatorio Nazionale su Incontinenza e Stomizzati
    </h1>
    <p class="text-lg max-w-xl">
      Ha l'obiettivo di raccogliere, in maniera sistematica e periodica diversi
      dati e restituirli in forma aggregata alla comunità scientifica e non
      solo. Un progetto sempre “in progress” che già nel medio periodo
      restituirà una fotografia fedele del campo d'indagine evidenziando, grazie
      ai dati, punti di forza e/o criticità del settore; un lavoro che potrà
      essere anche d'aiuto a chi si occupa di programmazione in sanità.
    </p>

    <div class="mt-8">
      <RouterLink
        to="/surveys"
        class="font-black text-xl underline underline-offset-8 text-secondary"
      >
        Scopri i Report
      </RouterLink>
    </div>
  </div>
</template>
