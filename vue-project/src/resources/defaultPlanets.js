import { Planet } from '../lib/Planet'

const defaultPlanets1 = [
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) + 100, y: (dimension) => (dimension / 2) - 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', name: 'Europa' },
            state: 'running',
            id: 0,
            mass: 1
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) + 100, y: (dimension) => (dimension / 2) + 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#f78fb3', name: 'Ganymede' },
            state: 'running',
            id: 1,
            mass: 1
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) + 120, y: (dimension) => (dimension / 2) - 140 },
            velocity: { x: -1, y: -2 },
            attr: { r: 3, color: '#e15f41', name: 'Amalthea' },
            state: 'running',
            id: 2,
            mass: 1
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) - 80, y: (dimension) => (dimension / 2) },
            velocity: { x: 0, y: 3 },
            attr: { r: 2.5, color: '#546de5', name: 'Io' },
            state: 'running',
            id: 3,
            mass: 1
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2) - 330, y: (dimension) => (dimension / 2) },
            velocity: { x: 0, y: 1.4 },
            attr: { r: 10, color: '#e77f67', name: 'Callisto' },
            state: 'running',
            id: 4,
            mass: 1
        }),
    new Planet(
        {
            position: { x: (dimension) => (dimension / 2), y: (dimension) => (dimension / 2) },
            velocity: { x: 0, y: 0 },
            attr: { r: 20, color: '#f5cd79', isFixed: true, name: 'Jupiter' },
            state: 'running',
            id: 5,
            mass: 1000
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