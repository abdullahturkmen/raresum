export default defineEventHandler((event) => {
  return {
    totalRowsCount: 10,
    totalPageCount: 2,
    items: [
      {
        id: "1",
        title: "Fabry Disease",
        percent: "89",
        description:
          "Fabry disease (FD) is a progressive, inherited, multisystemic lysosomal storage disease characterized by specific neurological, cutaneous, renal, cardiovascular, cochleo-vestibular and cerebrovascular manifestations.",
        categories: [
          {
            id: "1",
            name: "ORPHA:324",
          },
          {
            id: "2",
            name: "MONDO:0010526",
          },
        ],
        symptoms: [
         
          {
            id: "3",
            title: "Low-grade fever | Mild fever",
            code: "HP:0011134",
            definition:
              "Elevated body temperature due to failed thermoregulation.",
            synonyms: "Hyperthermia | Pyrexia",
          },
          {
            id: "4",
            title: "Recurrent fever | Episodic fever | Intermittent fever",
            code: "HP:0001954",
            definition:
              "Elevated body temperature due to failed thermoregulation.",
            synonyms: "Hyperthermia | Pyrexia",
          },
        ],
        others: [
          {
            id: "1",
            title: "Coccidioidomycosis | Valley fever",
            code: "HP:0032249",
            definition:
              "Elevated body temperature due to failed thermoregulation.",
            synonyms: "Hyperthermia | Pyrexia",
          },
          {
            id: "2",
            title: "Fever",
            code: "HP:0001954",
            definition: "Elevated thermoregulation.",
            synonyms: "Hyperthermia ",
          },
        ],
      },
      {
        id: "1",
        title: "Fabry Disease",
        percent: "89",
        description:
          "Fabry disease (FD) is a progressive, inherited, multisystemic lysosomal storage disease characterized by specific neurological, cutaneous, renal, cardiovascular, cochleo-vestibular and cerebrovascular manifestations.",
        categories: [
          {
            id: "1",
            name: "ORPHA:300105264",
          },
          {
            id: "2",
            name: "MONDO:0010526",
          },
        ],
        symptoms: [
          {
            id: "2",
            title: "Coccidioidomycosis | Valley fever",
            code: "HP:0032249",
            definition:
              "Elevated body temperature due to failed thermoregulation.",
            synonyms: "Hyperthermia | Pyrexia",
          },
          {
            id: "4",
            title: "Recurrent fever | Episodic fever | Intermittent fever",
            code: "HP:0001954",
            definition:
              "Elevated body temperature due to failed thermoregulation.",
            synonyms: "Hyperthermia | Pyrexia",
          },
        ],
        others: [
          {
            id: "2",
            title: "Fever",
            code: "HP:0032249",
            definition: "Elevated thermoregulation.",
            synonyms: "Hyperthermia ",
          },
        ],
      },
    ],
  };
});
