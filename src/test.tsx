function highlightText(text: string): string {
  const regex = /\[(.*?)\]/g;
  return text.replace(regex, '<span className="bg-sky-100 text-slate-800">$1</span>');
}

const text = "這是一個[示例]文字";
const highlightedText = highlightText(text);
console.log(highlightedText); // 這是一個<span className="bg-sky-100 text-slate-800">示例</span>文字
