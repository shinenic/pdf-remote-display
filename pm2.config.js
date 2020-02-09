module.exports = {
  apps : [
      {
        name: "PdfViewer",
        script: "./app.js",
        watch: true,
        env: {
            "NODE_API_MODE": "PRODUCTION"
        }
      }
  ]
}