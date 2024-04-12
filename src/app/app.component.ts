import {Component} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DecimalPipe,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calculator-Angular';

  calValue: number = 0;
  function: any = 'NoFunction';
  calNumber: string = 'noValue';
  firstNumber: number = 0;
  secondNumber: number = 0;
  memory: string = this.calValue.toString();


  onClickValue(value: string, type: any) {
    if (type === 'number') {
      this.onNumberClick(value);
    } else if (type === 'function') {
      this.onFunctionClick(value);
    }
  }

  // itt allitjuk be a szamot a kepernyore, illetve allitjuk be a string konkatenaciot,
  // amikor mar elotte leutottunk egy szamot, ketjegyu szamok hozzaadasara
  onNumberClick(value: string) {
    if (this.calNumber !== 'noValue') {
      this.calNumber = this.calNumber + value;
    } else {
      this.calNumber = value;
    }

    this.calValue = parseFloat(this.calNumber);

  }

  //itt jelenitjuk meg az adott (leütött) funkciot a szam felett levo reszen a kijelzon
  onFunctionClick(value: string) {
    if (value === 'c') {
      this.clearAll();
    } else if (this.function === 'NoFunction') {
      this.firstNumber = this.calValue;
      this.calNumber = 'noValue';
      this.function = value
    } else if (this.function !== 'NoFunction') {
      this.secondNumber = this.calValue;
      this.valueCalculate(value);
    }
  }

  valueCalculate(value: string) {
    if (this.function === '+') {
      const total = this.firstNumber + this.secondNumber
      this.totalAssignValues(total, value);
    } else if (this.function === '-') {
      const total = this.firstNumber - this.secondNumber
      this.totalAssignValues(total, value);
    } else if (this.function === '*') {
      const total = this.firstNumber * this.secondNumber
      this.totalAssignValues(total, value);
    } else if (this.function === '/') {
      const total = this.firstNumber / this.secondNumber
      this.totalAssignValues(total, value);
    }
  }

  totalAssignValues(total: number, value: string) {
    this.calValue = total;
    this.firstNumber = total;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.function = value;
    if (value === '=') {
      this.onEqualPress();
    }
  }

  onEqualPress() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.function = 'NoFunction';
    this.calNumber = 'noValue';
  }

  clearAll() {
    this.calValue = 0;
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.function = 'NoFunction';
    this.calNumber = 'noValue';
  }
}
