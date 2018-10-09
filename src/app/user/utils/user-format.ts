import { AbstractControl } from '@angular/forms';

export const userByForm = (form: { [key: string]: AbstractControl }) => ({
  name: form.name.value,
  racf: form.racf.value,
  ext: form.ext.value,
  email: form.email.value,
  section: form.section.value,
  perfil: form.perfil.value
});
