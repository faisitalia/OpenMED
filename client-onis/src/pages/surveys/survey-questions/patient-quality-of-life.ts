const cols = [
  {
    value: 1,
    text: "Sempre",
  },
  {
    value: 2,
    text: "Qualche volta",
  },
  {
    value: 3,
    text: "Raramente",
  },
  {
    value: 4,
    text: "Per niente",
  },
];

export default {
  elements: [
    {
      type: "matrix",
      name: "patient-quality-of-like",
      title:
        "SEZIONE PAZIENTE. LIVELLO QUALITÀ DI VITA. STOMA QUALITY OF LIFE (QOL)",
      isRequired: true,
      columns: [...cols],
      rows: [
        {
          value: "patient-qol-anxiety-full",
          text: "Divento ansioso quando la sacca di raccolta è piena",
        },
        {
          value: "patient-qol-worried-detach",
          text: "Sono preoccupato che la sacca di raccolta possa staccarsi",
        },
        {
          value: "patient-qol-toilette-urgency",
          text: "Ho bisogno di sapere dove posso trovare la toilette più vicina",
        },
        {
          value: "patient-qol-smell",
          text: "Mi preoccupo che la sacca di raccolta faccia cattivo odore",
        },
        {
          value: "patient-qol-sound-inside",
          text: "Sono preoccupato del rumore che può provenire dalla sacca di raccolta",
        },
        {
          value: "patient-qol-rest",
          text: "Ho bisogno di riposo durante il giorno",
        },
        {
          value: "patient-qol-apparel",
          text: "La sacca di raccolta mi limita nella scelta dei vestiti da indossare",
        },
        {
          value: "patient-qol-tiredness",
          text: "Mi sento stanco durante il giorno",
        },
        {
          value: "patient-qol-sex",
          text: "A causa della stomia mi sento sessualmente meno attraente",
        },
        { value: "patient-qol-bad-sleep", text: "Dormo male durante la notte" },
        {
          value: "patient-qol-sound-outside",
          text: "Sono preoccupato che si senta il fruscio della sacca di raccolta",
        },
        {
          value: "patient-qol-embarassing",
          text: "Provo imbarazzo a causa della mia stomia",
        },
        {
          value: "patient-qol-night-out",
          text: "È difficile per me rimanere fuori casa durante la notte",
        },
        {
          value: "patient-qol-hide-sack",
          text: "È difficile nascondere il fatto che sono portatore di una sacca di raccolta",
        },
        {
          value: "patient-qol-friends",
          text: "Mi preoccupo che la mia condizione sia un problema per le persone che mi circondano",
        },
        {
          value: "patient-qol-no-contacts",
          text: "Evito contatti fisici ravvicinati con i miei amici",
        },
        {
          value: "patient-qol-others",
          text: "La mia stomia rende difficile il mio rapporto con altre persone",
        },
        {
          value: "patient-qol-meeting-people",
          text: "Ho paura di incontrare altre persone",
        },
        {
          value: "patient-qol-alone-feeling",
          text: "Mi sento solo anche quando sono insieme agli altri",
        },
        {
          value: "patient-qol-family",
          text: "Ho paura che la mia famiglia si senta imbarazzata",
        },
      ],
    },
  ],
};
