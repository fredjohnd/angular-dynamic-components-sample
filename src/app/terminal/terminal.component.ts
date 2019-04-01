import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  @ViewChild('input', {read: ElementRef}) inputRef: ElementRef;
  terminalId: string;

  destroy: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  log: string[] = [];

  ngOnInit() {
    this.log.push(`Welcome to ${this.terminalId}. Please type a command below`);
  }

  onEnter(value: string) {
    this.log.push(value);
    const element = this.inputRef.nativeElement as HTMLInputElement;
    element.value = '';
    element.focus();

  }

  close() {
    this.destroy.emit();
  }

}
