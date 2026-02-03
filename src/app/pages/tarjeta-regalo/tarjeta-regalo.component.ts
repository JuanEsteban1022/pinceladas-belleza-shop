import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface GiftCardData {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  amount: number;
  message: string;
  design: string;
}

@Component({
  selector: 'app-tarjeta-regalo',
  templateUrl: './tarjeta-regalo.component.html',
  styleUrls: ['./tarjeta-regalo.component.scss']
})
export class TarjetaRegaloComponent implements OnInit {
  giftCardForm: FormGroup;
  isSubmitting = false;
  submitted = false;
  showPreview = false;

  // Monto predefinidas
  predefinedAmounts = [50000, 100000, 150000, 200000, 250000, 500000];

  // Diseños
  designs = [
    { id: 'birthday', name: 'Cumpleaños', icon: 'pi pi-gift' },
    { id: 'love', name: 'Amor y amistad', icon: 'pi pi-heart' },
    { id: 'congrats', name: 'Aniversarios', icon: 'pi pi-star' },
    { id: 'general', name: 'Fechas especiales', icon: 'pi pi-tag' }
  ];

  constructor(private fb: FormBuilder) {
    this.giftCardForm = this.fb.group({
      senderName: ['', [Validators.required, Validators.minLength(3)]],
      senderEmail: ['', [Validators.required, Validators.email]],
      senderPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      recipientName: ['', [Validators.required, Validators.minLength(3)]],
      recipientEmail: ['', [Validators.required, Validators.email]],
      recipientPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      amount: [100000, [Validators.required, Validators.min(10000)]],
      customAmount: ['', [Validators.min(10000)]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      design: ['general', Validators.required],
    });
  }

  ngOnInit(): void {
    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
  }

  get f() {
    return this.giftCardForm.controls;
  }

  onAmountChange(amount: number): void {
    this.giftCardForm.patchValue({ amount, customAmount: '' });
  }

  onCustomAmountChange(): void {
    const customAmount = this.giftCardForm.get('customAmount')?.value;
    if (customAmount && customAmount >= 10000) {
      this.giftCardForm.patchValue({ amount: customAmount });
    }
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.giftCardForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    // Simular envío del formulario
    setTimeout(() => {
      const formData: GiftCardData = {
        ...this.giftCardForm.value,
        amount: this.giftCardForm.value.amount
      };

      console.log('Tarjeta regalo creada:', formData);

      // Aquí iría la llamada al servicio para guardar la tarjeta regalo

      this.isSubmitting = false;

      // Mostrar mensaje de éxito (podrías usar SweetAlert como en otros componentes)
      alert('¡Tarjeta regalo creada exitosamente!');

      // Resetear formulario
      this.giftCardForm.reset();
      this.submitted = false;
      this.showPreview = false;
    }, 2000);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }

  getSelectedDesignIcon(): string {
    const selectedDesign = this.designs.find(d => d.id === this.giftCardForm.get('design')?.value);
    return selectedDesign ? selectedDesign.icon : 'pi pi-tag';
  }

  getExpirationDate(): string {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 6); // Válido por 6 meses
    return expirationDate.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
