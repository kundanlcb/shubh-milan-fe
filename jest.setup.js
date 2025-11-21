// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const MockImage = React.forwardRef((props, ref) => {
    const Image = require('react-native/Libraries/Image/Image');
    return React.createElement(Image, { ...props, ref });
  });
  
  const mockModule = {
    __esModule: true,
    default: MockImage,
    priority: {
      high: 'high',
      normal: 'normal',
      low: 'low',
    },
    cacheControl: {
      web: 'web',
      cacheOnly: 'cacheOnly',
      immutable: 'immutable',
    },
    resizeMode: {
      contain: 'contain',
      cover: 'cover',
      stretch: 'stretch',
      center: 'center',
    },
    preload: jest.fn(() => Promise.resolve()),
    clearDiskCache: jest.fn(() => Promise.resolve()),
    clearMemoryCache: jest.fn(() => Promise.resolve()),
  };
  
  return mockModule;
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
  launchCamera: jest.fn(),
}));
