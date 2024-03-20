function formatToRelativeDate(date) {
  const givenDate = new Date(date);

  // Calculate the difference in milliseconds between the given date and the current date
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - givenDate.getTime();

  // Convert the time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Format the relative time using Intl.RelativeTimeFormat
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const formattedRelativeTime = rtf.format(-daysDifference, "day");

  return formattedRelativeTime;
}

export default formatToRelativeDate;
