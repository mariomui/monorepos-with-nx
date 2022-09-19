declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    $RefreshReg$: unknown;
  }
}
declare global {
  // eslint-disable-next-line no-var
  var $RefreshReg$: unknown;
}

export {};
