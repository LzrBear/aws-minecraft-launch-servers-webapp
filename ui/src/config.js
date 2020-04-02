externals: {
    'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? {
      serverUrl: "https://myserver.com"
    } : {
      serverUrl: "http://192.168.1.7:8080"
    })
  }