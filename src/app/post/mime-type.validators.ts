import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';


export const mimetype = (control: AbstractControl): Promise<{[key: string]}> | Observable => {};
