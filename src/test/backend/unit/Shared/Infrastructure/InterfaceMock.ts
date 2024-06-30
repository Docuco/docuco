import { anything, instance, mock, reset, verify, deepEqual } from 'ts-mockito';

export class InterfaceMock<GenericService> {

    private repositoryMock: GenericService;

    constructor() {
        this.repositoryMock = mock<GenericService>();
    }

    public instance() {
        return instance(this.repositoryMock);
    }

    public get mockito() {
        return this.repositoryMock;
    }

    public reset() {
        reset(this.repositoryMock);
    }

    public expectMethodNotToHaveBeenCalled(method: keyof GenericService) {
        verify(this.getMethod(method)(anything())).never();
    }

    public expectMethodToHaveBeenCalledWith(method: keyof GenericService, methodProps: unknown) {
        verify(this.getMethod(method)(deepEqual(methodProps))).once();
    }

    public expectMethodToHaveBeenCalled(method: keyof GenericService) {
        this.expectMethodToHaveBeenCalledWith(method, anything());
    }

    public expectMethodToHaveBeenCalledTimes(method: keyof GenericService, times: number) {
        verify(this.getMethod(method)(deepEqual(anything()))).times(times);
    }

    private getMethod(method: keyof GenericService): Function {
        const fn = this.repositoryMock[method];

        if (typeof fn !== 'function') {
            throw new Error(`Method "${String(method)}" is not a valid function in this repository`);
        }

        return fn;
    }

}