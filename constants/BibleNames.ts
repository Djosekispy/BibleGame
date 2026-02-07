// Nomes bíblicos com cores associadas
export const BIBLE_NAMES = [
  // Homens do Antigo Testamento
  { name: 'Abraão',    color: '#FF6B6B', rgb: [255, 107, 107],    category: 'AT_Homens' },
  { name: 'Isaac',     color: '#4ECDC4', rgb: [78, 205, 196],     category: 'AT_Homens' },
  { name: 'Jacó',      color: '#45B7D1', rgb: [69, 183, 209],     category: 'AT_Homens' },
  { name: 'José',      color: '#FFA07A', rgb: [255, 160, 122],    category: 'AT_Homens' },
  { name: 'Moisés',    color: '#9B59B6', rgb: [155, 89, 182],     category: 'AT_Homens' },
  { name: 'Arão',      color: '#3498DB', rgb: [52, 152, 219],     category: 'AT_Homens' },
  { name: 'Davi',      color: '#E74C3C', rgb: [231, 76, 60],      category: 'AT_Homens' },
  { name: 'Salomão',   color: '#F39C12', rgb: [243, 156, 18],     category: 'AT_Homens' },
  { name: 'Elias',     color: '#16A085', rgb: [22, 160, 133],     category: 'AT_Homens' },
  { name: 'Eliseu',    color: '#27AE60', rgb: [39, 174, 96],      category: 'AT_Homens' },
  { name: 'Jó',        color: '#8E44AD', rgb: [142, 68, 173],     category: 'AT_Homens' },
  { name: 'Noé',       color: '#34495E', rgb: [52, 73, 94],       category: 'AT_Homens' },
  { name: 'Sansão',    color: '#C0392B', rgb: [192, 57, 43],      category: 'AT_Homens' },
  { name: 'Saul',      color: '#7F8C8D', rgb: [127, 140, 141],    category: 'AT_Homens' },
  { name: 'Dorcas',    color: '#E91E63', rgb: [233, 30, 99],      category: 'AT_Homens' }, 

  // Mulheres do Antigo Testamento
  { name: 'Raquel',    color: '#FF1493', rgb: [255, 20, 147],     category: 'AT_Mulheres' },
  { name: 'Lia',       color: '#FF69B4', rgb: [255, 105, 180],    category: 'AT_Mulheres' },
  { name: 'Rute',      color: '#FFB6C1', rgb: [255, 182, 193],    category: 'AT_Mulheres' },
  { name: 'Ester',     color: '#FF8C00', rgb: [255, 140, 0],      category: 'AT_Mulheres' },
  { name: 'Noemi',     color: '#DAA520', rgb: [218, 165, 32],     category: 'AT_Mulheres' },
  { name: 'Marta',     color: '#228B22', rgb: [34, 139, 34],      category: 'NT_Mulheres' }, 
  { name: 'Betseba',   color: '#4169E1', rgb: [65, 105, 225],     category: 'AT_Mulheres' },
  { name: 'Jezabel',   color: '#8B0000', rgb: [139, 0, 0],        category: 'AT_Mulheres' },

  // Novo Testamento
  { name: 'Jesus',     color: '#FFD700', rgb: [255, 215, 0],      category: 'Jesus' },
  { name: 'Pedro',     color: '#FF4500', rgb: [255, 69, 0],       category: 'NT_Homens' },
  { name: 'Paulo',     color: '#00CED1', rgb: [0, 206, 209],      category: 'NT_Homens' },
  { name: 'João',      color: '#1E90FF', rgb: [30, 144, 255],     category: 'NT_Homens' },
  { name: 'Tiago',     color: '#32CD32', rgb: [50, 205, 50],      category: 'NT_Homens' },
  { name: 'Lucas',     color: '#FF6347', rgb: [255, 99, 71],      category: 'NT_Homens' },
  { name: 'Marcos',    color: '#20B2AA', rgb: [32, 178, 170],     category: 'NT_Homens' },
  { name: 'Filipe',    color: '#DC143C', rgb: [220, 20, 60],      category: 'NT_Homens' },
  { name: 'Bartolomeu',color: '#00FA9A', rgb: [0, 250, 154],      category: 'NT_Homens' },
  { name: 'Tomás',     color: '#696969', rgb: [105, 105, 105],    category: 'NT_Homens' },
  { name: 'Mateus',    color: '#228B22', rgb: [34, 139, 34],      category: 'NT_Homens' },
  { name: 'Simão',     color: '#FF00FF', rgb: [255, 0, 255],      category: 'NT_Homens' },
  { name: 'Judas',     color: '#2F4F4F', rgb: [47, 79, 79],       category: 'NT_Homens' },
  { name: 'Matias',    color: '#6495ED', rgb: [100, 149, 237],    category: 'NT_Homens' },
  { name: 'Maria',     color: '#FF69B4', rgb: [255, 105, 180],    category: 'NT_Mulheres' },
  { name: 'Madalena',  color: '#FFB6C1', rgb: [255, 182, 193],    category: 'NT_Mulheres' },
  { name: 'Lázaro',    color: '#87CEEB', rgb: [135, 206, 235],    category: 'NT_Homens' },
  { name: 'Filemon',   color: '#DEB887', rgb: [222, 184, 135],    category: 'NT_Homens' },
  { name: 'Timóteo',   color: '#F0E68C', rgb: [240, 230, 140],    category: 'NT_Homens' },
  { name: 'Tito',      color: '#98FB98', rgb: [152, 251, 152],    category: 'NT_Homens' },
];

export type BibleName = typeof BIBLE_NAMES[0];

export const getRandomBibleName = (): BibleName => {
  return BIBLE_NAMES[Math.floor(Math.random() * BIBLE_NAMES.length)];
};
