export default {
  elements: [
    {
      type: "html",
      html: '<p class="text-onPrimary">In questa sezione ti chiediamo informazioni generiche sulla gestione della stomia</p>',
    },
    {
      name: "ostomy-management-is-indipendent",
      title: "Si sente autonomo nella gestione della stomia?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "ostomy-management-has-help",
      title: "C'è qualcuno che la aiuta nella gestione della stomia?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "ostomy-management-help-who",
      type: "text",
      title: "Chi la aiuta nella gestione della stomia?",
      visibleIf: "{ostomy-management-has-help}=true",
      isRequired: true,
    },
    {
      name: "ostomy-management-independence",
      title:
        "Con quale modalità il caregiver si sostituisce nell'esecuzione dello stomacare?",
      type: "checkbox",
      choices: [
        { value: "device-removal", text: "Rimozione dispositivo" },
        { value: "washing", text: "Detersione" },
        { value: "drying", text: "Asciugatura della cute" },
        { value: "device-cut", text: "Ritaglio del dispositivo" },
        { value: "device-apply", text: "Applicazione del dispositivo" },
      ],
      isRequired: true,
      hasNone: true,
    },
    {
      name: "ostomy-management-likert",
      title:
        "Considerate le fasi dello stomacare la scala di Likert: indicate la vostra scelta",
      type: "radiogroup",
      choices: [
        { value: "1", text: "Sono autonomo" },
        { value: "2", text: "Esegue solo supervisione" },
        {
          value: "3",
          text: "Parzialmente dipendente (aiuta il paziente sino a tre fasi dello stoma care)",
        },
        {
          value: "4",
          text: "Completamente dipendente (sostituisce il paziente in tutte le fasi dello stoma care)",
        },
      ],
      isRequired: true,
    },
  ],
};
