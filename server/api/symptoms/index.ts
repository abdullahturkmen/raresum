export default defineEventHandler((event) => {
  return {
    totalRowsCount: 10,
    totalPageCount: 2,
    items: [
      {
        id: "1",
        title: "Fever",
        code: "HP:0001945",
        definition: "Elevated body temperature due to failed thermoregulation.",
        synonyms: "Hyperthermia | Pyrexia",
      },
      {
        id: "2",
        title: "Coccidioidomycosis | Valley fever",
        code: "HP:0032249",
        definition: "Elevated body temperature due to failed thermoregulation.",
        synonyms: "Hyperthermia | Pyrexia",
      },
      {
        id: "3",
        title: "Low-grade fever | Mild fever",
        code: "HP:0011134",
        definition: "Elevated body temperature due to failed thermoregulation.",
        synonyms: "Hyperthermia | Pyrexia",
      },
      {
        id: "4",
        title: "Recurrent fever | Episodic fever | Intermittent fever",
        code: "HP:0001954",
        definition: "Elevated body temperature due to failed thermoregulation.",
        synonyms: "Hyperthermia | Pyrexia",
      },
    ],
  };
});
