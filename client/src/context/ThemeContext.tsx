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

const designTokens = {
  borderRadius: {
    xs: '6px',
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '24px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  shadows: {
    cardDark: '0 0 0 1px rgba(255,255,255,0.04)',
    cardLight: '0 1px 3px rgba(0,0,0,0.06)',
    fabGlowDark: '0 8px 24px rgba(124,77,255,0.45)',
    fabGlowLight: '0 8px 24px rgba(99,102,241,0.35)',
  },
  colors: {
    primary: {
      50: '#F3E8FF',
      100: '#E9D5FF',
      200: '#D8B4FE',
      300: '#C084FC',
      400: '#A855F7',
      500: '#8B5CF6',
      600: '#7C4DFF',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
    },
    secondary: {
      50: '#E6F7F1',
      100: '#CFF0E4',
      200: '#A8E3CF',
      300: '#7DD5BA',
      400: '#52C7A5',
      500: '#1DBF73',
      600: '#14A765',
      700: '#0F8F56',
      800: '#0C7447',
      900: '#095C38',
    },
    neutralsDark: {
      bgBase: '#0F0B1F',
      bgElevated: '#151028',
      bgCard: '#1A1330',
      borderSubtle: 'rgba(255,255,255,0.06)',
      textPrimary: '#F3F4F6',
      textSecondary: '#B3B3C6',
      icon: '#CFCFE8',
    },
    neutralsLight: {
      bgBase: '#F8FAFC',
      bgElevated: '#FFFFFF',
      bgCard: '#FFFFFF',
      borderSubtle: 'rgba(15,23,42,0.08)',
      textPrimary: '#111827',
      textSecondary: '#6B7280',
      icon: '#4B5563',
    },
    accent: {
      warning: '#F59E0B',
      danger: '#EF4444',
      success: '#1DBF73',
    },
    gradients: {
      fabDark: 'linear-gradient(135deg, #8B5CF6 0%, #7C4DFF 100%)',
      fabLight: 'linear-gradient(135deg, #7C4DFF 0%, #6366F1 100%)',
    },
  },
};

export { designTokens };

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
            50: designTokens.colors.primary[50],
            100: designTokens.colors.primary[100],
            200: designTokens.colors.primary[200],
            300: designTokens.colors.primary[300],
            400: designTokens.colors.primary[400],
            main: designTokens.colors.primary[600],
            500: designTokens.colors.primary[500],
            600: designTokens.colors.primary[600],
            700: designTokens.colors.primary[700],
            800: designTokens.colors.primary[800],
            900: designTokens.colors.primary[900],
          } as any,
          secondary: {
            50: designTokens.colors.secondary[50],
            100: designTokens.colors.secondary[100],
            200: designTokens.colors.secondary[200],
            300: designTokens.colors.secondary[300],
            400: designTokens.colors.secondary[400],
            main: designTokens.colors.secondary[500],
            500: designTokens.colors.secondary[500],
            600: designTokens.colors.secondary[600],
            700: designTokens.colors.secondary[700],
            800: designTokens.colors.secondary[800],
            900: designTokens.colors.secondary[900],
          } as any,
          ...(mode === 'light'
            ? {
                background: {
                  default: designTokens.colors.neutralsLight.bgBase,
                  paper: designTokens.colors.neutralsLight.bgElevated,
                },
                text: {
                  primary: designTokens.colors.neutralsLight.textPrimary,
                  secondary: designTokens.colors.neutralsLight.textSecondary,
                },
              }
            : {
                background: {
                  default: designTokens.colors.neutralsDark.bgBase,
                  paper: designTokens.colors.neutralsDark.bgElevated,
                },
                text: {
                  primary: designTokens.colors.neutralsDark.textPrimary,
                  secondary: designTokens.colors.neutralsDark.textSecondary,
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
                  borderRadius: designTokens.borderRadius.xl,
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
