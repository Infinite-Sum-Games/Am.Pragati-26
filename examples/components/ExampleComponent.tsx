/**
 * Example dumb component
 * - Pure UI
 * - Takes typed props
 * - No API call inside
 */

import type { ExampleItem } from '../types/exampleFeatureTypes';

type ExampleComponentProps = {
  item: ExampleItem;
  onClick?: () => void;
};

export function ExampleComponent({ item, onClick }: ExampleComponentProps) {
  return (
    <div className="rounded-xl border p-4 shadow hover:bg-gray-50 cursor-pointer" onClick={onClick}>
      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
      <p className="text-gray-700 mb-2">{item.description}</p>
      {item.date && <p className="text-sm text-gray-500">{item.date}</p>}
    </div>
  );
}