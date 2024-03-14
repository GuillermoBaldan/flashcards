function isPastDate(timestamp) {
    // Get the current date in milliseconds
    const currentDate = Date.now();
  
    // Compare the timestamp with the current date
    return timestamp < currentDate;
  }