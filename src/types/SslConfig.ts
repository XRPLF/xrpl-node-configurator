export interface SslConfig {
  client: {
    verify: boolean,
    filePath?: string,
    fileOrDirPath?: string
  },
  server: {
    enabled: boolean,
    certPath?: string,
    keyPath?: string
  }
}
