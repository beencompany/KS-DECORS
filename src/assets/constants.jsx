export const categories = [
  'All',
  'Birthday',
  'Wedding & Reception',
  'Manchal Neeratu Vizha',
  'Welcome Board',
  'Arches',
  'Car Decoration',
  'Seer Thattu',
  'Air Cooler Rental'
];

const carModules = import.meta.glob('./car/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const weddingModules = import.meta.glob('./wedding/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const thatuModules = import.meta.glob('./thatu/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const manchalModules = import.meta.glob('./manchalneratuvila/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const nameBoardModules = import.meta.glob('./name-board/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const airCoolerModules = import.meta.glob('./aircoller/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const archModules = import.meta.glob('./arch/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const birthdayModules = import.meta.glob('./birthday/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });

const createLocalData = (modules, categoryName) => {
  return Object.values(modules).map((src, index) => ({
    id: `local-${categoryName}-${index}`,
    category: categoryName,
    src: src,
    thumb: src,
    title: '',
    amount: 0
  }));
};

export const localPortfolioData = [
  ...createLocalData(carModules, 'Car Decoration'),
  ...createLocalData(weddingModules, 'Wedding'),
  ...createLocalData(thatuModules, 'Seer Thattu'),
  ...createLocalData(manchalModules, 'Manchal Neeratu Vizha'),
  ...createLocalData(nameBoardModules, 'Welcome Board'),
  ...createLocalData(airCoolerModules, 'Air Cooler Rental'),
  ...createLocalData(archModules, 'Arches'),
  ...createLocalData(birthdayModules, 'Birthday')
];
