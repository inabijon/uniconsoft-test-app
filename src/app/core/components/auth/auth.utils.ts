import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class AuthUtils {
  static passwordsMatchValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }

  static PASSWORD_VALIDATORS: any[] = [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20), // Password must be between 6 and 20 characters
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/), // Password must contain at least one letter and one number
  ];
}
