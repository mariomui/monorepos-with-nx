import { sharedMfe } from './shared-mfe';

describe('sharedMfe', () => {
  it('should work', () => {
    expect(sharedMfe()).toEqual('shared-mfe');
  });
});
