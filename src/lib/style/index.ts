export default Object.values(import.meta.glob('./*.ts', { import: 'default', eager: true }));
