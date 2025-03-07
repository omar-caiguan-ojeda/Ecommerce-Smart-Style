import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsPastDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const date = new Date(value);
          const today = new Date();
          return date < today;
        },
        defaultMessage(): string {
          return 'The date must be in the past.';
        },
      },
    });
  };
}
