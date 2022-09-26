export default {
  elements: [
    {
      type: "html",
      html: '<p class="text-onPrimary">Di seguito un indagine clinica sul paziente</p>',
    },
    {
      name: "patient-illnesses-myocardial-infarction",
      title: "Infarto del miocardio (pregresso)",
      description: "Con alterazioni elettrocardiografiche e rialzo enzimatico",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-heart-failure",
      title: "Insufficienza cardiaca congestizia",
      description:
        "Storia di dispnea da sforzo o parossistica notturna sintomatica in trattamento con diuretici e farmaci per l'ipertensione",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-peripheral-vascular-diseases",
      title: "Malattie vascolari periferiche",
      description:
        "In atto: claudicatio intermittens, gangrena, insufficienza arteriosa acuta o aneurisma toracico o addominale (6 centimetri o più) non trattate o storia di bypass arterioso",

      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-cerebrovascular",
      title: "Malattie cerebrovascolari",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-alzheimers",
      title: "Malattia di Alzheimer o altra demenza",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-bronchopneumopathies",
      title: "Broncopneumopatia cronica ostruttiva",
      description:
        "Asma, enfisema, bronchite cronica o malattia polmonare cronica ostruttiva (dispnea a riposo o da sforzo)",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-connective-tissue",
      title: "Malattie del tessuto connettivo",
      description:
        "Lupus eritematoso sistemico, polimiosite, malattia del tessuto connettivo misto, polimialgia reumatica, artrite reumatoide moderata o severa",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-ulcer",
      title: "Ulcera peptica",
      description: "Ulcera peptica che richiede un trattamento",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-liver-diseases",
      title: "Malattie epatiche non gravi",
      description: "Epatite cronica e cirrosi",
      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-diabetes",
      title: "Diabete senza complicazioni",
      description:
        "Diabete che richiede farmaci (per via orale o insulina) non trattato con la sola dieta",

      choices: [
        { value: "1", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-diabetes-damage",
      choices: [
        { value: "2", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      title: "Diabete con complicazioni",
      description:
        "Diabete con danno d'organo come retinopatia, neuropatia o nefropatia",
      visibleIf: "{patient-illnesses-diabetes}='y'",
      isRequired: true,
    },
    {
      name: "patient-illnesses-ictus",
      title: "Ictus con emiplegia",
      choices: [
        { value: "2", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-kidney-diseases",
      title: "Malattie renali",
      description:
        "Moderata o grave (con creatinemia > 3 mg%), con uremia, in dialisi o storia di trapianto",

      choices: [
        { value: "2", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-tumor-easy",
      title: "Tumore solido non metastatico",
      choices: [
        { value: "2", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-leukemia",
      title: "Leucemia",
      choices: [
        { value: "2", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-lymphoma",
      title: "Linfoma o mieloma multiplo",
      choices: [
        { value: "2", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-liver-other",
      title: "Altre malattie epatiche moderate o severe",
      choices: [
        { value: "3", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-tumor-hard",
      title: "Tumore solido metastatico",
      choices: [
        { value: "6", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
    {
      name: "patient-illnesses-aids",
      title: "AIDS",
      choices: [
        { value: "6", text: "Sì" },
        { value: "0", text: "No" },
      ],
      type: "radiogroup",
      isRequired: true,
    },
  ],
};
