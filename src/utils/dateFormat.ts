// // dateFormat.ts

// export function parseDate(input: string | [number, number, number, number?, number?]): Date {
//     if (typeof input === "string") {
//       return new Date(input);
//     } else if (Array.isArray(input)) {
//       const [year, month, day, hour = 0, minute = 0] = input;
//       return new Date(year, month - 1, day, hour, minute);
//     } else {
//       throw new Error("Invalid date format. Use an ISO string or [year, month, day, hour, minute].");
//     }
//   }
  

// dateFormat.ts
export function parseDate(input: string | [number, number, number, number?, number?]): Date {
  if (typeof input === "string") {
    return new Date(input);
  } else if (Array.isArray(input)) {
    const [year, month, day, hour = 0, minute = 0] = input;
    return new Date(year, month - 1, day, hour, minute);
  } else {
    throw new Error("Invalid date format. Use an ISO string or [year, month, day, hour, minute].");
  }
}
