import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loadGlobalScript } from './load-script.util';
import { ScanForAPI, findAPI } from './scan-for-api';

declare const Scorm12API: any;
declare const Scorm2004API: any;
declare const ObservableSlim: any;

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [MatSnackBar],
})
export class AppComponent implements OnDestroy {
  private matSnackBar = inject(MatSnackBar);

  title = 'scorm-test-app';

  data = {};

  API: (typeof window)['API'];
  API_1484_11: (typeof window)['API_1484_11'];

  cmiElementControl = new FormControl<string>('');
  cmiValueControl = new FormControl<string>('');
  progressControl = new FormControl<number>(0);
  completionStatusControl = new FormControl<
    'completed' | 'incomplete' | 'not attempted' | 'unknown'
  >('unknown');

  destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {
    // In local development we are not in the LMS context, so we have to set up the SCORM APIs ourselves
    // Don't do this for the bundled version of this application, as it will run in a SCORM initialized context
    (!environment.production
      ? loadGlobalScript(
          'https://cdn.jsdelivr.net/npm/scorm-again@1.7.1/dist/scorm-again.js'
        )
      : new BehaviorSubject<HTMLScriptElement | null>(null)
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        // Initialize SCORM for local development
        if (result) {
          const settings = {};

          //  SCORM 1.2
          window.API = new Scorm12API(settings);

          //  SCORM 2004
          window.API_1484_11 = new Scorm2004API(settings);
        }

        this.API = findAPI(window);
        this.API_1484_11 = ScanForAPI(window);

        this.API.LMSInitialize();
        this.API_1484_11.Initialize();

        // Listen for changes to cmi data (dirty implementation)
        setInterval(() => {
          this.data = this.API_1484_11.cmi;
        }, 1000);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  setCmiValue() {
    try {
      if (this.cmiElementControl.value && this.cmiValueControl.value) {
        this.API?.LMSSetValue(
          this.cmiElementControl.value as any,
          this.cmiValueControl.value
        );
        this.API_1484_11?.SetValue(
          this.cmiElementControl.value as any,
          this.cmiValueControl.value
        );
        this.data = this.API_1484_11.cmi;
        this.matSnackBar.open(
          `CMI element ${this.cmiElementControl.value} successfully set to ${this.cmiValueControl.value}!`
        );
      }
    } catch {
      this.matSnackBar.open('Something went wrong');
    }
  }

  setScormProgress() {
    try {
      const progress = (this.progressControl.value ?? 0) / 100;
      this.API_1484_11.SetValue('cmi.progress_measure', progress.toString());
      this.data = this.API_1484_11.cmi;
      this.matSnackBar.open(`Progress successfully set to ${progress}!`);
    } catch {
      this.matSnackBar.open('Something went wrong');
    }
  }

  setCompletionStatus() {
    this.API_1484_11.SetValue(
      'cmi.completion_status',
      this.completionStatusControl.value
    );
    this.data = this.API_1484_11.cmi;
    this.matSnackBar.open(
      `Completion status successfully set to ${this.completionStatusControl.value}!`
    );
  }

  commit() {
    try {
      this.API?.LMSCommit();
      this.API_1484_11?.Commit();

      this.matSnackBar.open('CMI values successfully commited!');
    } catch {
      this.matSnackBar.open('Something went wrong');
    }
  }
}
