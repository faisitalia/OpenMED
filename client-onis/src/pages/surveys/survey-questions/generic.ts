export default {
  elements: [
    {
      type: "html",
      html: '<p class="text-onPrimary">Stai per compilare un questionario che [...]. Più informazioni su [...].</p>',
    },
    {
      type: "html",
      html: '<p class="text-onPrimary">In questa sezione chiediamo alcune informazioni su di te.</p>',
    },
    {
      name: "generic-birth-date",
      title: "Data di Nascita",
      type: "text",
      inputType: "date",
      isRequired: true,
    },
    {
      name: "generic-sex",
      title: "Sesso",
      type: "radiogroup",
      choices: [
        { value: "m", text: "M" },
        { value: "f", text: "F" },
      ],
      isRequired: true,
    },
    {
      name: "generic-family",
      title: "Quante persone vivono nel suo nucleo familiare?",
      type: "text",
      validators: [
        {
          type: "numeric",
          minValue: 1,
          text: "Devi inserire un valore numerico (>= 1)",
        },
      ],
      isRequired: true,
    },
    {
      name: "generic-partners",
      title: "Stato Civile",
      type: "radiogroup",
      choices: [
        { value: "with-partner", text: "Con partner" },
        { value: "no-partner", text: "Senza partner" },
      ],
      isRequired: true,
    },
    {
      name: "generic-job",
      type: "radiogroup",
      title: "Occupazione (attuale):",
      choices: [
        { value: "job", text: "Occupato" },
        { value: "no-job", text: "Disoccupato" },
        { value: "retired", text: "Pensionato" },
        { value: "other", text: "Altro" },
      ],
      isRequired: true,
    },
    {
      name: "generic-job-other",
      type: "text",
      title: "Altra occupazione (specificare)",
      visibleIf: "{job}='other'",
      isRequired: true,
    },
    {
      name: "generic-education",
      title: "Titolo di Studio",
      type: "radiogroup",
      choices: [
        { value: "Elementare", text: "Elementare" },
        { value: "Medie", text: "Medie" },
        { value: "Professionali", text: "Professionali" },
        { value: "Superiori", text: "Superiori" },
        { value: "Laurea", text: "Laurea" },
      ],
      isRequired: true,
    },
    {
      name: "generic-distance",
      title:
        "Distanza tra la propria residenza e l'ambulatorio di stomaterapia nel quale è seguito? (in km)",
      type: "text",
      validators: [
        {
          type: "numeric",
          minValue: 1,
          text: "Devi inserire un valore numerico (>= 1)",
        },
      ],
      isRequired: true,
    },
  ],
};
