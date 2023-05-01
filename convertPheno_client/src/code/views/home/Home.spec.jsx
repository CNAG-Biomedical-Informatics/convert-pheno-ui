import { test, expect } from '@playwright/experimental-ct-react';
import Home from './Home';

test.use({ viewport: { width: 500, height: 500 } });

test('configure routing through hooks config', async ({ mount }) => {
  const component = await mount(<Home />, {
    hooksConfig: { enableRouting: true },
  });
  const element = component.locator('#welcome');
  await expect(element).toHaveText('Welcome to Convert-Pheno');
});