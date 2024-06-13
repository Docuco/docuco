export class UniqueVOCollection<ValueObject extends { value: unknown }> {

    public readonly values: ValueObject[];

    constructor(valueObjects: ValueObject[]) {
        this.values = this.getUniqueInstances(valueObjects);
    }

    private getUniqueInstances(valueObjects: ValueObject[]): ValueObject[] {
        return valueObjects.reduce((acc, currentValueObject) => {
            if (!acc.find(vo => vo.value === currentValueObject.value)) {
                return [...acc, currentValueObject];
            }

            return acc;
        }, [] as ValueObject[]);
    }

    public get isEmpty(): boolean {
        return this.values.length === 0;
    }

    static from<ValueObject extends { value: unknown }>(valueObjects: ValueObject[]): UniqueVOCollection<ValueObject> {
        return new UniqueVOCollection(valueObjects);
    }

    public add(valueObject: ValueObject): UniqueVOCollection<ValueObject> {
        const newValues = [...this.values, valueObject];

        return UniqueVOCollection.from(newValues);
    }

}
