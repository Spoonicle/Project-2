function isBinaryString(str) {
  if (typeof str !== 'string') return false;
  const trimmed = str.trim();
  return trimmed.length >= 8 && /^([01]{8})(\s+[01]{8})*$/.test(trimmed);
}

function textToBinary(str) {
  if (!str) return '';
  if (isBinaryString(str)) {
    return str.trim();
  }
  if (/^[01\s]+$/.test(str)) {
    return str.trim();
  }
  return str
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

function binaryToText(binaryStr) {
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

// Export for module or global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isBinaryString, textToBinary, binaryToText };
}
