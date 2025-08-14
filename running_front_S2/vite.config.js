import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
  },
  optimizeDeps: {
    // 필요시 문제 패키지 임시 제외 (반복 이슈 시)
    // exclude: ['react-quill-new', 'slick-carousel'],
  },
})
