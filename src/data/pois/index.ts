export default Object.values(import.meta.glob('./*.svx', { eager: true })).map((content) => ({
  // @ts-ignore
  ...content.metadata,
  // @ts-ignore
  content: content.default
}));
