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
            50: '#EEF2FF',
            100: '#E0E7FF',
            200: '#C7D2FE',
            300: '#A5B4FC',
            400: '#818CF8',
            main: '#6366F1',
            500: '#6366F1',
            600: '#4F46E5',
            700: '#4338CA',
            800: '#3730A3',
            900: '#312E81',
          } as any,
          secondary: {
            50: '#F5F3FF',
            100: '#EDE9FE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#A78BFA',
            main: '#8B5CF6',
            500: '#8B5CF6',
            600: '#7C3AED',
            700: '#6D28D9',
            800: '#5B21B6',
            900: '#4C1D95',
          } as any,
          ...(mode === 'light'
              ? {
                background: {
                  default: '#F9FAFB',
                  paper: '#FFFFFF',
                },
                text: {
                  primary: '#111827',
                  secondary: '#6B7280',
                },
              }
              : {
                background: {
                  default: '#08162b',
                  paper: '#212a43',
                },
                text: {
                  primary: '#F3F4F6',
                  secondary: '#9CA3AF',
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
              'Calibri',
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
