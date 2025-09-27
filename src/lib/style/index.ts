export default Object.values(import.meta.glob('./*.ts', { import: 'default', eager: true })).sort(
  (a, b) => a.order - b.order
) as MapStyle[];
