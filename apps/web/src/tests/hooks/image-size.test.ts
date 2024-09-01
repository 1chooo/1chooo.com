import { useResponsiveImageSize, Breakpoint, ImageSize } from '../../hooks/use-responsive-image-size';

describe('useResponsiveImageSize', () => {
  let originalInnerWidth: number;

  beforeAll(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterAll(() => {
    // Restore the original window width after tests
    window.innerWidth = originalInnerWidth;
  });

  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  it('returns the correct image size for small screens', () => {
    const breakpoints: Breakpoint[] = [
      { maxWidth: 375, size: { width: 80, height: 80 } },
      { maxWidth: 580, size: { width: 150, height: 150 } },
      { maxWidth: 1250, size: { width: 120, height: 120 } },
      { maxWidth: Infinity, size: { width: 150, height: 150 } },
    ];

    setWindowWidth(350);
    const size = useResponsiveImageSize(breakpoints);
    expect(size).toEqual<ImageSize>({ width: 80, height: 80 });
  });

  it('returns the correct image size for medium screens', () => {
    const breakpoints: Breakpoint[] = [
      { maxWidth: 375, size: { width: 80, height: 80 } },
      { maxWidth: 580, size: { width: 150, height: 150 } },
      { maxWidth: 1250, size: { width: 120, height: 120 } },
      { maxWidth: Infinity, size: { width: 150, height: 150 } },
    ];

    setWindowWidth(500);
    const size = useResponsiveImageSize(breakpoints);
    expect(size).toEqual<ImageSize>({ width: 150, height: 150 });
  });

  it('returns the correct image size for large screens', () => {
    const breakpoints: Breakpoint[] = [
      { maxWidth: 375, size: { width: 80, height: 80 } },
      { maxWidth: 580, size: { width: 150, height: 150 } },
      { maxWidth: 1250, size: { width: 120, height: 120 } },
      { maxWidth: Infinity, size: { width: 150, height: 150 } },
    ];

    setWindowWidth(1000);
    const size = useResponsiveImageSize(breakpoints);
    expect(size).toEqual<ImageSize>({ width: 120, height: 120 });
  });

  it('returns the default image size for very large screens', () => {
    const breakpoints: Breakpoint[] = [
      { maxWidth: 375, size: { width: 80, height: 80 } },
      { maxWidth: 580, size: { width: 150, height: 150 } },
      { maxWidth: 1250, size: { width: 120, height: 120 } },
      { maxWidth: Infinity, size: { width: 150, height: 150 } },
    ];

    setWindowWidth(1300);
    const size = useResponsiveImageSize(breakpoints);
    expect(size).toEqual<ImageSize>({ width: 150, height: 150 });
  });

  it('returns the last defined size when no breakpoints match', () => {
    const breakpoints: Breakpoint[] = [
      { maxWidth: 375, size: { width: 80, height: 80 } },
    ];

    setWindowWidth(500);
    const size = useResponsiveImageSize(breakpoints);
    expect(size).toEqual<ImageSize>({ width: 80, height: 80 });
  });
});
