declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    $RefreshReg$: any | {};
  }
}
declare global {
  // eslint-disable-next-line no-var
  var $RefreshReg$: any | {};
}

export {};
