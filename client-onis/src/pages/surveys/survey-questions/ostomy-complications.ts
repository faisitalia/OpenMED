export default {
  elements: [
    {
      name: "ostomy-has-complications",
      title:
        "Al momento della visita il paziente riferisce/si rileva la presenza di complicanze?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "ostomy-has-complications-yes",
      title: "Quali?",
      type: "text",
      visibleIf: "{ostomy-has-complications}=true",
      isRequired: true,
    },
    {
      name: "ostomy-complications-last-month",
      title:
        "Nell'ultimo mese (oppure dall'intervento chirurgico) ha notato complicanze della stomia e/o della cute peristomale?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "ostomy-complications-last-month-yes-which-ones",
      title: "Quali?",
      type: "text",
      visibleIf: "{ostomy-complications-last-month}=true",
      isRequired: true,
    },
    {
      name: "ostomy-complications-last-month-yes-how",
      title: "Come ha gestito il problema / complicanza?",
      visibleIf: "{ostomy-complications-last-month}=true",
      type: "radiogroup",
      choices: [
        { value: "nothing", text: "Non ho fatto nulla" },
        {
          value: "contact",
          text: "Contattato lo stomaterapista e seguito le indicazioni",
        },
        { value: "clinic", text: "Cure ambulatoriali" },
        { value: "hospitalization", text: "Ricovero ospedaliero" },
        {
          value: "surgery",
          text: "Intervento chirurgico / riconfezionamento della stomia ",
        },
      ],
      isRequired: true,
    },
    {
      name: "ostomy-complications-was-hospitalized",
      title:
        "Nell'ultimo mese (oppure dall'intervento chirurgico) ha avuto ricoveri in pronto soccorso, ricoveri ospedalieri o visite con lo specialista per problemi legati alla stomia e/o cute peristomale?",
      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "ostomy-complications-was-hospitalized-services",
      type: "text",
      title: "A quali servizi ha fatto accesso?",
      visibleIf: "{ostomy-complications-was-hospitalized}=true",
      isRequired: true,
    },
  ],
};
