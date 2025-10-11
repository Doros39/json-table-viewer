export function toCSV(arr){
  if(!Array.isArray(arr) || !arr.length) return '';
  const keys = Object.keys(arr[0]);
  const csv = [keys.join(',')].concat(arr.map(r=>keys.map(k=>`"${r[k]}"`).join(','))).join('\n');
  return csv;
}