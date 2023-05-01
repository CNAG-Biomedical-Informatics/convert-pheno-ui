// Apply theme here, add anything your component needs at runtime here.
import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';
import { BrowserRouter } from 'react-router-dom';

beforeMount(async ({ App, hooksConfig }) => {
  if (hooksConfig?.enableRouting)
    return <BrowserRouter><App /></BrowserRouter>;
});