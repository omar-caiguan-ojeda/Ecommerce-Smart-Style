import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedPropertyValue = (args.object as any)[property];
          return value === relatedPropertyValue; // ✅ Devuelve true si coinciden
        },
        defaultMessage(): string {
          return `The ${propertyName} field must match ${property}.`;
        },
      },
    });
  };
}
