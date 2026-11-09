import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { site } from '../../content';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly site = site;

  // Mit echten Qualifikationen füllen.
  readonly credentials: string[] = [
    '[Zertifikat / Qualifikation 1 — z. B. AWS Certified Solutions Architect]',
    '[Zertifikat / Qualifikation 2 — z. B. CKA / Kubernetes]',
    '[Zertifikat / Qualifikation 3 — z. B. ISO 27001 / ITIL]',
    '[Zertifikat / Qualifikation 4 — z. B. Microsoft 365 / Azure]',
  ];
}
