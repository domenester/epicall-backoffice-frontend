import { AbstractControl } from '@angular/forms';

export const userByForm = (form: { [key: string]: AbstractControl }) => ({
  name: form.name.value,
  racf: form.racf.value,
  extension: form.extension.value,
  email: form.email.value,
  department: form.department.value,
  perfil: form.perfil.value
});
