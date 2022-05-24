export function getYesterdaysDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

export  function getYesterdayBeforeDate() {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return date;
  }