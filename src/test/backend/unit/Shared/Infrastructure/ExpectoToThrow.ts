export async function expectToThrow(fn: Promise<unknown>, exception: unknown) {
    try {
        await fn;
        expect(true).toBe(false);
    } catch (error) {
        expect(error).toBeInstanceOf(exception);
    }
}