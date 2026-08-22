import { Button } from 'react-bootstrap';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useTheme } from '../context/useTheme.js';
 
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
 
  return (
    <Button
      variant={isDark ? 'outline-light' : 'outline-dark'}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="d-flex align-items-center justify-content-center rounded-circle"
      style={{ width: '40px', height: '40px' }}
    >
      {isDark ? <BsSunFill /> : <BsMoonStarsFill />}
    </Button>
  );
}

export default ThemeToggle;