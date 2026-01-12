
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="text-sm md:text-base leading-relaxed text-gray-800 space-y-4">
      {renderContentWithTables(content)}
    </div>
  );
};

const renderContentWithTables = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let tableRows: string[] = [];
  let inTable = false;

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    const isTableLine = trimmed.startsWith('|') && trimmed.endsWith('|');
    if (isTableLine) {
      if (!inTable) inTable = true;
      tableRows.push(trimmed);
    } else {
      if (inTable) {
        elements.push(<TableBlock key={`table-${i}`} rows={tableRows} />);
        tableRows = [];
        inTable = false;
      }
      if (trimmed !== '') {
        elements.push(<div key={`p-${i}`} className="mb-2 min-h-[1em] flex flex-wrap items-center gap-2">{parseInlineMarkdown(line)}</div>);
      }
    }
  });
  if (inTable && tableRows.length > 0) elements.push(<TableBlock key="table-end" rows={tableRows} />);
  return elements;
};

const parseInlineMarkdown = (text: string) => {
  const tokens = text.split(/(!\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g);
  return tokens.map((token, j) => {
    if (!token) return null;
    if (token.startsWith('![') && token.includes('](')) {
      const altMatch = token.match(/!\[(.*?)\]/);
      const urlMatch = token.match(/\((.*?)\)/);
      const url = urlMatch ? urlMatch[1] : '';
      return <img key={j} src={url} className="inline-block max-h-48 rounded-lg my-2" />;
    }
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={j} className="font-bold text-gray-900">{token.slice(2, -2)}</strong>;
    }
    return <span key={j}>{token}</span>;
  });
};

const TableBlock: React.FC<{ rows: string[] }> = ({ rows }) => {
  const dataRows = rows.filter(r => !r.includes('---'));
  if (dataRows.length === 0) return null;
  const headers = dataRows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
  const bodyRows = dataRows.slice(1).map(r => r.split('|').filter(c => c.trim() !== '').map(c => c.trim()));
  return (
    <div className="overflow-x-auto my-4 border border-gray-300 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>{headers.map((h, idx) => <th key={idx} className="px-4 py-2 text-left text-[10px] font-black uppercase tracking-wider">{h}</th>)}</tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bodyRows.map((row, rIdx) => <tr key={rIdx}>{row.map((cell, cIdx) => <td key={cIdx} className="px-4 py-2 text-xs">{parseInlineMarkdown(cell)}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default MarkdownRenderer;
