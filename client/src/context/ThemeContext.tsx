import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

type ColorMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ColorMode;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'light',
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as ColorMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    document.dir = 'rtl';
  }, []);

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(
    () =>
      createTheme({
        direction: 'rtl',
        palette: {
          mode,
          primary: {
            50: '#F3E8FF',
            100: '#E9D5FF',
            200: '#D8B4FE',
            300: '#C084FC',
            400: '#A855F7',
            main: '#7C4DFF',
            500: '#8B5CF6',
            600: '#7C4DFF',
            700: '#6D28D9',
            800: '#5B21B6',
            900: '#4C1D95',
          } as any,
          secondary: {
            50: '#E6F7F1',
            100: '#CFF0E4',
            200: '#A8E3CF',
            300: '#7DD5BA',
            400: '#52C7A5',
            main: '#1DBF73',
            500: '#1DBF73',
            600: '#14A765',
            700: '#0F8F56',
            800: '#0C7447',
            900: '#095C38',
          } as any,
          ...(mode === 'light'
            ? {
                background: {
                  default: '#F8FAFC',
                  paper: '#FFFFFF',
                },
                text: {
                  primary: '#111827',
                  secondary: '#6B7280',
                },
              }
            : {
                background: {
                  default: '#0F0B1F',
                  paper: '#151028',
                },
                text: {
                  primary: '#F3F4F6',
                  secondary: '#B3B3C6',
                },
              }),
        },
        spacing: 8,
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h6: {
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: 1.4,
          },
          body2: {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: 1.4,
          },
          caption: {
            fontSize: '12px',
            fontWeight: 500,
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                height: '22px',
                fontSize: '12px',
                fontWeight: 500,
                borderRadius: "9999px",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeModeContext.Provider value={{ mode, toggleMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </CacheProvider>
  );
}
