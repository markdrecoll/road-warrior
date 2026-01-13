import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Game from './Game.tsx'

// Apply root and body styles programmatically for standalone game
const rootElement = document.getElementById('root')!;
rootElement.style.width = '100%';

document.body.style.margin = '0';
document.body.style.display = 'flex';
document.body.style.minHeight = '100vh';

createRoot(rootElement).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)