const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

export const getSize = (bytes, decimals = 2, base = 1024) => {
  if (!Number(bytes)) return `0 ${sizes[0]}`;
  decimals = decimals < 0 ? 0 : decimals;
  const ind = Math.floor(Math.log(bytes) / Math.log(base));
  const result = parseFloat((bytes / Math.pow(base, ind)).toFixed(decimals));

  return `${result} ${sizes[ind]}`;
};
