const cols = [
  {
    value: true,
    text: "Sì",
  },
  {
    value: false,
    text: "No",
  },
];

export default {
  elements: [
    {
      type: "html",
      html: '<p class="text-onPrimary">Caratteristiche strutturali dell\'ambulatorio per persone con stomia</p>',
    },
    {
      type: "matrix",
      name: "structure-nurse",
      title: "Nell'ambulatorio sono presenti le seguenti figure?",
      isRequired: true,
      columns: [...cols],
      rows: [
        {
          value: "structure-nurse-ostomotherapist",
          text: "Infermiere stomaterapista (scuola complementare o master universitario)",
        },
        {
          value: "structure-nurse-generic-expert",
          text: "Infermiere senza formazione specifica ma esperto di pazienti stomizzati",
        },
        {
          value: "structure-nurse-generic",
          text: "Infermiere senza formazione specifica non esperto di pazienti stomizzati",
        },
      ],
    },
    {
      name: "structure-nurse-amount",
      title:
        "Quanti Infermieri stomaterapisti e/o Infermieri sono assegnati all'ambulatorio?",
      type: "radiogroup",
      choices: [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4+" },
      ],
      isRequired: true,
    },
    {
      name: "structure-has-continuity",
      title: "Viene prevista la continuità in caso di assenza del titolare?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "structure-working-days",
      title: "Quanti giorni della settimana è aperto il servizio?",
      type: "radiogroup",
      choices: [
        { value: "one-day", text: "Un giorno a settimana" },
        { value: "two-days", text: "Due giorni a settimana" },
        { value: "mon-fri", text: "Dal lunedì al venerdì" },
        { value: "mon-sat", text: "Dal lunedì al sabato" },
      ],
      isRequired: true,
    },
    {
      name: "structure-working-hours",
      title: "Quali sono gli orari osservati dell'ambulatorio?",
      type: "radiogroup",
      choices: [
        { value: "morning-only", text: "Servizio aperto solo la mattina" },
        { value: "afternoon-only", text: "Servizio aperto solo pomeriggio" },
        { value: "all-day", text: "Servizio aperto tutto il giorno" },
      ],
      isRequired: true,
    },
    {
      name: "structure-has-delivery",
      title:
        "In caso di impossibilità a recarsi in ambulatorio è prevista la consulenza domiciliare?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "structure-treated-diseases",
      title: "Che tipo di stomie vengono trattate?",
      type: "checkbox",
      choices: [
        { value: "colostomies", text: "Colostomie" },
        { value: "ileostomies", text: "Ileostomie" },
        { value: "urostomies", text: "Urostomie" },
        { value: "other", text: "Altro" },
      ],
      isRequired: true,
    },
    {
      name: "structure-treated-diseases-other",
      type: "text",
      title: "Altre stomie (specificare):",
      visibleIf: "{structure-treated-diseases} contains 'other'",
      isRequired: true,
    },
    {
      name: "structure-patients-hosted-yearly",
      title: "In un anno, quante persone vengono seguite?",
      type: "radiogroup",
      choices: [{ value: "50-100" }, { value: "100-200" }, { value: "200+" }],
      isRequired: true,
    },
    {
      name: "structure-have-internal-patients-only",
      title: "Vengono seguite solo persone della struttura?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "structure-taking-charge",
      title: "La persona con stomia viene presa in carico nella fase",
      type: "radiogroup",
      choices: [
        { value: "pre-op", text: "Pre-operatoria" },
        {
          value: "post-op",
          text: "Post-operatoria                                                                 ",
        },
        { value: "on-discharge", text: "Al momento della dimissione" },
      ],
      isRequired: true,
    },
    {
      name: "structure-does-fill-treatment-plan",
      title:
        "Viene compilato il piano terapeutico definitivo per la fornitura dei dispositivi protesici?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "structure-treatment-plan-when",
      type: "radiogroup",
      title: "In quale fase avviene la compilazione del piano terapeutico?:",
      visibleIf: "{structure-does-fill-treatment-plan}=true",
      choices: [
        { value: "post-op", text: "Post-operatoria" },
        { value: "on-discharge", text: "Alla dimissione" },
        { value: "on-first-check", text: "Al primo controllo ambulatoriale" },
        { value: "other", text: "In altro momento dedicato" },
      ],
      isRequired: true,
    },
    {
      type: "matrix",
      name: "rehabilitation-program",
      title:
        "Si effettua stesura del programma riabilitativo che preveda l'educazione della persona?",
      isRequired: true,
      columns: [...cols],
      rows: [
        { value: "irrigation", text: "Modalità d'irrigazione" },
        { value: "diet", text: "Consigli dietetici" },
        {
          value: "learning",
          text: "Interventi educativi agli utenti ed ai familiari",
        },
        { value: "management", text: "Gestione dei dispositivi protesici" },
      ],
    },
    {
      name: "structure-has-proper-devices",
      title:
        "Nell'ambulatorio è presente il presidio idoneo alle esigenze della persona?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "structure-has-proper-supplies",
      title:
        "Le forniture della farmacia presidi della  struttura sono adeguate alla richiesta?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "structure-does-perform-ostomy-monitoring",
      title: "Si effettua il monitoraggio della stomia?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      type: "matrix",
      name: "structure-ostomy-monitoring",
      visibleIf: "{structure-does-perform-ostomy-monitoring}=true",
      title: "Se sì...",
      isRequired: true,
      columns: [...cols],
      rows: [
        {
          value: "defined-monitorings",
          text: "I controlli sono definiti a priori e anche in caso di necessità della persona (es. Follow up)",
        },
        {
          value: "non-defined-monitorings",
          text: "I controlli avvengono solo su necessità della persona",
        },
        {
          value: "other",
          text: "Altro",
        },
      ],
    },
    {
      name: "structure-ostomy-monitoring-other",
      type: "text",
      title: "Altra terapia (specificare)",
      visibleIf: "{structure-ostomy-monitoring.other}=true",
      isRequired: true,
    },
    {
      name: "structure-does-perform-pelvic-floor",
      title:
        "Sono previste attività legate alla riabilitazione del pavimento pelvico?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "structure-has-outpatient-record",
      title: "Viene utilizzata una cartella ambulatoriale?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      type: "matrix",
      name: "structure-contacts",
      title: "La struttura...",
      isRequired: true,
      columns: [...cols],
      rows: [
        { value: "phone", text: "Ha una Linea telefonica dedicata?" },
        { value: "cellphone", text: "Ha un telefono cellulare di servizio?" },
        { value: "email", text: "Ha un indirizzo mail" },
        { value: "brochures", text: "Ha opuscoli informativi dedicati" },
      ],
    },
    {
      type: "matrix",
      name: "structure-infrastructure",
      title: "Nella struttura...",
      isRequired: true,
      columns: [...cols],
      rows: [
        { value: "meetings-room", text: "Esiste una sala colloquio riservata" },
        {
          value: "signposted-route",
          text: "È presente il percorso segnaletico",
        },
        {
          value: "ostomy-dedicated-bathroom",
          text: "È presente un bagno attrezzato per le persone stomizzate",
        },
      ],
    },
    {
      type: "matrix",
      name: "structure-consultancies",
      title: "Si effettuano consulenze infermieristiche intra ospedaliere...",
      isRequired: true,
      columns: [...cols],
      rows: [
        { value: "with-paper", text: "Con richiesta cartacea" },
        { value: "digital", text: "Con richiesta informatizzata" },
      ],
    },
    {
      type: "matrix",
      name: "structure-professional-figures",
      title: "La struttura si avvale di figure interdisciplinari quali...",
      isRequired: true,
      columns: [...cols],
      rows: [
        { value: "psychologist", text: "Psicologo" },
        { value: "dietician", text: "Dietologo/Nutrizionista" },
        { value: "social-worker", text: "Assistente sociale" },
        { value: "dermatologist", text: "Dermatologo" },
        { value: "other", text: "Altro" },
      ],
    },
    {
      name: "structure-professional-figures-other",
      type: "text",
      title: "Altro professionista (specificare)",
      visibleIf: "{structure-professional-figures.other}=true",
      isRequired: true,
    },
  ],
};
