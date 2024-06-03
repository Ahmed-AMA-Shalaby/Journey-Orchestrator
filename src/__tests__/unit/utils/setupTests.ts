import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/react';

import { mockedUseNavigate } from './mocks';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => null,
    removeListener: () => null,
    addEventListener: () => null,
    removeEventListener: () => null,
    dispatchEvent: () => null,
  }),
});

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '2' }),
  BrowserRouter: vi.fn().mockImplementation((props) => props.children),
  useNavigate: () => mockedUseNavigate,
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');

  return {
    ...actual,
    useMediaQuery: vi.fn().mockReturnValue(true),
  };
});

afterEach(() => {
  cleanup();
});
