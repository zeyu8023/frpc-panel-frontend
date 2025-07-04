export default {
  server: {
    port: 10305,
    proxy: {
      '/api': 'http://localhost:8035'
    }
  }
}
