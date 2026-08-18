// Utility to convert text strings to ASCII Binary representation (8-bit bytes)

export function textToBinary(str) {
  if (!str) return '';
  return str
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function binaryToText(binaryStr) {
  if (!binaryStr) return '';
  return binaryStr
    .split(' ')
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
}
