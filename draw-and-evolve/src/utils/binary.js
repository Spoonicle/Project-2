export function isBinaryString(str) {
  if (typeof str !== 'string') return false;
  const trimmed = str.trim();
  return trimmed.length > 0 && /^([01]{8}\s*)+$/.test(trimmed);
}

export function textToBinary(str) {
  if (!str) return '';
  if (isBinaryString(str)) {
    return str.trim();
  }
  return str
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function binaryToText(binaryStr) {
  if (!binaryStr) return '';
  const trimmed = binaryStr.trim();
  if (!trimmed) return '';
  return trimmed
    .split(/\s+/)
    .map(bin => {
      const code = parseInt(bin, 2);
      return isNaN(code) ? '' : String.fromCharCode(code);
    })
    .join('');
}
