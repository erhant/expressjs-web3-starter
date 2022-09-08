/**
 * A generic logger utility.
 */
function log(...args: unknown[]) {
  // @note this is where we would implement a logger (such as Winston)
  // and would also respect log level (e.g. warn | error | info | ...)
  // but it is omitted for time saving purposes

  console.log(...args);
}

// maybe some other functions could be here
export const logger = {log};
