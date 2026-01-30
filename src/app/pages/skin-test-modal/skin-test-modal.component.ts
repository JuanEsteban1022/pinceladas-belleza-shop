import { Component } from '@angular/core';

@Component({
  selector: 'app-skin-test-form',
  templateUrl: './skin-test-modal.component.html',
  styleUrls: ['./skin-test-modal.component.scss'],
})
export class SkinTestFormComponent {

  answers: { [key: number]: number } = {};
  result: { totalPoints: number; type: string } | null = null;

  questions = [
    {
      id: 1,
      question:
        "¿Cómo se siente tu piel después de limpiarla y dejarla secar al aire por una hora sin aplicar productos?",
      options: [
        { text: "Se siente tensa, tirante y quizás un poco áspera en general.", points: 2 },
        { text: "Se siente cómoda en algunas zonas, pero grasosa en la zona T (frente, nariz, barbilla).", points: 1 },
        { text: "Se siente equilibrada y suave en todas partes, sin tirantez ni brillo.", points: 0.5 },
        { text: "Se siente suave pero comienza a mostrar brillo en toda la cara.", points: 0 },
      ],
    },
    {
      id: 2,
      question: "¿Con qué frecuencia sientes la necesidad de hidratar tu piel durante el día?",
      options: [
        { text: "Varias veces al día, mi piel siempre se siente sedienta.", points: 2 },
        { text: "Una o dos veces al día, especialmente después de limpiar.", points: 0.5 },
        { text: "Solo en algunas zonas, como las mejillas, pero no en la zona T.", points: 1 },
        { text: "Raramente, siento que mi piel ya tiene suficiente humedad.", points: 0 },
      ],
    },
    {
      id: 3,
      question: "¿Cómo describirías el tamaño de tus poros en el rostro?",
      options: [
        { text: "Apenas visibles en todo el rostro.", points: 2 },
        { text: "Visibles y grandes, especialmente en la zona T.", points: 0 },
        { text: "Pequeños en las mejillas, pero más visibles en la frente, nariz y barbilla.", points: 1 },
        { text: "Muy visibles y propensos a puntos negros en toda la cara.", points: 0 },
      ],
    },
    {
      id: 4,
      question:
        "¿Con qué frecuencia te aparecen brotes de acné (espinillas, puntos negros) y dónde?",
      options: [
        { text: "Raramente, si acaso, alguna espinilla ocasional.", points: 2 },
        { text: "A menudo, principalmente en la zona T (frente, nariz, barbilla).", points: 1 },
        { text: "Frecuentemente, en toda la cara.", points: 0 },
        { text: "Muy rara vez y no se asocia a ninguna zona específica.", points: 0.5 },
      ],
    },
    {
      id: 5,
      question: "¿Cómo se siente tu piel al final del día, antes de limpiar?",
      options: [
        { text: "Grasosa y brillante en la zona T, pero seca o normal en las mejillas.", points: 1 },
        { text: "Tensa y con sensación de descamación o aspereza en toda la cara.", points: 2 },
        { text: "Brillante y grasosa en toda la cara.", points: 0 },
        { text: "Cómoda y equilibrada, sin cambios significativos.", points: 0.5 },
      ],
    },
    {
      id: 6,
      question: "¿Tu piel tiende a enrojecerse o irritarse con facilidad?",
      options: [
        { text: "Sí, a menudo se enrojece y se irrita con facilidad, especialmente con nuevos productos.", points: 2 },
        { text: "Solo en algunas áreas, como las mejillas, pero no en la zona T.", points: 1 },
        { text: "No, mi piel es bastante resistente y rara vez se irrita.", points: 0 },
        { text: "Raramente se enrojece, pero ocasionalmente se siente tirante.", points: 1 },
      ],
    },
    {
      id: 7,
      question: "¿Cómo se ve tu maquillaje al cabo de unas horas de haberlo aplicado?",
      options: [
        { text: "Se cuartea o se asienta en las líneas finas, especialmente alrededor de la boca y los ojos.", points: 2 },
        { text: "Permanece intacto en algunas zonas, pero brilla y se desvanece en la zona T.", points: 1 },
        { text: "Brilla y se derrite uniformemente en toda la cara.", points: 0 },
        { text: "Se mantiene bastante bien y uniforme durante todo el día.", points: 0.5 },
      ],
    },
    {
      id: 8,
      question: "¿Tienes parches secos o descamación en alguna parte de tu rostro?",
      options: [
        { text: "Sí, frecuentemente tengo parches secos o descamación en todo el rostro, especialmente en invierno.", points: 2 },
        { text: "Solo ocasionalmente, en las mejillas o alrededor de la boca, pero no en la zona T.", points: 1 },
        { text: "No, nunca tengo parches secos ni descamación.", points: 0 },
        { text: "Raramente, y generalmente es por deshidratación o falta de cuidado.", points: 0.5 },
      ],
    },
    {
      id: 9,
      question: "¿Cómo reacciona tu piel a los cambios de clima (frío, viento, humedad)?",
      options: [
        { text: "Se vuelve más seca, tirante y propensa a agrietarse o enrojecerse con el frío o el viento.", points: 2 },
        { text: "Se vuelve más grasa en la zona T con la humedad, pero las mejillas pueden resecarse con el frío.", points: 1 },
        { text: "Se mantiene bastante equilibrada, sin grandes cambios.", points: 0.5 },
        { text: "Se vuelve más brillante y grasosa con el calor y la humedad.", points: 0 },
      ],
    },
    {
      id: 10,
      question:
        "¿Con qué frecuencia notas que tu piel se ve brillante o aceitosa a lo largo del día?",
      options: [
        { text: "Rara vez, mi piel casi nunca se ve brillante.", points: 2 },
        { text: "Principalmente en la zona T (frente, nariz, barbilla), pero las mejillas se mantienen mates.", points: 1 },
        { text: "Constantemente, mi cara suele estar brillante y aceitosa la mayor parte del día.", points: 0 },
        { text: "Solo después de hacer ejercicio o en un día muy caluroso, pero no regularmente.", points: 0.5 },
      ],
    },
  ];

  handleChange(qId: number, value: number): void {
    this.answers[qId] = value;
  }

  handleSubmit(): void {
    const totalPoints = Object.values(this.answers)
      .reduce((acc, val) => acc + val, 0);

    let type = '';
    if (totalPoints <= 6) type = 'Piel Grasa';
    else if (totalPoints <= 13) type = 'Piel Mixta';
    else type = 'Piel Seca';

    localStorage.setItem('type_skin', type);

    this.result = { totalPoints, type };
  }

  resetTest(): void {
    this.answers = {};
    this.result = null;
  }

}
