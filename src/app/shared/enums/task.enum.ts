export const Category = Object.freeze([
    { id: "None", value: "" },
    { id: "General", value: "GENERAL" },
    { id: "Personal", value: "PERSONAL" },
    { id: "Meeting", value: "MEETING" },
    { id: "Study", value: "STUDY" },
    { id: "Work", value: "WORK" }
]);

export const Priority = Object.freeze([
    { id: "None", value: -1 },
    { id: "Low", value: 0 },
    { id: "Medium", value: 1 },
    { id: "High", value: 2 }
]);

export const Status = Object.freeze({
    "TODO": "To Do",
    "INPROGRESS": "In Progress",
    "COMPLETED": "Completed"
});