const genericColumns = [
  {
    value: 1,
    text: "Mai",
  },
  {
    value: 2,
    text: " ",
  },
  {
    value: 3,
    text: "A volte",
  },
  {
    value: 4,
    text: " ",
  },
  {
    value: 5,
    text: "Sempre",
  },
];

export default {
  elements: [
    {
      type: "matrix",
      name: "section-A",
      title: "SEZIONE A. SELF-CARE MAINTENANCE",
      isRequired: true,
      columns: [...genericColumns],
      rows: [
        {
          value: "patient-self-care-A-sack-adequate",
          text: "Controllare che la placca e il sacchetto di raccolta siano adeguati alle proprie necessità",
        },
        {
          value: "patient-self-care-A-sack-good-condition",
          text: "Controllare che la placca e il sacchetto di raccolta siano in buone condizioni prima dell'utilizzo",
        },
        {
          value: "patient-self-care-A-substitution",
          text: "Al momento della sostituzione, rimuovere la placca e il sacchetto di raccolta dall'alto verso il basso",
        },
        {
          value: "patient-self-care-A-washing",
          text: "Lavare con acqua e sapone la stomia e la cute intorno alla stomia",
        },
        {
          value: "patient-self-care-A-drying",
          text: "Asciugare tamponando la cute intorno alla stomia",
        },
        {
          value: "patient-self-care-A-plaque-adapting",
          text: "Adattare il foro della placca alla stomia",
        },
        {
          value: "patient-self-care-A-plaque-application",
          text: "Applicare dal basso verso l'alto la placca e il sacchetto di raccolta facendo aderire il bordo inferiore della placca al bordo inferiore della stomia",
        },
        {
          value: "patient-self-care-A-plaque-change",
          text: "Cambiare la placca e il sacchetto di raccolta secondo le informazioni ricevute",
        },
        {
          value: "patient-self-care-A-eating",
          text: "Mangiare e bere secondo le informazioni ricevute",
        },
      ],
    },
    {
      type: "matrix",
      name: "section-B",
      title: "SEZIONE B. SELF-CARE MONITORING",
      isRequired: true,
      columns: [...genericColumns],
      rows: [
        {
          value: "patient-self-care-B-spill-check",
          text: "Controllare eventuali fuoriuscite (feci o urine) dalla placca e dal sacchetto di raccolta",
        },
        {
          value: "patient-self-care-B-sack-check",
          text: "Controllare il riempimento del sacchetto di raccolta",
        },
        {
          value: "patient-self-care-B-ostomy-check",
          text: "Controllare la stomia",
        },
        {
          value: "patient-self-care-B-skin-check",
          text: "Controllare la cute intorno alla stomia",
        },
        {
          value: "patient-self-care-B-quantity-check",
          text: "Controllare la quantità e le eventuali variazioni nelle feci e urine",
        },
        {
          value: "patient-self-care-B-eating-check",
          text: "Controllare se ciò che mangia e ciò che beve modifica feci e urine (feci troppo liquide/solide, urine concentrate)",
        },
        {
          value: "patient-self-care-B-weight-check",
          text: "Controllare il proprio peso corporeo",
        },
        {
          value: "patient-self-care-B-supply-check",
          text: "Controllare di possedere un numero sufficiente di placche e sacchetti di raccolta",
        },
      ],
    },
    {
      type: "panel",
      name: "section-C",
      title: "SEZIONE C. SELF-CARE MANAGEMENT",
      state: "expanded",
      elements: [
        {
          name: "patient-self-care-C-speed",
          title:
            "L'ultima volta che ha avuto problemi alla stomia e/o alla cute intorno alla stomia...",
          type: "matrix",
          isRequired: true,
          columns: [
            {
              value: 0,
              text: "Non ho avuto problemi",
            },
            {
              value: 1,
              text: "Non velocemente",
            },
            {
              value: 2,
              text: " ",
            },
            {
              value: 3,
              text: "Abbastanza in fretta",
            },
            {
              value: 4,
              text: " ",
            },
            {
              value: 5,
              text: "Molto velocemente",
            },
          ],
          rows: [
            {
              value: "patient-self-care-C-speed",
              text: "... quanto velocemente li ha riconosciuti come problemi legati alla gestione della stomia?",
            },
          ],
        },
        {
          visibleIf:
            "{patient-self-care-C-speed} and {patient-self-care-C-speed.patient-self-care-C-speed}!=0",
          name: "patient-self-care-C-problems",
          type: "matrix",
          title:
            "Quando ha problemi con la stomia, quanto è probabile che lei metta in atto uno di questi comportamenti?",
          isRequired: true,
          columns: [
            {
              value: 1,
              text: "Per niente probabile",
            },
            {
              value: 2,
              text: " ",
            },
            {
              value: 3,
              text: "Abbastanza probabile",
            },
            {
              value: 4,
              text: " ",
            },
            {
              value: 5,
              text: "Molto probabile",
            },
          ],
          rows: [
            {
              value: "patient-self-care-C-problems-solved-by-eating",
              text: "Cambiare ciò che mangia o beve per far diminuire o scomparire il problema",
            },
            {
              value: "patient-self-care-C-problems-solved-by-management",
              text: "Cambiare la modalità di gestione della stomia e della cute intorno alla stomia",
            },
            {
              value: "patient-self-care-C-problems-solved-by-calling",
              text: "Chiamare il suo stomaterapista / infermiere / medico per avere dei consigli",
            },
            {
              value: "patient-self-care-C-problems-solved-by-asking-next-time",
              text: "Parlare al suo stomaterapista / infermiere / medico del problema al prossimo controllo",
            },
          ],
        },
      ],
    },
    {
      type: "matrix",
      name: "section-D",
      title: "SEZIONE D. SELF-CARE CONFIDENCE",
      isRequired: true,
      columns: [
        {
          value: 1,
          text: "Per niente capace",
        },
        {
          value: 2,
          text: " ",
        },
        {
          value: 3,
          text: "Abbastanza capace",
        },
        {
          value: 4,
          text: " ",
        },
        {
          value: 5,
          text: "Molto capace",
        },
      ],
      rows: [
        {
          value: "patient-self-confidence-good-condition",
          text: "Mantenere la sua stomia e cute intorno alla stomia in buone condizioni e senza problemi?",
        },
        {
          value: "patient-self-confidence-treatment-plan",
          text: "Seguire il piano di trattamento che le è stato dato per la gestione della sua stomia?",
        },
        {
          value: "patient-self-confidence-persistence",
          text: "Persistere nel seguire il piano di trattamento che le è stato dato per la gestione della sua stomia anche se difficile?",
        },
        {
          value: "patient-self-confidence-routine",
          text: "Tenere routinariamente sotto controllo le condizioni della sua stomia e cute intorno alla stomia?",
        },
        {
          value: "patient-self-confidence-monitoring",
          text: "Persistere nel tenere sotto controllo le condizioni della sua stomia e della cute intorno alla stomia anche quando è difficile?",
        },
        {
          value: "patient-self-confidence-skin-change",
          text: "Quando si verificano, riconoscere i cambiamenti della sua stomia e della cute intorno alla stomia?",
        },
        {
          value: "patient-self-confidence-danger-detection",
          text: "Valutare l'importanza dei problemi legati alla stomia e della cute intorno alla stomia?",
        },
        {
          value: "patient-self-confidence-soothing",
          text: "Fare qualcosa per alleviare i problemi legati alla stomia e cute intorno alla stomia?",
        },
        {
          value: "patient-self-confidence-find-remedies",
          text: "Persistere nel trovare un rimedio ai problemi legati alla stomia e cute intorno alla stomia anche quando è difficile?",
        },
        {
          value: "patient-self-confidence-try-remedies",
          text: "Valutare se un rimedio funziona per i problemi legati alla stomia ed alla cute intorno alla stomia?        ",
        },
      ],
    },
  ],
};
