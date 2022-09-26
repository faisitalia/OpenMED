export default {
  elements: [
    {
      type: "html",
      html: '<p class="text-onPrimary">Dati di contesto e di accesso agli ambulatori</p>',
    },
    {
      name: "clinic-access",
      title: "Motivo dell'accesso in ambulatorio?",
      type: "radiogroup",
      choices: [
        { value: "education", text: "Percorso educativo" },
        { value: "consultancy", text: "Consulenza" },
        { value: "therapy-plan", text: "Rinnovio Piano terapeutico" },
        { value: "materials", text: "Richiesta materiale" },
        { value: "other", text: "Altro" },
      ],
      isRequired: true,
    },
    {
      name: "clinic-access-other",
      type: "text",
      title: "Altra motivazione di accesso (specificare)",
      visibleIf: "{clinic-access}='other'",
      isRequired: true,
    },
    {
      name: "clinic-access-has-asked-permissions",
      title:
        "Per recarsi alla visita ambulatoriale con lo stomaterapista ha dovuto chiedere permessi al lavoro?",

      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "clinic-access-permissions-hours",
      type: "text",
      title: "Per quante ore si è assentato? (specificare)",
      visibleIf: "{clinic-access-has-asked-permissions}=true",
      isRequired: true,
    },
    {
      name: "clinic-access-transport",
      title: "Come si reca agli incontri ambulatoriali con lo stomaterapista?",
      type: "radiogroup",
      choices: [
        { value: "car", text: "Auto" },
        { value: "public-transport", text: "Mezzi pubblici" },
        { value: "other", text: "Altro" },
      ],
      isRequired: true,
    },
    {
      name: "clinic-access-transport-other",
      type: "text",
      title: "Con quale mezzo si sposta? (specificare)",
      visibleIf: "{clinic-access-transport}='other'",
      isRequired: true,
    },
    {
      name: "clinic-access-was-accompanied",
      title:
        "Agli incontri con lo stomaterapista viene accompagnato da qualcuno?",

      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
    {
      name: "clinic-access-company-who",
      type: "text",
      title: "Con chi? (specificare)",
      visibleIf: "{clinic-access-was-accompanied}=true",
      isRequired: true,
    },
    {
      name: "clinic-access-has-opportunities",
      title:
        "L'ambulatorio offre in modo strutturato la possibilità di confrontarsi con volontari e/o associazioni ai propri pazienti oppure è in stretto contatto con una associazione pazienti locale?",

      type: "boolean",
      labelTrue: "Sì",
      labelFalse: "No",
      isRequired: true,
    },
  ],
};
