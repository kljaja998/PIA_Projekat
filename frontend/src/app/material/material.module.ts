import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule }  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card"
import { MatSelectModule } from "@angular/material/select"
import { MatTabsModule } from "@angular/material/tabs"
import { MatBadgeModule } from '@angular/material/badge';



const MaterialModules = [
  MatListModule,
  MatDividerModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatSelectModule,
  MatTabsModule,
  MatBadgeModule
]

@NgModule({
  imports: [ MaterialModules ],
  exports: [ MaterialModules ]
})
export class MaterialModule { }
