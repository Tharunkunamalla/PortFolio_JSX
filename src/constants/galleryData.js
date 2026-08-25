// Dynamically import all images placed into /public/assets/gallery/
const galleryGlob = import.meta.glob('/public/assets/gallery/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const getGalleryPhotos = () => {
  const globEntries = Object.keys(galleryGlob);

  if (globEntries.length > 0) {
    return globEntries.map((filePath, index) => {
      const fileName = filePath.split('/').pop() || `Photo ${index + 1}`;
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
      const formattedTitle = nameWithoutExt
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      // Format path for public asset referencing
      const publicSrc = filePath.replace(/^\/public/, '');

      return {
        id: index + 1,
        src: publicSrc,
        title: formattedTitle,
        category: 'Photography',
        location: 'Captured by Tharun',
        date: '2025 - 2026',
        aspect: index % 3 === 0 ? 'tall' : 'wide',
      };
    });
  }

  // Fallback items if directory is empty
  return [
    {
      id: 1,
      src: '/assets/gallery/photo1.jpg',
      title: 'Night Portrait',
      category: 'Photography',
      location: 'Warangal',
      date: '2025',
      aspect: 'tall',
    },
    {
      id: 2,
      src: '/assets/gallery/photo2.jpg',
      title: 'Atmospheric Architecture',
      category: 'Photography',
      location: 'Kottayam',
      date: '2026',
      aspect: 'wide',
    },
    {
      id: 3,
      src: '/assets/gallery/photo3.jpg',
      title: 'Cyberpunk Streets',
      category: 'Photography',
      location: 'Kerala',
      date: '2026',
      aspect: 'wide',
    },
  ];
};
