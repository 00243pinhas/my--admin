export function countLastNDays(items, dateField, days = 7) {
  if (!Array.isArray(items)) return 0;

  console.log("row", items); 

  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

 const brag=items.reduce((count, item) => {

    
    const raw = item?.updatedAt;

    if (!raw) return count;

    const time = new Date(raw).getTime();


    if (Number.isNaN(time)) return count;
    
    return time >= cutoff ? count + 1 : count;
  }, 0);


  return brag;
}






