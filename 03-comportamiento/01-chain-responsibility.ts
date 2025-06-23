/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

interface Handler {
  setNext( handler: Handler ): Handler;
  handle( request: string ): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    return this.nextHandler = handler;
  }

  handle(request: string): void {
    if( this.nextHandler ){
      this.nextHandler.handle(request);
    }
  }
}

class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if( request === 'básico' ){
      return console.log('Soporte básico: %cResolviendo problema básico', COLORS.green);
    }

    console.log('%cSoporte básico: Pasando el problema a soporte avanzado', COLORS.green);
    super.handle(request);
  }
}

class AdvanceSupport extends BaseHandler {
  override handle(request: string): void {
    if( request === 'avanzado' ){
      return console.log('Soporte avanzado: %cResolviendo problema avanzado', COLORS.yellow);
    }

    console.log('%cSoporte avanzado: Pasando el problema a soporte experto', COLORS.yellow);
    super.handle(request);
  }
}

class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if( request === 'experto' ){
      return console.log('Soporte experto: %cResolviendo problema experto', COLORS.pink);
    }

    console.log('%cSoporte experto: No hay nada que hacer ... bye bye', COLORS.cyan);
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advanceSupport = new AdvanceSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advanceSupport).setNext(expertSupport);

  basicSupport.handle('básico');
  basicSupport.handle('avanzado');
  basicSupport.handle('experto');
  basicSupport.handle('nuclear');
}

main();