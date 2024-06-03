export default defineEventHandler((event) => {
  return {
    totalRowsCount: 10,
    totalPageCount: 2,
    items: [
      {
        id: "1",
        title: "Fever",
        code: "HP:0001945",
      },
      {
        id: "2",
        title: "Coccidioidomycosis | Valley fever",
        code: "HP:0032249",
      },
      {
        id: "3",
        title: "Low-grade fever | Mild fever",
        code: "HP:0011134",
      },
      {
        id: "4",
        title: "Recurrent fever | Episodic fever | Intermittent fever",
        code: "HP:0001954",
      },
    ],
  };
});
