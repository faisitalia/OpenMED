import genericJson from "./survey-questions/generic";
import accessJson from "./survey-questions/clinic-access";
import ostomyGenericJson from "./survey-questions/ostomy-generic";
import ostomyManagementJson from "./survey-questions/ostomy-management";
import ostomyDevicesJson from "./survey-questions/ostomy-devices";
import eatingAndSportsJson from "./survey-questions/patient-eating-and-sports";
import ostomyComplicationsJson from "./survey-questions/ostomy-complications";
import patientIllnessesJson from "./survey-questions/patient-illnesses";
import patientSelfCareJson from "./survey-questions/patient-self-care";

export default {
  title: "ONIS - STOMA. PROTOCOLLO di STUDIO PROSPETTICO",
  description: "Registro prospettico multicentrico delle persone stomizzate.",
  pages: [
    // { ...genericJson },
    // { ...accessJson },
    // { ...ostomyGenericJson },
    // { ...ostomyManagementJson },
    // { ...ostomyDevicesJson },
    // { ...eatingAndSportsJson },
    // { ...ostomyComplicationsJson },
    // { ...patientIllnessesJson },
    { ...patientSelfCareJson },
    {
      elements: [
        {
          name: "disappointing-experience",
          title:
            "Please let us know why you had such a disappointing experience with our product",
          type: "comment",
        },
      ],
    },
  ],
};
