export default {
  displayName: 'webapp',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/(?!(@iconify-icons|react-markdown)/)'],
  moduleNameMapper: {
    'react-markdown': '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
    '^!!raw-loader!.*': 'jest-raw-loader',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/webapp',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    }
  }
};
