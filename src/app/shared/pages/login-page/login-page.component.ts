import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    console.warn('Formulario incompleto');
    return;
  }

  const { usuario, password } = this.loginForm.value;

  this.http.post<any>('http://localhost:3000/api/auth/login', { usuario, password })
    .subscribe({
      next: (res) => {
        if (res.ok) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          console.log('✅ Login exitoso');
          // Redirige a otra ruta si ya tienes
          // this.router.navigate(['/dashboard']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error al conectar con el servidor');
      }
    });
}

}
