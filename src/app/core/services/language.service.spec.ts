import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { LanguageService } from './language.service';
import { translocoTesting } from '../../../testing/transloco-testing';

describe('LanguageService', () => {
  function buildService(platform = 'browser') {
    TestBed.configureTestingModule({
      imports: [translocoTesting],
      providers: [{ provide: PLATFORM_ID, useValue: platform }],
    });
    return TestBed.inject(LanguageService);
  }

  beforeEach(() => localStorage.clear());

  it('should create', () => {
    expect(buildService()).toBeTruthy();
  });

  it('should expose activeLang signal reflecting the current transloco lang', () => {
    const service = buildService();
    expect(service.activeLang()).toBe(TestBed.inject(TranslocoService).getActiveLang());
  });

  it('should update localStorage on setLang()', () => {
    const service = buildService('browser');
    service.setLang('pt-BR');
    expect(localStorage.getItem('lang')).toBe('pt-BR');
  });

  it('should update document.documentElement.lang on setLang()', () => {
    const service = buildService('browser');
    service.setLang('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('should set document.documentElement.lang on construction to the initial lang', () => {
    buildService('browser');
    const initial = TestBed.inject(TranslocoService).getActiveLang();
    expect(document.documentElement.lang).toBe(initial);
  });

  it('should NOT touch localStorage or document.lang on a server platform', () => {
    const service = buildService('server');
    const before = document.documentElement.lang;
    service.setLang('es');
    expect(document.documentElement.lang).toBe(before);
    expect(localStorage.getItem('lang')).toBeNull();
  });
});
