export type MenuItem = {
    name: string
    description: string
    dietaryInfo?: string
}

type Menu = {
    starters: MenuItem[]
    mains: MenuItem[]
    desserts: MenuItem[]
}

type Menus = {
    weddingBreakfast: Menu
}

export const menus: Menus = {
    weddingBreakfast: {
        starters: [
            {
                name: 'Risotto Arancini',
                description:
                    'Served with Moroccan spiced hummus, toasted seeds and basil pesto.',
                dietaryInfo: 'Gluten-Free Available, Vegan Available',
            },
            {
                name: 'Ham Hock Terrine',
                description:
                    'Served with plum chutney, brioche toast, pickles, cucumber ribbons and pea purée.',
                dietaryInfo: 'Gluten-Free Available, Dairy-Free Available',
            },
        ],
        mains: [
            {
                name: 'Supreme of Chicken Breast',
                description:
                    'Served with smoked paprika and chorizo risotto, wilted spinach, basil pesto and red chicory frisé.',
                dietaryInfo: 'Gluten-Free Available, Dairy-Free Available',
            },
            {
                name: 'Roast Porchetta Pork',
                description:
                    'Served with lemon and garlic potatoes, glazed heritage carrots and calvados jus.',
                dietaryInfo: 'Gluten-Free Available, Dairy-Free Available',
            },
            {
                name: 'Beetroot Risotto ( Vegetarian Option )',
                description: 'Served with goats cheese and walnuts.',
                dietaryInfo: 'Gluten-Free Available',
            },
        ],
        desserts: [
            {
                name: 'Sticky Toffee Pudding',
                description:
                    'Served with caramelised dates and crème anglaise.',
                dietaryInfo: 'Gluten-Free Available',
            },
            {
                name: 'Dark Chocolate & Butterscotch Tart',
                description: 'Served with champagne sorbet.',
            },
        ],
    },
}
