import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pipes } from './pipes';
import { directives } from './directives';

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes, ...directives],
  exports: [...pipes, ...directives]
})
export class SharedModule {}
