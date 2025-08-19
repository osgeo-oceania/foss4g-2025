export default Object.values(import.meta.glob('./*.svx', { eager: true })).map((content, idx) => ({
  feature: {
    type: 'Feature',
    id: idx,
    // @ts-ignore
    properties: content.metadata,
    geometry: {
      "type": "Point",
      // @ts-ignore
      "coordinates": content.metadata.coordinates
    }
  },

  // @ts-ignore
  content: content.default
}));
