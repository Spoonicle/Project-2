export function isBinaryString(str) {
  if (typeof str !== 'string') return false;
  const trimmed = str.trim();
  // Valid binary strings consist of space-separated 8-bit bytes
  return trimmed.length >= 8 && /^([01]{8})(\s+[01]{8})*$/.test(trimmed);
}

export function textToBinary(str) {
  if (!str) return '';
  if (isBinaryString(str)) {
    return str.trim();
  }
  // If string contains only 0s, 1s, and spaces (incomplete last byte), don't double encode
  if (/^[01\s]+$/.test(str)) {
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
