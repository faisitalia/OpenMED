export default {
  elements: [
    {
      name: "sports-frequency",
      title:
        "Con che frequenza il paziente svolge attività fisica sportiva di qualsivoglia natura?",
      type: "radiogroup",
      choices: [
        { value: "never", text: "Mai o quasi mai (1 volta al mese o meno)" },
        { value: "rare", text: "Raramente (2-3 volte al mese)" },
        { value: "often", text: "Spesso (1-2 volte a settimana)" },
        { value: "always", text: "Sempre (3 o più volte a settimana)" },
        { value: "not-applicable", text: "Non applicabile" },
      ],
      isRequired: true,
    },
    {
      name: "eating-habits",
      title: "Che tipo di regime alimentare segue il paziente?",
      type: "radiogroup",
      choices: [
        { value: "low-residue-diet", text: "Dieta a basso residuo" },
        {
          value: "ileostomy-diet",
          text: "Dieta per ileostomia (dieta standard ma ricca in liquidi e formanti massa)",
        },
        { value: "no-indication", text: "Non segue indicazioni precise" },
        { value: "other", text: "Altro" },
      ],
      isRequired: true,
    },
    {
      name: "eating-habits-other",
      type: "text",
      title: "Specificare il regime alimentare seguito",
      visibleIf: "{eating-habits}='other'",
      isRequired: true,
    },
    {
      name: "eating-habits-indications",
      title:
        "Se segue un regime alimentare personalizzato, da chi le è stato consigliato?",
      type: "radiogroup",
      choices: [
        { value: "dietician", text: "Dietologo" },
        { value: "nutritionist", text: "Nutrizionista" },
        { value: "ostomotherapist", text: "Stomaterapista" },
        { value: "other", text: "Altro" },
      ],
      visibleIf:
        "{eating-habits}='low-residue-diet' or {eating-habits}='ileostomy-diet'",
      isRequired: true,
    },
    {
      name: "eating-habits-indications-other",
      type: "text",
      title: "Chi le ha consigliato la dieta?",
      visibleIf: "{eating-habits-indications}='other'",
      isRequired: true,
    },
  ],
};
