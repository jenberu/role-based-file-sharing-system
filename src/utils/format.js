// Function to format the date
export const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Get month (1-based)
    const day = String(d.getDate()).padStart(2, '0'); // Get day
    const year = d.getFullYear(); // Get full year
    const hours = String(d.getHours()).padStart(2, '0'); // Get hours
    const minutes = String(d.getMinutes()).padStart(2, '0'); // Get minutes
    const seconds = String(d.getSeconds()).padStart(2, '0'); // Get seconds
  
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };
  