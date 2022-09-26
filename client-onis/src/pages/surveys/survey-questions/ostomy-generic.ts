export default {
  elements: [
    {
      type: "html",
      html: '<p class="text-onPrimary">Dati clinici stomia</p>',
    },
    {
      name: "ostomy-type",
      title: "Che tipo di stomia ha?",
      type: "radiogroup",
      choices: [
        { value: "colostomy", text: "Colostomia" },
        { value: "ileostomy", text: "Ileostomia" },
        { value: "urostomy", text: "Urostomia" },
      ],
      isRequired: true,
    },
    {
      name: "ostomy-is-permanent",
      label: "La stomia è temporanea o permanente?",
      type: "boolean",
      labelTrue: "Permanente",
      labelFalse: "Temporanea",
      isRequired: true,
    },
    {
      name: "ostomy-had-drawing",
      label: "È stato effettuato il disegno pre-operatorio?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "ostomy_time",
      title: "Da quanto tempo ha la stomia?",
      type: "multipletext",
      isRequired: true,
      items: [
        { name: "months", title: "Mesi" },
        { name: "years", title: "Anni" },
      ],
      validators: [
        {
          type: "expression",
          expression: "{ostomy_time.months} > 0 or {ostomy_time.years} > 0",
          text: "Scegli un valore valido (almeno un mese)",
        },
        {
          type: "expression",
          expression: "{ostomy_time.months} <= 12",
          text: "Scegli un valore valido (campo mese non valido)",
        },
      ],
    },
    {
      name: "ostomy-is-oncology",
      title: "La patologia causa di confezionamento era di natura...",
      type: "boolean",
      labelTrue: "Oncologica",
      labelFalse: "Non Oncologica",
      isRequired: true,
    },
    {
      name: "ostomy-therapies",
      title:
        "Ha effettuato terapie complementari prima o dopo l'intervento di confezionamento della stomia?",
      type: "radiogroup",
      choices: [
        { value: "n", text: "No" },
        { value: "immunotherapy", text: "Immunoterapia" },
        { value: "chemotherapy", text: "Chemioterapia" },
        { value: "radiotherapy", text: "Radioterapia" },
        { value: "other", text: "Altro" },
      ],
      isRequired: true,
    },
    {
      name: "ostomy-therapies-other",
      type: "text",
      title: "Altra terapia (specificare)",
      visibleIf: "{ostomy-therapies}='other'",
      isRequired: true,
    },
    {
      name: "ostomy-has-other-diseases",
      title: "Ha altre patologie?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "ostomy-bmi",
      title: "BMI? peso in kg / (statura in metri ^2)",
      type: "radiogroup",
      choices: [
        { value: "underweight-hard", text: "Sottopeso severo (< 16)" },
        { value: "underweight", text: "Sottopeso (da 16 a 18,4)" },
        { value: "normal", text: "Normale (da 18,5 a 24,9)" },
        { value: "overweight", text: "Sovrappeso (da 25 a 29,9)" },
        { value: "obesity-1", text: "Obesità di primo grado (da 30 a 34,9)" },
        { value: "obesity-2", text: "Obesità di secondo grado (da 35 a 39,9)" },
        { value: "obesity-3", text: "Obesità di terzo grado (≥ 40)" },
      ],
      isRequired: true,
    },
  ],
};
