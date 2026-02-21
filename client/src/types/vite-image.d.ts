// Additional image module declarations including Vite-style imports with query params
// This helps when using imports like `import logo from '../assets/ziv_danino.png?url'` or similar.

declare module '*?url' {
  const src: string;
  export default src;
}

declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*?inline' {
  const content: string;
  export default content;
}

