const Formatter = {
  number(num) {
    if (typeof num !== 'number') return '0';
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return String(num);
  },

  truncate(text, max = 30) {
    if (!text) return '';
    if (text.length <= max) return text;
    return text.slice(0, max) + '...';
  }
};

export default Formatter;
