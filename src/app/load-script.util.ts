import { Observable, Observer, of } from 'rxjs';

const buffer: Record<string, Observable<HTMLScriptElement>> = {};

export const loadGlobalScript = (src: string, doc: Document = document): Observable<HTMLScriptElement> => {
    if (buffer[src]) {
        return buffer[src];
    }

    const existingScript = doc.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existingScript) {
        return of(existingScript);
    }

    buffer[src] = new Observable((observer: Observer<HTMLScriptElement>) => {
        const script = doc.createElement('script');
        script.onload = () => {
            observer.next(script);
            delete buffer[src];
        };
        script.onerror = (error) => {
            observer.error(error);
            delete buffer[src];
        };
        script.src = src;
        doc.head.appendChild(script);
    });

    return buffer[src];
};
