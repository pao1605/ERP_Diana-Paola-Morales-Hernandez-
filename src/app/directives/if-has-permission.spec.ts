import { IfHasPermission } from './if-has-permission';

describe('IfHasPermission', () => {
  it('should create an instance', () => {
    const directive = new IfHasPermission();
    expect(directive).toBeTruthy();
  });
});
