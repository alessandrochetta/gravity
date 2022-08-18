import { Planet } from '../lib/Planet'

const defaultPlanets1 = [
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) + 100, y: (dimension) => (dimension / 2) - 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 },
            state: 'running',
            id: 0
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) + 100, y: (dimension) => (dimension / 2) + 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 },
            state: 'running',
            id: 1
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) + 100, y: (dimension) => (dimension / 2) + 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 },
            state: 'running',
            id: 2
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) - 80, y: (dimension) => (dimension / 2) },
            velocity: { x: 0, y: 3 },
            attr: { r: 2.5, color: '#8e44ad', mass: 1 },
            state: 'running',
            id: 3
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) - 330, y: (dimension) => (dimension / 2) },
            velocity: { x: 0, y: 1.4 },
            attr: { r: 10, color: '#873600', mass: 1 },
            state: 'running',
            id: 4
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2), y: (dimension) => (dimension / 2) },
            velocity: { x: 0, y: 0 },
            attr: { r: 20, color: '#bdc3c7', mass: 1000, isFixed: true },
            state: 'running',
            id: 5
        })
]

export const getDefaultPlanets = function ({ type, width, height }) {
    switch (type) {
        case 'default':
            return defaultPlanets1.map(p => {
                p.position.x = p.position.x(width);
                p.position.y = p.position.y(height)
                return p
            })
            break;

        default:
            break;
    }
}