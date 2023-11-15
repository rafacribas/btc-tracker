// formatDate.js
export function useDateFormatter() {
  const formatDateString = (inputDate) => {
    const date = new Date(inputDate)

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/London' // Adjust the time zone as needed
    }).format(date)

    return formattedDate
  }

  return { formatDateString }
}
