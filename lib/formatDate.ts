export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const formattedDate: string = date.toLocaleDateString(undefined, options)
  return formattedDate
}

// Example usage:
// const createdAt: Date = new Date("2023-08-14T06:06:27.676Z")
// const formattedDate: string = formatDate(createdAt)
// console.log(formattedDate) // Output: August 14, 2023
