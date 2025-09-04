import main from './main.json' assert { type: 'json' };

export const getMenu = Object.entries(main).map(([key, value]) => ({
    ...value,
    uniqueId: `${key}-${value.id}`,
}));