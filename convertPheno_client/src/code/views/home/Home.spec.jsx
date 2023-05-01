import { test, expect } from '@playwright/experimental-ct-react';
import Home from './Home';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(<Home />);
  await expect(component).toContainText('Learn React');
});