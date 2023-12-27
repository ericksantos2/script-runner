import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

export default function App() {
  return (
    <h2>Hello World</h2>
  )
}

root.render(
  <App/>
)