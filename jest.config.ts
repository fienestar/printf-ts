import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/lib/'],
    coveragePathIgnorePatterns: ['/__test__/', '/node_modules/', '/lib/'],
};

export default config;
