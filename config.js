System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  //map tells the System loader where to look for things
  map: {
    
    'app': './typescript',
    
    'typescript': 'npm:typescript@2.2.1/lib/typescript.js'
  },
  //packages defines our app package
  packages: {
    app: {
      main: 'typescript/app.ts',
      defaultExtension: 'ts'
    }
  }
});