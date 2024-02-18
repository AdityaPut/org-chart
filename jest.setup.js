const savedLocation = window.location;

/* Jest custom matchers
https://github.com/testing-library/jest-dom */
import '@testing-library/jest-dom';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => {
    return {
      subsets: ['latin'],
      variable: '--font-sans',
    };
  }),
}));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
window.HTMLElement.prototype.scrollIntoView = function () {};

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
beforeEach(async () => {
  delete window.location;
  window.location = Object.assign(new URL('https://example.org'), {
    ancestorOrigins: '',
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
  });

  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));
});

afterEach(() => {
  window.location = savedLocation;
});

/* Polyfill fetch
https://github.com/vercel/next.js/discussions/13678#discussioncomment-22383 */
require('next');
