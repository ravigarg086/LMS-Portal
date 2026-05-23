// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Highcharts checks CSS.supports at import time; jsdom does not implement it.
if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
  global.CSS = {
    ...(global.CSS || {}),
    supports: () => false,
  };
}

// Reveal-up scroll animations use IntersectionObserver.
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(element) {
    this.callback([{ isIntersecting: true, target: element }]);
  }

  disconnect() {}

  unobserve() {}
}

global.IntersectionObserver = MockIntersectionObserver;
