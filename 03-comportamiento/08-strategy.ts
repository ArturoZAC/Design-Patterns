/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/index.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move(): void {
    console.log('%cEl pato nada rapidamente sobre el agua\n', COLORS.blue);
  }
}

class FlyOverWater implements MovementStrategy {
  move(): void {
    console.log('%cEl pato vuela elegantemente sobre el agua\n', COLORS.pink);
  }
}

class WalkClumisty implements MovementStrategy {
  move(): void {
    console.log('%cEl pato camina torpemente por la orilla\n', COLORS.green);
  }
}

class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;

  constructor( name: string, strategy: MovementStrategy ){
    this.name = name;
    this.movementStrategy = strategy;

    console.log(`%c${ name } %clisto para competir`, COLORS.green, COLORS.white);
  }

  perForMove(){
    console.log(`${this.name} se prepara para moverse...`);
    this.movementStrategy.move();
  }

  setMovementStrategy( strategy: MovementStrategy ){
    this.movementStrategy = strategy;
    console.log(`${this.name} cambio de estrategia`);
  }
}

function main(){
  const duck1 = new Duck('Patito rápido', new SwimFast());
  const duck2 = new Duck('Patito volador', new FlyOverWater());
  const duck3 = new Duck('Patito torpe', new WalkClumisty());

  console.log('%cComienza la carrera de patos!', COLORS.red);
  duck1.perForMove();
  duck2.perForMove();
  duck3.perForMove();

  duck3.setMovementStrategy( new FlyOverWater());
  duck3.perForMove();
}

main();

