export const waitFor = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
