/**
 * Example smart component
 * - Uses hook to get data
 * - Maps data to dumb components
 * - Handles loading, error, empty state
 */

import { useExampleData } from '../hooks/useExampleFeature';
import { ExampleComponent } from '../components/ExampleComponent';

export function ExampleFeatureList() {
  const { data, isLoading, error } = useExampleData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data.</p>;
  if (!data || data.length === 0) return <p>No data found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <ExampleComponent key={item.id} item={item} />
      ))}
    </div>
  );
}